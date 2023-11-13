document.addEventListener('DOMContentLoaded', () => {
    const dogButton = document.querySelector('.btn-primary');
    const weatherButton = document.getElementById('getWeather');

    dogButton.addEventListener('click', () => {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(data => {
                addSlideToCarousel('#dogCarousel', data.message);
            })
            .catch(error => {
                console.error('Error fetching the dog image:', error);
                addSlideToCarousel('#dogCarousel', 'img/PlaceHolderDog.png');
            });
    });

    weatherButton.addEventListener('click', () => {
        const city = document.getElementById('cityInput').value;
        const url = `https://goweather.herokuapp.com/weather/${city}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const weatherContent = `
                    <div>
                        <h3>Weather in ${city}</h3>
                        <p>Temperature: ${data.temperature}</p>
                        <p>Wind: ${data.wind}</p>
                        <p>Description: ${data.description}</p>
                    </div>`;
                addSlideToCarousel('#weatherCarousel', weatherContent);
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
            });
    });

    function addSlideToCarousel(carouselId, content) {
        const carouselInner = document.querySelector(`${carouselId} .carousel-inner`);
        const newSlide = document.createElement('div');
        newSlide.className = 'carousel-item';
        if (carouselInner.children.length === 0) {
            newSlide.classList.add('active');
        }
        if(carouselId === '#dogCarousel') {
            newSlide.innerHTML = `<img src="${content}" class="d-block w-100" alt="Random Dog">`;
        } else {
            newSlide.innerHTML = content;
        }
        carouselInner.appendChild(newSlide);
    }
});
