function searchFunction() {
    let searchQuery = document.getElementById('search-input').value;
    alert("Searching for: " + searchQuery);
}

function resetSearch() {
    document.getElementById('search-input').value = "";
}
