class Pokemon {

    static all_pokemons = {};   // dictionnaire contenant les Objets Pokemon

    // constructeur de la classe pokemon 
    constructor(base_attack, base_defense, base_stamina, pokemon_id, pokemon_name) {
        this.pokemon_id = pokemon_id;
        this.pokemon_name = pokemon_name;
        this.base_stamina = base_stamina;
        this.base_attack = base_attack;
        this.base_defense = base_defense;
        this.types = this.getTypes();
        this.rapides = this.getAttacks()[0]; //on prend que les fast moves
        this.chargees = this.getAttacks()[1]; // on prend qu el es charged moves 
    }

    // toString de pokemon
    toString() {
        return `${this.pokemon_name} : #${this.pokemon_id}, [${this.types}], [STA: ${this.base_stamina}, ATK: ${this.base_attack}, DEF: ${this.base_defense}], Rapides = [${this.rapides}], Chargées = [${this.chargees}]`;
    }
    
    // fontion pour récuerer les types de chaque pokemons
    getTypes() {
        const typeInfo = pokemon_types.find(pt => pt.pokemon_id === this.pokemon_id);
        if (!typeInfo) return []; // add psk y'a des fois ou ça return rien donc erreur dans les test plus loins
        return typeInfo.type; // on return que les types 
    }

    // fonction pour récuperer les attaques du pokemon
    getAttacks() {
        const attInfos = pokemon_moves.find(pm => pm.pokemon_id === this.pokemon_id);
        if (!attInfos) return [[],[]]; // add psk y'a des fois ou ça return rien donc erreur dans les test plus loins
        return [attInfos.fast_moves, attInfos.charged_moves]; // on return les fast moves et charged moves dans le meme tableau 
    }

    // fonction pour remplire le dictionnaire all_pokemons
    static fill_Pokemons() {
        // pour chaque pokemon
        for (var poke in pokemons) {
            poke = pokemons[poke];
            // on inddex les pokemons sur leurs ID 
            Pokemon.all_pokemons[poke.pokemon_id] = new Pokemon(
                poke.base_attack, 
                poke.base_defense, 
                poke.base_stamina, 
                poke.pokemon_id, 
                poke.pokemon_name
            );
        }
    }

    // Q6 // Done
    // fonction pour récuperer l'attaque la plus efficace contre un pokemon donné
    getBestFastAttacksForEnemy(print, pokemonName){
        // on définit quels pokemons sont lequels
        const pokemonA = this;
        const pokemonB = Object.values(Pokemon.all_pokemons).find(p => p.pokemon_name === pokemonName);

        // On ne veut que les attaque reapides
        const attacks = Object.values(Attack.all_attacks).filter(att => pokemonA.rapides.some(move => move === att.name));

        var maxDmg = 0;
        var bestAttacks = [];
        
        // pour chaque attaques rapides
        for (const att of Object.values(attacks)) {
            // appel de calcDmg pour connaitre les dmg de l'attaque en fonction du pokemon 
            const dmg = this.calcDmg(att, pokemonA, pokemonB);
            
            // si print alors on affiche toutes les attaques et leurs dégats 
            if(print === true){
                var cont = ` ${att.name} : ${dmg} damages, \n`;
                console.log("Contre " + pokemonName + " : " + cont);
            }
            
            // si l'attaque fait le plus de dégats 
            if(dmg > maxDmg){
                maxDmg = dmg;
                bestAttacks = [att]; 
            } else if(dmg === maxDmg){ // si elle fait autant de dégats
                bestAttacks.push(att); // en cas d'égalité on prend les n attaques
            }
        
        }
        
        // on trie les attaques par nom si il y en a plusieurs
        var bestAttacksSorted = bestAttacks.sort((a, b) => a.name.localeCompare(b.name));
        
        // on retourne l'Objet Attack la plus puissante, ses dégats et son éfficacité 
        return  {atk: bestAttacksSorted[0], pts: this.calcDmg(bestAttacksSorted[0], pokemonA, pokemonB), eff: this.getEff(bestAttacksSorted[0], pokemonB)};
    }

    // fonction pour calculer l'éficacité d'une attaque en fonction du pokemon en face
    getEff(att, pokemon){
        const type = Type.all_types[pokemon.types[0]]; // TODO : gérer les pokémon avec 2 types, pour l'instant on prend que le premier type du pokémon, à voir si on peut faire mieux que ça (même si c'est pas forcément évident)
        return type[att.type];
    }

    // fonction pour calculer les degats d'ue
    calcDmg(att, pokemonA, pokemonB){
        return (att.power * this.getEff(att, pokemonB) * Math.round(pokemonA.base_attack / pokemonB.base_defense));
    }

    // Q5 // Done
    // fonction pour connaitre les ennemies contre qui l'attaque est la plus effcace
    getWeakestEnemies(attackName){
        const pokemon = Pokemon.all_pokemons;
        const attack = Object.values(Attack.all_attacks).find(att => att.name === attackName);
        var pokeEff = [];
        for(const poke of Object.values(pokemon)){
            if(this.getEff(attack, poke) > 1){
                pokeEff.push(poke);
            }
        }
        console.table(pokeEff);
    }
}

// const bulbasaur = new Pokemon(118, 111, 128, "Normal", 1, "Bulbasaur");
// console.table(bulbasaur.toString());
// Pokemon.fill_Pokemons();
// console.table(Pokemon.all_pokemons);