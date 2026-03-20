function getPokemonsByType(typeName){
    // afficher la liste des pokemon pour un type donnée
}

function getPokemonsByAttack(attackName){
    // liste des pokémon pour une attaque donnée

    Attack.fill_attacks();
    
    Attack.all_attacks.forEach(attack => {
        if(Attack.all_attacks["nom"] == attackName){
            console.table(Attack.all_attacks["id"].toString())
        }
    });
    
}

function getAttacksByType(typeName){
    // liste des attaques pour un type donnée
}

function sortPokemonByTypeThenName(){
    // liste des pokemon trie par type puis par nom
}
