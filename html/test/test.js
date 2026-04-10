// Q1 / Done
function getPokemonsByType(typeName){
    // afficher la liste des pokemon pour un type donnée
    for (const poke of pokemon_types){
        // si on retrouve le type
        if(poke.type.includes(typeName)){
            const stats = pokemons.find(
                p => p.pokemon_id === poke.pokemon_id && p.form === poke.form
            );
            if(stats){
                // on créer un pokemon temporaire qu'on affiche
                const p = new Pokemon(
                    stats.base_attack,
                    stats.base_defense,
                    stats.base_stamina,
                    stats.pokemon_id,
                    stats.pokemon_name
                )
                console.log(p.toString());
            }
        }
    }
}

// Q2 / Done
function getPokemonsByAttack(attackName){
    // liste des pokémon pour une attaque donnée
    for (const attack of pokemon_moves){
        // on liste les élement à parcourir
        const moves = [
            ...(attack.charged_moves ?? []),
            ...(attack.elite_charged_moves ?? []),
            ...(attack.elite_fast_moves ?? []),
            ...(attack.fast_moves ?? [])
        ];
        // si dans nos élement on retrouve l'attack recherché   
        if(moves.includes(attackName)){ 
            const stats = pokemons.find(
                p => p.pokemon_id === attack.pokemon_id
            );
            if(stats){
                // on créer un pokemon temporaire qu'on affiche
                const p = new Pokemon(
                    stats.base_attack,
                    stats.base_defense,
                    stats.base_stamina,
                    stats.pokemon_id,
                    stats.pokemon_name
                )
                console.log(p.toString());
            }
        }
    }
}

// Q3 / Done
function getAttacksByType(typeName){
    // pour toutes les attack
    for(const attack of Object.values(Attack.all_attacks)){
        // si le type de l'attaque correspond à notre recherche
        if(typeName === attack.type){
            // on l'affiche
            console.log(attack.toString());
        }
    }
}

// Q4 / Done
function sortPokemonByTypeThenName(tabPokemon) {
    // on trie par type
    const sortedPokemonsType = [...tabPokemon].sort((a, b) => {
        // on concatene pour prendre en compte si un pokemon a plusieurs types
        const typeA = [...a.types].sort().join(',');
        const typeB = [...b.types].sort().join(',');

        if(typeA != typeB){
            const typeComparison = typeA.localeCompare(typeB);
            return typeComparison;
        } else {
            const sortedPokemonsName = [...tabPokemon].sort((a, b) => {
                return a.pokemon_name.localeCompare(b.pokemon_name);
            });
        }
    });
    console.table(sortedPokemonsType);
    return sortedPokemonsType;
}

// Q5 // Done
// Dans class_pokemon.js 

// Q6 // Done
// Dans class_pokemon.js 

// Q7 // Done
function fastFight(pokemonA, pokemonB){
    fight = {}      // on créer un tableau pour pouvoir afficher plus tard le combat
    tour = 0        // on initialise les tours
    while(pokemonA.base_stamina > 0 && pokemonB.base_stamina > 0){ // tant qu'un pokemon a encore de la vie
        tour++;       // on incr&mente le tour

        // pour changer de pokemon attaquant et defenseur a chaque tour :
        pokeAtt = (tour % 2 == 0) ? pokemonA : pokemonB;    // le pokemon Att est le PokemonA si le nbr de tour est paire
        pokeDef = (tour % 2 == 0) ? pokemonB : pokemonA;    // l'inverse ici

        // on ajoute dans fight le tour actuel
        fight[tour] = {
            "tour": tour,
            "Attaquant": pokeAtt.pokemon_name,
            "ATK": pokeAtt.base_attack,
            "Défenseur": pokeDef.pokemon_name,
            "DEF": pokeDef.base_defense,
            "Nom Attaque": pokeAtt.getBestFastAttacksForEnemy(false, pokeDef.pokemon_name).atk.name,
            "Efficacité": pokeAtt.getBestFastAttacksForEnemy(false, pokeDef.pokemon_name).eff,
            "Dégats": pokeAtt.getBestFastAttacksForEnemy(false, pokeDef.pokemon_name).pts,
            "Reste": Math.floor(pokeDef.base_stamina - pokeAtt.getBestFastAttacksForEnemy(false, pokeDef.pokemon_name).pts)
        }
        // on met a jour la vie du pokemon defenseur pour continuer le combat
        pokeDef.base_stamina -= pokeAtt.getBestFastAttacksForEnemy(false, pokeDef.pokemon_name).pts;
    }
    console.table(fight)
}