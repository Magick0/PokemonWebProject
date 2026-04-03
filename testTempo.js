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

// Q4 / TODO
function sortPokemonByTypeThenName(){
    // liste des pokemon trie par type puis par nom
    // en attente de Pokemon.js
}

// Q5 / In Working
function getWeakestEnemies(attackName){
    // list des pokemon pour lesquelles l'attaque donné est la plus éfficace (nom de l'attaque = chaine de caractère)
    // en attente de Pokemon.js
    Pokemon.fillAllPokemons();
    console.table(Pokemon.all_pokemons);
}

// Q6 // Done
function getBestFastAttacksForEnemy(print, pokemonName){
    const pokemon = Object.values(Pokemon.all_pokemons).find(p => p.pokemon_name === pokemonName);
    const attacks = Attack.all_attacks;
    var maxDmg = 0;
    var bestAttacks = [];
    for (const att of Object.values(attacks)) {
        
        const dmg = calcDmg(att, pokemon);

        if(print === true){
            var cont = ` ${att.name} : ${dmg} damages, \n`;
            console.log("Contre " + pokemonName + " : " + cont);
        }

        if(dmg > maxDmg){
            maxDmg = dmg;
            bestAttacks = [att]; 
        } else if(dmg === maxDmg){
            bestAttacks.push(att);
        }
    }

    bestAttacksSorted = bestAttacks.sort((a, b) => a.name.localeCompare(b.name));

    return  {atk: bestAttacksSorted[0], pts: calcDmg(bestAttacksSorted[0], pokemon), eff: getEff(bestAttacksSorted[0], pokemon)};
}

function getEff(att, pokemon){
    const type = Type.all_types[pokemon.types[0]]; // TODO : gérer les pokémon avec 2 types, pour l'instant on prend que le premier type du pokémon, à voir si on peut faire mieux que ça (même si c'est pas forcément évident)
    return type[att.type];
}

function calcDmg(att, pokemon){
    return (att.power * getEff(att, pokemon) * Math.round(pokemon.base_attack / pokemon.base_defense));
}

// Q7 / TODO
function fastFight(pokemonA, pokemonB){

}