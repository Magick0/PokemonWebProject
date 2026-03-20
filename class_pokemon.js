class Pokemon {
    constructor(base_attack, base_defense, base_stamina, form, pokemon_id, pokemon_name) {
        this.base_attack = base_attack;
        this.base_defense = base_defense;
        this.base_stamina = base_stamina;
        this.form = form;
        this.pokemon_id = pokemon_id;
        this.pokemon_name = pokemon_name;
        this.types = this.getTypes();
    }

    toString() {
        return `${this.pokemon_name} : #${this.pokemon_id}, [${this.types.type.join(", ")}], [STA: ${this.base_stamina}, ATK: ${this.base_attack}, DEF: ${this.base_defense}], Rapides = [], Chargées = []`;
    }
    
    getTypes() {
        const typeInfo = pokemon_types.find(pt => 
            pt.pokemon_id === this.pokemon_id && pt.form === this.form
        );
        // console.table(typeInfo.type);
        return typeInfo;
    }
}


const bulbasaur = new Pokemon(118, 111, 128, "Normal", 1, "Bulbasaur");
bulbasaur.getTypes();
console.table(bulbasaur.toString());