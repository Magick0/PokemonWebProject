function getPokemonsByType(typeName){
    // afficher la liste des pokemon pour un type donnée
    for (const type of pokemon_types){
        if(type.type.includes(typeName)){
            const stats = pokemons.find(
                p => p.pokemon_id === type.pokemon_id && p.form == type.form
            );
            if(stats){
                const p = new Pokemon(
                    stats.base_attack,
                    stats.base_defense,
                    stats.base_stamina,
                    stats.form,
                    stats.pokemon_id,
                    stats.pokemon_name
                )
                console.log(p.toString());
            }
        }
    }
}

function getPokemonsByAttack(attackName){
    // liste des pokémon pour une attaque donnée
    for (const attack of pokemon_moves){
        moves = [...attack.charged_moves,...attack.elite_charged_moves,...attack.elite_fast_moves,...attack.fast_moves];
        if(moves.includes(attackName)){
            const stats = pokemons.find(
                p => p.pokemon_id === attack.pokemon_id && p.form == attack.form
            );
            if(stats){
                const p = new Pokemon(
                    stats.base_attack,
                    stats.base_defense,
                    stats.base_stamina,
                    stats.form,
                    stats.pokemon_id,
                    stats.pokemon_name
                )
                console.log(p.toString());
            }
        }
    }
}
function getAttacksByType(typeName){
    Type.fill_types();
    console.table(all_type);
}

function sortPokemonByTypeThenName(){
    // liste des pokemon trie par type puis par nom
}
