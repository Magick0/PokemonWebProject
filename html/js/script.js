Attack.fill_attacks();      // Initialisation des tableaux d'obets de chaque classes
Type.fill_types();
Pokemon.fill_Pokemons();

const $popup        = $('#popup');              // Cadre de la popup
const $imgPopup     = $popup.find('img');       // img de la popup
const $tableBody    = $('#pokemonBody');         // tbody de la page
const $numPageVisuel = $('#numPage');            // affichage du num de page 0 / 30 ...
const $btnPre       = $('#pre');                 // btn précédant
const $btnSuiv      = $('#suiv');                // btn Suivant
const $btnFiltre    = $('#Filtre');              // btn Filtres
const $filtreCont   = $('#filtres');             // filtres
const $enteteTri    = $('.tri');

let listeUtil = Object.values(Pokemon.all_pokemons);

const maxPoke = 26;                              // max d'instances par pages


function displayPokemons(pokemonList) {          // fonction pour injecter le tableau dans le HTML
    $tableBody.empty();                                                         // reset le tableau avant chaque pagination
    pokemonList = Object.values(pokemonList);
    let numPage = parseInt($numPageVisuel.text().split('/')[0].trim());         // numéro de page actuelle
    const pokemonListSliced = pokemonList.slice(numPage * maxPoke, (numPage + 1) * maxPoke);  // liste temp de pokemon à afficher

    pokemonListSliced.forEach(pokemon => {

        // boucle imbriquée pour déterminer la génération
        const generation = pokemon.pokemon_id < 152 ? 'Gen 1' : pokemon.pokemon_id < 252
            ? 'Gen 2' : pokemon.pokemon_id < 387
            ? 'Gen 3' : pokemon.pokemon_id < 494
            ? 'Gen 4' : pokemon.pokemon_id < 650
            ? 'Gen 5' : pokemon.pokemon_id < 722
            ? 'Gen 6' : pokemon.pokemon_id < 810
            ? 'Gen 7' : pokemon.pokemon_id < 891
            ? 'Gen 8' : pokemon.pokemon_id < 1011
            ? 'Gen 9' : 'Gen 10';

        // Création des lignes
        const $row = $('<tr>');
        const $rowDetail = $('<tr>')
            .addClass('modalPokemon')
            .attr('id', `modal${pokemon.pokemon_id}`)
            .hide();                                                             // On cache par défaut les détails

        // On définit dans notre tr ce que l'on veut afficher
        $row.html(`
            <td>${pokemon.pokemon_id}</td>
            <td>${pokemon.pokemon_name}</td>
            <td>${generation}</td>
            <td>${pokemon.types.join(', ')}</td>
            <td>${pokemon.base_stamina}</td>
            <td>${pokemon.base_attack}</td>
            <td>${pokemon.base_defense}</td>
            <td><img src="webp/thumbnails/${String(pokemon.pokemon_id).padStart(3, '0')}.webp" alt="${pokemon.pokemon_name}"></td>
        `);

        // On définit dans notre deuxième tr les attaques
        $rowDetail.html(`
            <div class="modalPokemonContent">
                <button class="close" onclick="fermeModal('modal${pokemon.pokemon_id}')">&times;</button>
                <img src="webp/images/${String(pokemon.pokemon_id).padStart(3, '0')}.webp" alt="${pokemon.pokemon_name}">
                <h2> Attaques Rapides : </h2>
                <p> ${pokemon.rapides} </p>
                <h2> Attaques Chargées : </h2>
                <p> ${pokemon.chargees} </p>
            </div>
        `);

        $tableBody.append($row).append($rowDetail);                             // On injecte dans le HTML les deux lignes

        const $imgMinia = $row.find('img');                                     // on récupère l'image miniature

        // Survol de la minia -> affichage de la Popup
        $imgMinia.on('mouseover', function () {
            const imgPoke = $(this).attr('src').replace('thumbnails', 'images');
            $imgPopup.attr('src', imgPoke);     // remplace par la bonne image
            $popup.show();
        });

        // Quitte le survol de la minia -> cache la Popup
        $imgMinia.on('mouseout', function () {
            $popup.hide();
        });

        // Click sur le tr principal pour afficher les détails
        $row.on('click', function () {
            if ($rowDetail.is(':hidden')) {
                $rowDetail.css('display', 'block');
            }
        });
    });

    // change le numéro de page par celui qui convient
    console.table(pokemonList.length);
    $numPageVisuel.text(` ${numPage} / ${Math.ceil(pokemonList.length / maxPoke) - 1}`);

    // Grisage des boutons si en fin de liste ou en début de liste
    if (parseInt($numPageVisuel.text().split('/')[0].trim()) === 0) {           // Si début de liste
        $btnPre.css({ backgroundColor: '#7f7f7f', cursor: 'default', transform: 'none' });
    } else {                                                                     // Dégriser si c'est ok
        $btnPre.css({ backgroundColor: '#34495e', cursor: 'pointer', transform: 'translateY(-2px)' });
    }

    if (parseInt($numPageVisuel.text().split('/')[0].trim()) === Math.ceil(pokemonList.length / maxPoke) - 1) { // Si fin de liste
        $btnSuiv.css({ backgroundColor: '#7f7f7f', cursor: 'default', transform: 'none' });
    } else {                                                                     // Dégriser si c'est ok
        $btnSuiv.css({ backgroundColor: '#34495e', cursor: 'pointer', transform: 'translateY(-2px)' });
    }
}

function fermeModal(id) {
    $('#' + id).hide();
}

