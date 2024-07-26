package com.example.books.data.model

import kotlinx.serialization.Serializable

@Suppress("PLUGIN_IS_NOT_ENABLED")
@Serializable
data class Book(
    val id: Int,
    val name: String,
)

data class Books(
    val data: List<Book>,
)