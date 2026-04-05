Attack.fill_attacks();
Type.fill_types();
Pokemon.fill_Pokemons()


function displayPokemons(pokemonList) {
    const tableBody = document.getElementById('pokemonBody');
    const numPageVisuel = document.getElementById('numPage');
    tableBody.textContent = "";
    maxPoke = 26;
    numPage = parseInt(numPageVisuel.textContent.split('/')[0].trim());
    console.log(numPage);
    pokemonList = pokemonList.slice(numPage*maxPoke, (numPage+1)*maxPoke);
    console.log(numPage*maxPoke);
    console.log((numPage + 1));
    pokemonList.forEach(pokemon => {
        const row = document.createElement('tr');
        
        
        const generation = pokemon.pokemon_id < 152 ? 'Gen 1' : pokemon.pokemon_id < 252 ? 'Gen 2' : pokemon.pokemon_id < 387 ? 'Gen 3' : pokemon.pokemon_id < 494 ? 'Gen 4' : pokemon.pokemon_id < 650 ? 'Gen 5' : pokemon.pokemon_id < 722 ? 'Gen 6' : pokemon.pokemon_id < 810 ? 'Gen 7' : pokemon.pokemon_id < 891 ? 'Gen 8' : pokemon.pokemon_id < 1011 ? 'Gen 9' : 'Gen 10';
        row.innerHTML = `
        <td>${pokemon.pokemon_id}</td>
        <td>${pokemon.pokemon_name}</td>
        <td>${generation}</td>
        <td>${pokemon.types.join(', ')}</td>
        <td>${pokemon.base_stamina}</td>
        <td>${pokemon.base_attack}</td>
        <td>${pokemon.base_defense}</td>
        <td><img src="webp/thumbnails/${String(pokemon.pokemon_id).padStart(3, '0')}.webp" alt="${pokemon.pokemon_name}"></td>
        `;
        
        tableBody.appendChild(row);
    });

    numPageVisuel.textContent = ` ${numPage} / ${Math.ceil(Object.values(Pokemon.all_pokemons).length / maxPoke)-1}`;
}

document.getElementById('Pre').addEventListener('click', () => {
    const numPageVisuel = document.getElementById('numPage');
    let numPage = parseInt(numPageVisuel.textContent.split('/')[0].trim());
    if(numPage > 0){
        numPage--;
        numPageVisuel.textContent = ` ${numPage} / ${Math.ceil(Object.values(Pokemon.all_pokemons).length / maxPoke)-1}`;
        displayPokemons(Pokemon.all_pokemons);
    }
});

document.getElementById('Next').addEventListener('click', () => {
    const numPageVisuel = document.getElementById('numPage');
    let numPage = parseInt(numPageVisuel.textContent.split('/')[0].trim());
    if(numPage < Math.ceil(Object.values(Pokemon.all_pokemons).length / maxPoke) - 1){
        numPage++;
        numPageVisuel.textContent = ` ${numPage} / ${Math.ceil(Object.values(Pokemon.all_pokemons).length / maxPoke)-1}`;
        displayPokemons(Pokemon.all_pokemons);
    }
});


console.table(Pokemon.all_pokemons);

displayPokemons(Pokemon.all_pokemons);