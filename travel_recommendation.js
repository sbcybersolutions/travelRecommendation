function searchFunction() {
    let searchQuery = document.getElementById('search-input').value;
    alert("Searching for: " + searchQuery);
}

function resetSearch() {
    document.getElementById('search-input').value = "";
}


// Function to fetch travel data from JSON file
async function fetchTravelData() {
    try {
        const response = await fetch('travel_recommendation_api.json'); // Fetch JSON file
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Convert response to JSON
        return data; // Return full JSON data
    } catch (error) {
        console.error("Error fetching travel data:", error);
        return null; // Return null if there's an error
    }
}

// Function to handle the search
async function searchFunction() {
    let searchQuery = document.getElementById('search-input').value.trim().toLowerCase(); // Convert input to lowercase & trim spaces
    let resultsDiv = document.getElementById('recommendations');

    if (!resultsDiv) {
        console.error("No element found with ID 'recommendations'");
        return;
    }

    resultsDiv.innerHTML = ""; // Clear previous results

    let data = await fetchTravelData(); // Fetch the data

    if (!data) {
        resultsDiv.innerHTML = "<p>Error fetching data. Please try again later.</p>";
        return;
    }

    let matchedResults = [];

    // Define keyword variations for accepted searches
    const keywordMap = {
        beach: ["beach", "beaches"],
        temple: ["temple", "temples"],
        country: ["country", "countries"]
    };

    let searchCategory = null;

    // Check if the search query matches an accepted category
    Object.keys(keywordMap).forEach(key => {
        if (keywordMap[key].includes(searchQuery)) {
            searchCategory = key;
        }
    });

    // If the search query is not allowed, show an error message
    if (!searchCategory) {
        resultsDiv.innerHTML = "<p>Invalid search. Please enter 'beach', 'temple', or 'country' (or their variations).</p>";
        return;
    }

    // Fetch results based on the selected category
    if (searchCategory === "beach") {
        matchedResults = data.beaches.slice(0, 2); // Limit to two recommendations
    } else if (searchCategory === "temple") {
        matchedResults = data.temples.slice(0, 2); // Limit to two recommendations
    } else if (searchCategory === "country") {
        matchedResults = data.countries.slice(0, 2); // Limit to two recommendations
    }

    // Display results if found, else show "No results found"
    if (matchedResults.length > 0) {
        matchedResults.forEach(item => {
            let recDiv = document.createElement('div');
            recDiv.classList.add('recommendation-item');

            let image = document.createElement('img');
            image.src = item.imageUrl;
            image.alt = item.name;

            let title = document.createElement('h3');
            title.textContent = item.name;

            let description = document.createElement('p');
            description.textContent = item.description;

            recDiv.appendChild(image); // Image first
            recDiv.appendChild(title); // Location second
            recDiv.appendChild(description); // Description underneath

            resultsDiv.appendChild(recDiv);
        });
    } else {
        resultsDiv.innerHTML = "<p>No results found for your search.</p>";
    }
}

// Function to reset search
function resetSearch() {
    document.getElementById('search-input').value = ""; // Clear input field
    document.getElementById('recommendations').innerHTML = ""; // Clear results
}

// Add event listener to search button
document.getElementById("search-btn").addEventListener("click", searchFunction);

// Add event listener to clear button
document.getElementById("clear-btn").addEventListener("click", resetSearch);
