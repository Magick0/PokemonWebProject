class Pokemon {
    constructor(base_attack, base_defense, base_stamina, form, pokemon_id, pokemon_name) {
        this.base_attack = base_attack;
        this.base_defense = base_defense;
        this.base_stamina = base_stamina;
        this.form = form;
        this.pokemon_id = pokemon_id;
        this.pokemon_name = pokemon_name;
    }

    toString() {
        return `${this.pokemon_name} : #${this.pokemon_id}, [type], [STA: ${this.base_stamina}, ATK: ${this.base_attack}, DEF: ${this.base_defense}], Rapides = [], Chargées = []`;
    }

}



Bulbasaur : #1, [Normal], [STA: 155, ATK: 118, DEF: 111], Rapides = 
[Vine Whip, Tackle], Chargées = [Sludge Bomb, Seed Bomb, Power Whip] 