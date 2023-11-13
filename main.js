document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.btn-primary');
    const image = document.querySelector('.card-img-top');

    button.addEventListener('click', () => {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                image.src = data.message;
                image.alt = "Random Dog Image";
            })
            .catch(error => {
                console.error('Error fetching the dog image:', error);
                image.src = 'img/PlaceHolderDog.png'; // Placeholder image on error
            });
    });
});

document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    const url = `https://goweather.herokuapp.com/weather/${city}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const display = document.getElementById('weatherDisplay');
            display.innerHTML = `
                <p>Temperature: ${data.temperature}</p>
                <p>Wind: ${data.wind}</p>
                <p>Description: ${data.description}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            document.getElementById('weatherDisplay').innerHTML = `<p>Error fetching weather data.</p>`;
        });
});

