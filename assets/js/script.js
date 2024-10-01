const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];
let no_image_available = 'assets/img/images.jpeg'; // Path to your default image

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString) ||
            character.actor.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
    try {
        document.getElementById('load').classList.remove('d-none');
        const res = await fetch('https://hp-api.onrender.com/api/characters');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    } finally {
        document.getElementById('load').classList.add('d-none');
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters.map((character) => {
        return `
            <li class="character">
                <img src="${character.image || no_image_available}" alt="${character.name}">
                <h2>${character.name}</h2>
                <p><strong>House:</strong> ${character.house}</p>
                <p><strong>Actor:</strong> ${character.actor}</p>
                <p><strong>Ancestry:</strong> ${character.ancestry}</p>
                <p><strong>Date of Birth:</strong> ${character.dateOfBirth}</p>
            </li>
        `;
    }).join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters();
