document.addEventListener('DOMContentLoaded', () => {
    const getUrlParameter = name => {
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(window.location.href);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };

    const API_SERVER = 'https://api.themoviedb.org/3';
    
    const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM2I3YTM1NDAzNGIxN2E1ZDEwZDU3YjI5NjlkZDI3MSIsInN1YiI6IjYyOTExM2QwMDllZDhmMDA1MGZkMDA1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uXj5QSis1CVJvEsiy8XiUZM3BGavMhzG8puSbwpihNA'; 

    const movieId = getUrlParameter('id');

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    };

    async function fetchMovieDetails() {
        try {
            const response = await fetch(`${API_SERVER}/movie/${movieId}`, options);
            const data = await response.json();
    
            const title = data.title;
            const overview = data.overview;
            const image = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
            const videoKey = data.video ? data.video.key : null;
    
            const movieDetailsElement = document.getElementById('movie-details');
            
            const titleElement = document.createElement('h2');
            titleElement.textContent = title;
    
            const imageElement = document.createElement('img');
            imageElement.src = image;
            imageElement.alt = title;
            imageElement.classList.add('img-fluid', 'mb-3');
    
            const overviewTitleElement = document.createElement('h3');
            overviewTitleElement.textContent = 'Overview';
    
            const overviewElement = document.createElement('p');
            overviewElement.textContent = overview;
    
            movieDetailsElement.appendChild(titleElement);
            movieDetailsElement.appendChild(imageElement);
            movieDetailsElement.appendChild(overviewTitleElement);
            movieDetailsElement.appendChild(overviewElement);
    
            if (videoKey) {
                const videoElement = document.createElement('iframe');
                videoElement.width = '560';
                videoElement.height = '315';
                videoElement.src = `https://www.youtube.com/embed/${videoKey}`;
                videoElement.frameBorder = '0';
                videoElement.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
                videoElement.allowFullscreen = true;
                movieDetailsElement.appendChild(videoElement);
            }
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    }

    fetchMovieDetails();
});