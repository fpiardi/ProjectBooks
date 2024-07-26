package com.example.books.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.books.data.RetrofitClient
import kotlinx.coroutines.FlowPreview
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.debounce
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import retrofit2.HttpException
import java.io.IOException
import java.net.ConnectException
import java.net.HttpURLConnection
import java.net.SocketTimeoutException

@OptIn(FlowPreview::class)
class MainViewModel : ViewModel() {

    private val _isLoading = MutableStateFlow(false)
    val isLoading = _isLoading.asStateFlow()

    private val _searchText = MutableStateFlow("")

    private val _errorMessage = MutableStateFlow("")
    val errorMessage = _errorMessage.asStateFlow()

    init {
        fetchAllBooks()
    }

    private val _books = MutableStateFlow(listOf<Book>())

    val books = _searchText
        .debounce(200L)
        .combine(_books) { text, books ->
            if (text.isBlank()) {
                books
            } else {
                books.filter {
                    it.doesMatchSearchQuery(text)
                }
            }
        }
        .stateIn(
            viewModelScope,
            SharingStarted.WhileSubscribed(1000),
            _books.value
        )

    fun onSearchTextChange(text: String) {
        _searchText.value = text
    }

    fun fetchAllBooks() {
        _isLoading.value = true
        _errorMessage.value = ""
        viewModelScope.launch {
            try {
                val books = RetrofitClient.apiService.getAllBooks()
                _books.value = books.data.map { Book(it.name, it.id) }.sortedBy { it.title }
            } catch (e: Exception) {
                _errorMessage.value = e.getErrorMessage()
            } finally {
                _isLoading.value = false
            }
        }
    }
}

private fun Throwable.getErrorMessage(): String {

    return when (this) {
        is HttpException -> {
            when (this.code()) {
                HttpURLConnection.HTTP_BAD_REQUEST,
                HttpURLConnection.HTTP_NOT_FOUND,
                -> "Sorry, it was a bad request"

                HttpURLConnection.HTTP_FORBIDDEN,
                HttpURLConnection.HTTP_UNAUTHORIZED,
                -> "Sorry, you are not authorized"

                HttpURLConnection.HTTP_CLIENT_TIMEOUT -> "Sorry, time out, try again"
                HttpURLConnection.HTTP_INTERNAL_ERROR -> "Sorry, server error, try again"
                HttpURLConnection.HTTP_UNAVAILABLE -> "Sorry, server is unavailable"
                else -> "An unexpected error occurred"
            }
        }

        is SocketTimeoutException -> "Sorry, server is unavailable"
        is ConnectException -> "Please check your internet connection"
        is IOException -> "Please check your internet connection"
        else -> "An unexpected error occurred"
    }
}

