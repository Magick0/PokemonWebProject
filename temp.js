// Q6 // In working
function getBestFastAttacksForEnemy(print, pokemonName){

    if(print === true){
        const pokemon = Object.values(Pokemon.all_pokemons).find(p => p.pokemon_name === pokemonName);
        const attacks = Attack.all_attacks;
        const type = Object.values(Type.all_types).find(t => t.nomType === pokemon.type);
        console.table(pokemon);
        for (att of Object.entries(attacks)) {
            console.table(att[1]);
            var cont = ` ${att[1].name} : ${att[1].power * att[1].efficacite * (pokemon.base_atk / pokemon.base_def)} damages, \n`;
            console.log("Contre " + pokemonName + " : " + cont);
        }
    }; 
}


Attack.fill_attacks();
Pokemon.fill_Pokemons();
Type.fill_types();
console.table(getBestFastAttacksForEnemy(true, "Bulbasaur"));
