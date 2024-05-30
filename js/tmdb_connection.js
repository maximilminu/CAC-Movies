document.addEventListener('DOMContentLoaded', () => {
    const API_SERVER = 'https://api.themoviedb.org/3';
    const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM2I3YTM1NDAzNGIxN2E1ZDEwZDU3YjI5NjlkZDI3MSIsInN1YiI6IjYyOTExM2QwMDllZDhmMDA1MGZkMDA1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uXj5QSis1CVJvEsiy8XiUZM3BGavMhzG8puSbwpihNA'; 
    
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    };

    const loadTrendingMovies = async (page = 1) => {
        try {
            const response = await fetch(`${API_SERVER}/movie/popular?page=${page}`, options);
            const data = await response.json();
            const movies = data.results;
    
            const galeriaTendencias = document.querySelector('.galeriaTendencias');
            galeriaTendencias.innerHTML = '';
    
            movies.forEach(movie => {
                const col = document.createElement('div');
                col.classList.add('col-md-3');
                const link = document.createElement('a');
                link.href = `./pages/detalle.html?id=${movie.id}`;
                const img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                img.alt = movie.title;
                img.loading = 'lazy';
                // Add data-movie-id attribute to store the movie ID
                img.setAttribute('data-movie-id', movie.id);
                link.appendChild(img);
                col.appendChild(link);
                galeriaTendencias.appendChild(col);
            });
    
            const prevButton = document.getElementById('botonAnterior');
            const nextButton = document.getElementById('botonSiguiente');
            prevButton.setAttribute('data-page', page - 1);
            nextButton.setAttribute('data-page', page + 1);
    
            prevButton.style.display = page === 1 ? 'none' : 'block';
            nextButton.style.display = page === data.total_pages ? 'none' : 'block';
            
            // Listen for click events on images to get movie ID
            galeriaTendencias.addEventListener('click', event => {
                const clickedImg = event.target.closest('img');
                if (clickedImg) {
                    const movieId = clickedImg.getAttribute('data-movie-id');
                    console.log('Clicked on movie with ID:', movieId);
                    // Now you can use this movie ID to fetch movie details or perform any other action
                }
            });
        } catch (error) {
            console.error('Error loading trending movies:', error);
        }
    };
/*
    const loadTrendingMovies = async (page = 1) => {
        try {
            const response = await fetch(`${API_SERVER}/movie/popular?page=${page}`, options);
            const data = await response.json();
            const movies = data.results;
            
            const galeriaTendencias = document.querySelector('.galeriaTendencias');
            galeriaTendencias.innerHTML = ''; 
            
            movies.forEach(movie => {
                const col = document.createElement('div');
                col.classList.add('col-md-3');
                const link = document.createElement('a');
                link.href = `./pages/detalle.html?id=${movie.id}`; 
                const img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; 
                img.alt = movie.title;
                img.loading = 'lazy';
                link.appendChild(img);
                col.appendChild(link);
                galeriaTendencias.appendChild(col);
            });

            const prevButton = document.getElementById('botonAnterior');
            const nextButton = document.getElementById('botonSiguiente');
            prevButton.setAttribute('data-page', page - 1);
            nextButton.setAttribute('data-page', page + 1);

            prevButton.style.display = page === 1 ? 'none' : 'block';
            nextButton.style.display = page === data.total_pages ? 'none' : 'block';
        } catch (error) {
            console.error('Error loading trending movies:', error);
        }
    };
    */
    const loadTopRatedMovies = async (page = 1) => {
        try {
            const response = await fetch(`${API_SERVER}/movie/upcoming?page=${page}`, options);
            const data = await response.json();
            const movies = data.results;
            
            const galeriaAclamadas = document.querySelector('.galeriaAclamadas');
            galeriaAclamadas.innerHTML = ''; 
            movies.forEach(movie => {
                const col = document.createElement('div');
                col.classList.add('col-md-3');
                const link = document.createElement('a');
                link.href = `./pages/detalle.html?id=${movie.id}`
                const img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; 
                img.alt = movie.title;
                img.loading = 'lazy';
                link.appendChild(img);
                col.appendChild(link);
                galeriaAclamadas.appendChild(col);
            });

            const prevButton = document.getElementById('botonAnterior');
            const nextButton = document.getElementById('botonSiguiente');
            prevButton.setAttribute('data-page', page - 1);
            nextButton.setAttribute('data-page', page + 1);

            prevButton.style.display = page === 1 ? 'none' : 'block';
            nextButton.style.display = page === data.total_pages ? 'none' : 'block';
        } catch (error) {
            console.error('Error loading top-rated movies:', error);
        }
    };
    
    const prevButton = document.getElementById('botonAnterior');
    const nextButton = document.getElementById('botonSiguiente');

    prevButton.addEventListener('click', () => {
        let currentPage = Number(prevButton.getAttribute('data-page'));
        if (currentPage <= 1) return;
        loadTrendingMovies(currentPage - 1);
    });

    nextButton.addEventListener('click', () => {
        let currentPage = Number(nextButton.getAttribute('data-page'));
        loadTrendingMovies(currentPage);
    });

    loadTrendingMovies();
    loadTopRatedMovies();
});