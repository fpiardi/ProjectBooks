package com.example.books.data.remote

import com.example.books.data.model.Books

interface BooksApi {
    suspend fun getAllBooks(): Books
}
