class Pokemon {

    static all_pokemons = [];

    constructor(base_attack, base_defense, base_stamina, pokemon_id, pokemon_name) {
        this.pokemon_id = pokemon_id;
        this.pokemon_name = pokemon_name;
        this.base_stamina = base_stamina;
        this.base_attack = base_attack;
        this.base_defense = base_defense;
        this.types = this.getTypes();
        this.rapides = this.getAttacks()[0];
        this.chargees = this.getAttacks()[1];
    }

    toString() {
        return `${this.pokemon_name} : #${this.pokemon_id}, [${this.types}], [STA: ${this.base_stamina}, ATK: ${this.base_attack}, DEF: ${this.base_defense}], Rapides = [${this.rapides}], Chargées = [${this.chargees}]`;
    }
    
    getTypes() {
        const typeInfo = pokemon_types.find(pt => pt.pokemon_id === this.pokemon_id);
        if (!typeInfo) return []; // add psk y'a des fois ou ça return rien donc erreur dans les test plus loins
        return typeInfo.type;
    }

    getAttacks() {
        const attInfos = pokemon_moves.find(pm => pm.pokemon_id === this.pokemon_id);
        if (!attInfos) return [[],[]]; // add psk y'a des fois ou ça return rien donc erreur dans les test plus loins
        return [attInfos.fast_moves, attInfos.charged_moves];
    }

    static fill_Pokemons() {
        for (var poke in pokemons) {
            poke = pokemons[poke];
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
    getBestFastAttacksForEnemy(print, pokemonName){
        const pokemonA = this;
        const pokemonB = Object.values(Pokemon.all_pokemons).find(p => p.pokemon_name === pokemonName);
        const attacks = Object.values(Attack.all_attacks).filter(att => pokemonA.rapides.some(move => move === att.name));

        var maxDmg = 0;
        var bestAttacks = [];
        
        for (const att of Object.values(attacks)) {
            const dmg = this.calcDmg(att, pokemonA, pokemonB);
            
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
        
        var bestAttacksSorted = bestAttacks.sort((a, b) => a.name.localeCompare(b.name));
        

        return  {atk: bestAttacksSorted[0], pts: this.calcDmg(bestAttacksSorted[0], pokemonA, pokemonB), eff: this.getEff(bestAttacksSorted[0], pokemonB)};
    }

    getEff(att, pokemon){
        const type = Type.all_types[pokemon.types[0]]; // TODO : gérer les pokémon avec 2 types, pour l'instant on prend que le premier type du pokémon, à voir si on peut faire mieux que ça (même si c'est pas forcément évident)
        return type[att.type];
    }

    calcDmg(att, pokemonA, pokemonB){
        return (att.power * this.getEff(att, pokemonB) * Math.round(pokemonA.base_attack / pokemonB.base_defense));
    }

    // Q5 // Done
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