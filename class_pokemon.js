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
}

// const bulbasaur = new Pokemon(118, 111, 128, "Normal", 1, "Bulbasaur");
// console.table(bulbasaur.toString());
// Pokemon.fill_Pokemons();
// console.table(Pokemon.all_pokemons);