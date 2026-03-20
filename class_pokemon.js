class Pokemon {
    constructor(base_attack, base_defense, base_stamina, form, pokemon_id, pokemon_name) {
        this.base_attack = base_attack;
        this.base_defense = base_defense;
        this.base_stamina = base_stamina;
        this.form = form;
        this.pokemon_id = pokemon_id;
        this.pokemon_name = pokemon_name;
        this.types = this.getTypes();
        this.rapides = this.getAttacks()[0];
        this.chargees = this.getAttacks()[1];
    }

    toString() {
        return `${this.pokemon_name} : #${this.pokemon_id}, [${this.types.join(", ")}], [STA: ${this.base_stamina}, ATK: ${this.base_attack}, DEF: ${this.base_defense}], Rapides = [], Chargées = []`;
    }
    
    getTypes() {
        const typeInfo = pokemon_types.find(pt => 
            pt.pokemon_id === this.pokemon_id && pt.form === this.form
        );
        // console.table(typeInfo.type);
        return typeInfo.type;
    }

    getAttacks() {
        const rapidesInfo = pokemon_moves.find(pm => 
            pm.pokemon_id === this.pokemon_id && pm.form === this.form
        );
        // console.table(rapidesInfo.fast_moves, rapidesInfo.charged_moves);
        return [rapidesInfo.fast_moves, rapidesInfo.charged_moves];
    }
}