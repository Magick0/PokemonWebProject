// Q6 // In working
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



// Attack.fill_attacks();
// Pokemon.fill_Pokemons();
// Type.fill_types();
// console.table(getBestFastAttacksForEnemy(true, "Bulbasaur"));
