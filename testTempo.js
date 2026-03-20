function getPokemonsByType(typeName){
    // afficher la liste des pokemon pour un type donnée
}

function getPokemonsByAttack(attackName){
    // liste des pokémon pour une attaque donnée
    for (const attack of pokemon_moves){
        moves = [...attack.charged_moves,...attack.elite_charged_moves,...attack.elite_fast_moves,...attack.fast_moves];
        if(moves.includes(attackName)){
            // console.log(attack.pokemon_id);
            for(pokemon of pokemons){
                if(pokemon.id = attack.pokemon_id){
                    poke = new Pokemon(pokemon.base_attack, pokemon.base_defense, pokemon.base_stamina, pokemon.form, pokemon.pokemon_id, pokemon.pokemon_name)
                    poke.toString();
                }
                // console.log(pokemon);
            }
        }
    }
}

function getAttacksByType(typeName){
    // liste des attaques pour un type donnée
}

function sortPokemonByTypeThenName(){
    // liste des pokemon trie par type puis par nom
}
