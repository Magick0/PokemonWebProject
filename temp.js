// Q6 // In working
function getBestFastAttacksForEnemy(print, pokemonName){

    if(print === true){
        const pokemon = Pokemon.all_pokemons.find(p => p.pokemon_name === pokemonName);
        const attacks = Attack.all_attacks;
        // console.table(attacks);

        var cont = "";
        for (att of Object.entries(attacks)) {
            // console.table(att[1]);
            if(att[1].type in Type.all_type){
                const eff = Type.all_type[att[1].type];
                console.table(eff);
            }
            
            // cont += ` ${att[1].name} : ${att[1].power * att[1].efficacite * (pokemon.base_atk / pokemon.base_def)} damages, \n`;
        }; 


        return "Contre " + pokemonName + " : \n" + cont;
    }
}

// Attack.fill_attacks();
// Type.fill_types();
// getBestFastAttacksForEnemy(true, "Bulbasaur")
// console.table(getBestFastAttacksForEnemy(true, "Bulbasaur"));
