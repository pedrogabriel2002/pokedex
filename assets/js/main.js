const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151;
const limit = 10
let offset = 0

function loadPokemonItems(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}"/>
            </div>
            <div>
                <p class="pokemon-status">HP:<span>${pokemon.status[0]}</span></p><hr>
                <p class="pokemon-status">ATTACK:<span>${pokemon.status[1]}</span></p><hr>
                <p class="pokemon-status">DEFENSE:<span>${pokemon.status[2]}</span></p><hr>
                <p class="pokemon-status">SPECIAL ATTACK:<span>${pokemon.status[3]}</span></p><hr>
                <p class="pokemon-status">SPECIAL DEFENSE:<span>${pokemon.status[4]}</span></p><hr>
                <p class="pokemon-status">SPEED:<span>${pokemon.status[5]}</span></p>
            </div>
        </li>`
        ).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtRecordNextPage = offset + limit

    if (qtRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }
})