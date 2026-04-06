
Attack.fill_attacks();      // Initialisation des tableaux d'obets de chaque classes
Type.fill_types();
Pokemon.fill_Pokemons()


const popup = document.getElementById('popup');              // Cadre de la popup
const imgPopup = popup.querySelector('img');                 // img de la popup
const tableBody = document.getElementById('pokemonBody');    // tbody de la page
const numPageVisuel = document.getElementById('numPage');    // affichage du num de page 0 / 30 ...
const btnPre = document.getElementById('pre');               // btn précedant
const btnSuiv = document.getElementById('suiv');             // btn Suivant

const maxPoke = 26;                                          // max d'instances par pages


function displayPokemons(pokemonList) {                     // fonction pour injecter le tableau dans le HTML
    tableBody.textContent = "";                                             // reset le tableau avant chaque pagination
    numPage = parseInt(numPageVisuel.textContent.split('/')[0].trim());     // numero de page actuelle 
    pokemonList = pokemonList.slice(numPage*maxPoke, (numPage+1)*maxPoke);  // liste temp de pokemon a afficher
    pokemonList.forEach(pokemon => {
        const row = document.createElement('tr');                           // création d'une ligne avec les infos du poemon
        const rowDetail = document.createElement('tr');                     // création de la ligne en dessous avec les details
        

        // boucle imbriquée pour determiner la géneration, je t'aime wikipedia
        const generation = pokemon.pokemon_id < 152 ? 'Gen 1' : pokemon.pokemon_id < 252 
            ? 'Gen 2' : pokemon.pokemon_id < 387 
            ? 'Gen 3' : pokemon.pokemon_id < 494 
            ? 'Gen 4' : pokemon.pokemon_id < 650 
            ? 'Gen 5' : pokemon.pokemon_id < 722 
            ? 'Gen 6' : pokemon.pokemon_id < 810 
            ? 'Gen 7' : pokemon.pokemon_id < 891 
            ? 'Gen 8' : pokemon.pokemon_id < 1011 
            ? 'Gen 9' : 'Gen 10';                                           

        rowDetail.style.display = "none";                                   // On cache par defauts les details    
        
        
        // On définit dans notre tr ce que l'on veut afficher
        row.innerHTML = `               
            <td>${pokemon.pokemon_id}</td>
            <td>${pokemon.pokemon_name}</td>
            <td>${generation}</td>
            <td>${pokemon.types.join(', ')}</td>
            <td>${pokemon.base_stamina}</td>
            <td>${pokemon.base_attack}</td>
            <td>${pokemon.base_defense}</td>
            <td><img src="webp/thumbnails/${String(pokemon.pokemon_id).padStart(3, '0')}.webp" alt="${pokemon.pokemon_name}"></td>
        `;                                                                                                                                              // pour l'image on va chercher les images en fonction des id de pokemons
        
         // On définit dans notre deuxième tr les attaques
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
        

        tableBody.appendChild(row);                                         // On injecte dans le HTML la ligne principale
        tableBody.appendChild(rowDetail);                                   // On injecte dans le HTML la ligne secondaire
        
        const imgMinia = row.querySelector('img');                          // on récupere l'image miniature

        // Survol de la minia -> affichage de la Popup
        imgMinia.addEventListener('mouseover', () => {  
            const imgPoke = imgMinia.src.replace('thumbnails', 'images'); 
            imgPopup.src = imgPoke;     // remplace par la bonne image
            popup.style.display = 'block';
        });
        
        // Quitte le survol de la minia -> cache la Popup
        imgMinia.addEventListener('mouseout', () => {
            popup.style.display = 'none';
        });

        // Click sur le tr principal pour afficher les details 
        row.addEventListener('click', () => {
            if(rowDetail.style.display == "none"){
                rowDetail.style.display = "contents";
            } else if(rowDetail.style.display == "contents"){
                rowDetail.style.display = "none";
            }
        });
    });
    
    // change le numero de page par celui qui convient
    numPageVisuel.textContent = ` ${numPage} / ${Math.ceil(Object.values(Pokemon.all_pokemons).length / maxPoke)-1}`;


    // Grisage des boutons is en fin de lsite ou en début de liste 
    if(parseInt(numPageVisuel.textContent.split('/')[0].trim()) == 0 ){ // Si début de liste 
        btnPre.style.backgroundColor = "#7f7f7f"
        btnPre.style.cursor = "default"
        btnPre.style.transform = "none"
    } else {    // dégriser si c'est ok 
        btnPre.style.backgroundColor = "#34495e"
        btnPre.style.cursor = "pointer"
        btnPre.style.transform = "translateY(-2px)"
    }
        
    if (parseInt(numPageVisuel.textContent.split('/')[0].trim()) == Math.ceil(Object.values(Pokemon.all_pokemons).length / maxPoke)-1){ // si Fin de liste 
        btnSuiv.style.backgroundColor = "#7f7f7f"
        btnSuiv.style.cursor = "default"
        btnSuiv.style.transform = "none"
    } else {    // dégriser si c'est ok 
        btnSuiv.style.backgroundColor = "#34495e"
        btnSuiv.style.cursor = "pointer"
        btnSuiv.style.transform = "translateY(-2px)"
    }

}

// Quand click sur Précedent 
btnPre.addEventListener('click', () => {
    const numPageVisuel = document.getElementById('numPage');
    let numPage = parseInt(numPageVisuel.textContent.split('/')[0].trim());
    if(numPage > 0){    // évite la décrementation si page 0
        numPage--;
        numPageVisuel.textContent = ` ${numPage} / ${Math.ceil(Object.values(Pokemon.all_pokemons).length / maxPoke)-1}`;
        displayPokemons(Pokemon.all_pokemons);
    }
});

// Quand click sur Suivant
btnSuiv.addEventListener('click', () => {
    const numPageVisuel = document.getElementById('numPage');
    let numPage = parseInt(numPageVisuel.textContent.split('/')[0].trim());
    if(numPage < Math.ceil(Object.values(Pokemon.all_pokemons).length / maxPoke) - 1){ // évite l'incrémentation si page max
        numPage++;
        numPageVisuel.textContent = ` ${numPage} / ${Math.ceil(Object.values(Pokemon.all_pokemons).length / maxPoke)-1}`;
        displayPokemons(Pokemon.all_pokemons);
    }
});

// appel de la fonction
displayPokemons(Pokemon.all_pokemons);