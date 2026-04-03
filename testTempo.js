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
                    stats.form,
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

// Q6 // In working
function getBestFastAttacksForEnemy(print, pokemonName){
    /*
        si print == true
            list des attack (toString) &&&& dégat (Puissance x Efficacité x (base attaque A / base attaque B))
            et ça contre un pokemon donnée en paramètre

        dans tout les cas
            renvoyé : 
            * le meilleur objet attack
            * Dégat
            * Efficacité
            * un objet indépendant 
                {atk : objAttack,pts : number,eff : number}

        Si égalité entre attaque choisir la 1ère alphabetique

        En tenant compte uniquement de fast_move
    */

}

// Q7 / TODO
function fastFight(pokemonA, pokemonB){

}