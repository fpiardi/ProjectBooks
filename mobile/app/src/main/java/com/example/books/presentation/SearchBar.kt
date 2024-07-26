package com.example.books.presentation

import android.annotation.SuppressLint
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.SearchBar
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SearchBar(
    viewModel: MainViewModel
) {
    var searchText by remember { mutableStateOf("") }
    var active by remember { mutableStateOf(false) }
    val items = remember { mutableStateListOf<String>() }

    SearchBar(
        modifier = Modifier.fillMaxWidth(),
        query = searchText,
        onQueryChange = { searchText = it },
        onSearch = {
            if (!items.contains(searchText)) {
                items.add(searchText)
            }
            viewModel.onSearchTextChange(searchText)
            active = false
        },
        active = active,
        onActiveChange = {
            active = it
            if (active) {
                searchText = ""
            }
                         },
        placeholder = {
            Text("Search")
        },
        leadingIcon = {
            Icon(imageVector = Icons.Default.Search, contentDescription = "Search Icon")
        },
        trailingIcon = {
            if (active) {
                Icon(
                    modifier = Modifier.clickable {
                        if (searchText.isNotEmpty()) {
                            searchText = ""
                        } else {
                            active = false
                        }
                        viewModel.onSearchTextChange(searchText)
                    },
                    imageVector = Icons.Default.Close, contentDescription = "Close Icon"
                )
            }
        }
    ) {
        items.forEach {
            Row(modifier = Modifier.padding(all = 16.dp)) {
                Icon(
                    modifier = Modifier.padding(end = 16.dp),
                    imageVector = Icons.Default.History, contentDescription = "History Icon"
                )
                Text(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable {
                            viewModel.onSearchTextChange(it)
                            active = false
                            searchText = it
                        },
                    text = it
                )
            }
        }
    }
}
