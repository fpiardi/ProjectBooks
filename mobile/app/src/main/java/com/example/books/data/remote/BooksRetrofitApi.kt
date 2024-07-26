package com.example.books.data.remote

import com.example.books.data.model.Books
import retrofit2.http.GET

interface BooksRetrofitApi : BooksApi {
    @GET("/books")
    override suspend fun getAllBooks(): Books
}
