// Q4 / Demander Gemini pk les deux sort renvoient la meme liste, le sort type ne marche pas 
// function sortPokemonByTypeThenName(){
//     // liste des pokemon trie par type et liste tre par nom
//     pokeSortType = Pokemon.all_pokemons.sort((a, b) => a.types[0].localeCompare(b.types[0]));
//     pokeSortAlph = Pokemon.all_pokemons.sort((a, b) => a.pokemon_name.localeCompare(b.pokemon_name));
//     console.log("Tri par Type :");
//     console.table(pokeSortType);
//     console.log("Tri par Nom :");
//     console.table(pokeSortAlph);
//     if(pokeSortAlph === pokeSortType){
//         console.log("PAREIL")
//     }
// }

// Pokemon.fill_Pokemons();
// sortPokemonByTypeThenName();


// Q7 / TODO
function fastFight(pokemonA, pokemonB){
    pokeA = pokemonA;
    pokeB = pokemonB;
    fight = {}
    tour = 0
    att = getBestFastAttacksForEnemy(false, pokeA)
    console.table(att);
    // pokeA.base_stamina > 0 && pokeB.base_stamina > 0
    while(tour < 10){
        tour++;
        pokeAtt = (tour % 2 == 0) ? pokeA : pokeB;
        pokeDef = (tour % 2 == 0) ? pokeB : pokeA;
        fight[tour] = {
            "tour": tour,
            "Attaquant": pokeAtt.pokemon_name,
            "ATK": pokeAtt.base_attack,
            "Défenseur": pokeDef.pokemon_name,
            "DEF": pokeDef.base_defense,
            "Nom Attaque": getBestFastAttacksForEnemy(false, pokeDef.pokemon_name),
            "Efficacité": "",
            "Dégats": "",
            "Reste": ""
        }
    }
    console.table(fight)
}

Pokemon.fill_Pokemons();
fastFight(Pokemon.all_pokemons[1], Pokemon.all_pokemons[2]);