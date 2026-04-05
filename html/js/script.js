Attack.fill_attacks();
Type.fill_types();
Pokemon.fill_Pokemons()

// récuperation des éléments de la page
const popup = document.getElementById('popup');              // Cadre de la popup
const imgPopup = popup.querySelector('img');                 // img de la popup
const tableBody = document.getElementById('pokemonBody');    // tbody de la page
const numPageVisuel = document.getElementById('numPage');    // affichage du num de page 0 / 30 ...

// fonction pour injecter le tableau dans le HTML
function displayPokemons(pokemonList) { 
    tableBody.textContent = "";                                             // reset le tableau avant chaque pagination
    maxPoke = 26;                                                           // max d'instances par pages
    numPage = parseInt(numPageVisuel.textContent.split('/')[0].trim());     // numero de page actuelle 
    pokemonList = pokemonList.slice(numPage*maxPoke, (numPage+1)*maxPoke);  // liste temp de pokemon a afficher
    pokemonList.forEach(pokemon => {
        const row = document.createElement('tr');                           // création d'une ligne avec les infos du poemon
        const rowDetail = document.createElement('tr');                     // création de la ligne en dessous avec les details
        // boucle imbriquée pour determiner la géneration, je t'aime wikipedia
        const generation = pokemon.pokemon_id < 152 ? 'Gen 1' : pokemon.pokemon_id < 252 ? 'Gen 2' : pokemon.pokemon_id < 387 ? 'Gen 3' : pokemon.pokemon_id < 494 ? 'Gen 4' : pokemon.pokemon_id < 650 ? 'Gen 5' : pokemon.pokemon_id < 722 ? 'Gen 6' : pokemon.pokemon_id < 810 ? 'Gen 7' : pokemon.pokemon_id < 891 ? 'Gen 8' : pokemon.pokemon_id < 1011 ? 'Gen 9' : 'Gen 10';
        
        rowDetail.id = `pokemon-${pokemon.pokemon_id}`;                     // on donne un ID a 
        rowDetail.style.display = "none";
        
        
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
        
        rowDetail.innerHTML = `
            <td colspan=8>
            <div>
            <h2> Attaques Rapides : </h2>
            <p> ${pokemon.rapides} </p>
            <h2> Attaques Chargées : </h2>
            <p> ${pokemon.chargees} </p>
            </div>
            </td>
        `;
        
        tableBody.appendChild(row);
        tableBody.appendChild(rowDetail);
        
        const imgMinia = row.querySelector('img');

        imgMinia.addEventListener('mouseover', (e) => {
            const imgPoke = imgMinia.src.replace('thumbnails', 'images'); 
            imgPopup.src = imgPoke;
            popup.style.display = 'block';
        });
        
        
        imgMinia.addEventListener('mouseout', () => {
            popup.style.display = 'none';
        });
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