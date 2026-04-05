Attack.fill_attacks();
Type.fill_types();
Pokemon.fill_Pokemons()


function displayPokemons(pokemonList) {
    const tableBody = document.getElementById('pokemon-table-body');
    pokemonList.forEach(pokemon => {
        const row = document.createElement('tr');


        row.innerHTML = `
            <td>${pokemon.pokemon_id}</td>
            <td>${pokemon.pokemon_name}</td>
            <td>${pokemon.generation}</td>
            <td>${pokemon.types.join(', ')}</td>
            <td>${pokemon.base_stamina}</td>
            <td>${pokemon.base_attack}</td>
            <td>${pokemon.base_defense}</td>
            <td><img src="webp/thumbnails/${String(pokemon.pokemon_id).padStart(3, '0')}.webp" alt="${pokemon.pokemon_name}"></td>
        `;

        tableBody.appendChild(row);
    });
}

console.table(Pokemon.all_pokemons);

displayPokemons(Pokemon.all_pokemons);