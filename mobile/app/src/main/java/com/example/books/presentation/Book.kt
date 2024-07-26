package com.example.books.presentation

data class Book(
    val title: String,
    val id: Int
) {
    fun doesMatchSearchQuery(query: String): Boolean {
        val matchingCombinations = listOf(
            "$title$id",
            "$title $id",
        )

        return matchingCombinations.any {
            it.contains(query, ignoreCase = true)
        }
    }
}