// Quand click sur Précédent
$btnPre.on('click', function () {
    let numPage = parseInt($numPageVisuel.text().split('/')[0].trim());
    if (numPage > 0) {                                                          // évite la décrémentation si page 0
        numPage--;
        $numPageVisuel.text(` ${numPage} / ${Math.ceil(listeUtil.length / maxPoke) - 1}`);
        displayPokemons(listeUtil);
    }
});

// Quand click sur Suivant
$btnSuiv.on('click', function () {
    let numPage = parseInt($numPageVisuel.text().split('/')[0].trim());
    if (numPage < Math.ceil(Object.values(listeUtil).length / maxPoke) - 1) {  // évite l'incrémentation si page max
        numPage++;
        $numPageVisuel.text(` ${numPage} / ${Math.ceil(listeUtil.length / maxPoke) - 1}`);
        displayPokemons(listeUtil);
    }
});

// Quand click sur Filtre on affiche les diff filtres dispo
$btnFiltre.on('click', function () {
    if ($filtreCont.is(':hidden')) {
        $filtreCont.css('display', 'flex');
    } else {
        $filtreCont.hide();
    }
});

// fonction pour initialiser les filtres dans le HTML
function initFiltres() {
    const $selectType   = $('<select>').attr('id', 'typeSelect');
    const $selectAttack = $('<select>').attr('id', 'attackSelect');
    const $inputPoke    = $('<input>').attr({
        id: 'inputPoke',
        type: 'text',
        placeholder: 'Chercher un Pokémon'
    });

    const types = Type.all_types;
    const attacks = Object.values(Attack.all_attacks).sort((a, b) => a.name.localeCompare(b.name));

    // on initialise le premier comme le vide par défaut
    $selectType.html('<option value="noType">---</option>');
    for (var type in types) {
        $selectType.append(`<option value="${type}">${type}</option>`);
    }

    // on initialise le premier comme le vide par défaut
    $selectAttack.html('<option value="noAttack">---</option>');
    for (const att of attacks) {
        $selectAttack.append(`<option value="${att.name}">${att.name}</option>`);
    }

    // on les ajoute dans le div conteneur
    $filtreCont.append($selectType, $selectAttack, $inputPoke);

    // si un des éléments est changé ou un nom est donné, on filtre
    $('#typeSelect').on('change', filtrage);
    $('#attackSelect').on('change', filtrage);
    $('#inputPoke').on('input', filtrage);
}

function filtrage() {
    console.log("filtre ok");
    const allPokes = Object.values(Pokemon.all_pokemons);

    // on récupère les valeurs de ce qui est sélectionné
    const typeVal   = $('#typeSelect').val();
    const attackVal = $('#attackSelect').val();
    const nameVal   = $('#inputPoke').val().toLowerCase();

    const filtre = allPokes.filter(p => {
        const nameF = p.pokemon_name.toLowerCase().includes(nameVal);
        const typeF = (typeVal === "noType") || p.types.includes(typeVal);
        console.table(p.rapides);
        const attF  = (attackVal === "noAttack") || p.rapides.some(a => a.includes(attackVal));
        return nameF && typeF && attF;
    });

    console.table(filtre.length);

    // on met à jour le num de page
    $numPageVisuel.text(` 0 / ${Math.max(0, Math.ceil(filtre.length / maxPoke) - 1)}`);
    console.table(` 0 / ${Math.max(0, Math.ceil(filtre.length / maxPoke) - 1)}`);

    listeUtil = filtre;
    displayPokemons(listeUtil);
}

function triPokemon(state, sujet) {
    let listTemp = listeUtil;

    if (sujet == "id") {
        listTemp.sort((a, b) => state % 2 == 0 ? a.pokemon_id - b.pokemon_id : b.pokemon_id - a.pokemon_id);
    }
    if (sujet == "nom") {
        listTemp.sort((a, b) => state % 2 == 0
            ? a.pokemon_name.localeCompare(b.pokemon_name)
            : b.pokemon_name.localeCompare(a.pokemon_name));
    }
    if (sujet == "géneration") {
        listTemp.sort((a, b) => state % 2 == 0 ? a.pokemon_id - b.pokemon_id : b.pokemon_id - a.pokemon_id);
    }
    if (sujet == "types") {
        listTemp = state % 2 == 0
            ? sortPokemonByTypeThenName(listTemp)
            : sortPokemonByTypeThenName(listTemp).reverse();
    }
    if (sujet == "endurance") {
        listTemp.sort((a, b) => state % 2 == 0 ? a.base_stamina - b.base_stamina : b.base_stamina - a.base_stamina);
        if (state % 2 == 0) console.log("endu");
    }
    if (sujet == "points d'attaque") {
        listTemp.sort((a, b) => state % 2 == 0 ? a.base_attack - b.base_attack : b.base_attack - a.base_attack);
    }
    if (sujet == "points de défense") {
        listTemp.sort((a, b) => state % 2 == 0 ? a.base_defense - b.base_defense : b.base_defense - a.base_defense);
    }

    listeUtil = listTemp;
    displayPokemons(listeUtil);
}

$enteteTri.each(function () {
    var state = 0;
    $(this).on('click', function () {
        $enteteTri.css('fontWeight', 500);                  // reset tous les entêtes
        $(this).css('fontWeight', 'bold');                  // met en gras le entête cliqué

        var sujet = $(this).html().toLowerCase().trim();
        console.log(sujet);
        triPokemon(state, sujet);
        state++;
    });
});

// appel de la fonction
initFiltres();
displayPokemons(listeUtil);