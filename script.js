const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const moviesContainer = document.getElementById("movies");
const statusText = document.getElementById("status");

// 🔑 Replace with API key
const API_KEY = "dd2b5644";

form.addEventListener("submit", async (e) =>{
    e.preventDefault();

    const query = input.value.trim();
    if (!query) return;

    moviesContainer.innerHTML = "";
    statusText.textContent = "Loading...";

    try {
        const response =await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        );

        const data = await response.json();

        if (data.Response === "False") {
            statusText.textContent = data.Error;
            return;
        }

        statusText.textContent ="";

        data.Search.forEach(movie => {
            const card =document.createElement("div");
            card.className ="movie";

            const poster =
            movie.Poster !== "N/A"
            ? movie.Poster
            :"https://via.placeholder.com/300x450?text=No+Image";

            card.innerHTML = `
            <img src="${poster}" alt="${movie.Title}"/>
            <h3>${movie.Title}</h3>
            <p>${movie.Year} • ${movie.Type}</p>
            `;
            
            moviesContainer.appendChild(card);         
        });
    } catch (error) {
        statusText.textContent = "Sometning went wrong. Try again.";
    }
});