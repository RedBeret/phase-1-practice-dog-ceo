// line logs a message to the console with a custom style
console.log('%c HI', 'color: firebrick')

// these are the apis we will be using
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

// This comes from the index.html file and is where we will be adding the dog images
const breedsList = document.querySelector('#dog-breeds');

// This event listener waits for the page to load before running the code inside
window.addEventListener('load', () => {

    // This fetch request gets the dog images from the API and adds them to the page
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const imagesContainer = document.querySelector('#dog-image-container');
            data.message.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                imagesContainer.appendChild(img);
            });
        })
        .catch(error => console.error(error));

    // This fetch request is what gets teh dog breeds from the API and adds them to the page
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breeds = Object.keys(data.message);
            breeds.forEach(breed => {
                const li = document.createElement('li');
                li.textContent = breed;
                li.addEventListener('click', () => {
                    li.style.color = 'red';
                });
                breedsList.appendChild(li);
            });
        })
        .catch(error => console.error(error));

    // This event listener waits for the person to select a letter from the dropdown
    const dropdown = document.querySelector('#breed-dropdown');
    dropdown.addEventListener('change', (event) => {
        const letter = event.target.value;
        const breedList = breedsList.querySelectorAll('li');
        breedList.forEach(li => {
            if (li.textContent.startsWith(letter)) {
                li.style.display = '';
            } else {
                li.style.display = 'none';
            }
        });
    });
});