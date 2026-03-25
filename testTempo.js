function getPokemonsByType(typeName){
    // afficher la liste des pokemon pour un type donnée
    for (const type of pokemon_types){
        // si on retrouve le type 
        if(type.type.includes(typeName)){
            const stats = pokemons.find(
                p => p.pokemon_id === type.pokemon_id && p.form == type.form
            );
            if(stats){
                // on créer un pokemon temporaire qu'on affiche
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
        // on liste les élement à parcourir
        moves = [...attack.charged_moves,...attack.elite_charged_moves,...attack.elite_fast_moves,...attack.fast_moves];
        // si dans nos élement on retrouve l'attack recherché
        if(moves.includes(attackName)){
            const stats = pokemons.find(
                p => p.pokemon_id === attack.pokemon_id && p.form == attack.form
            );
            if(stats){
                // on créer un pokemon temporaire qu'on affiche
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
    // On remplie all attack
    Attack.fill_attacks();
    // pour toutes les attack
    for(const attack of Object.values(Attack.all_attacks)){
        // si le type de l'attaque correspond à notre recherche
        if(typeName === attack.type){
            // on l'affiche
            console.table(attack);
        }
    }
}

function sortPokemonByTypeThenName(){
    // liste des pokemon trie par type puis par nom
}
