class Pokemon {

    static all_pokemons = [];

    constructor(base_attack, base_defense, base_stamina, form, pokemon_id, pokemon_name) {
        this.base_attack = base_attack;
        this.base_defense = base_defense;
        this.base_stamina = base_stamina;
        this.form = [form];
        this.pokemon_id = pokemon_id;
        this.pokemon_name = pokemon_name;
        this.types = this.getTypes().map(type => type.nomType);
        this.rapides = this.getAttacks()[0].map(attack => attack.name);
        this.chargees = this.getAttacks()[1].map(attack => attack.name);
    }

    toString() {
        return `${this.pokemon_name} : #${this.pokemon_id}, [${this.types}], [STA: ${this.base_stamina}, ATK: ${this.base_attack}, DEF: ${this.base_defense}], Rapides = [${this.rapides}], Chargées = [${this.chargees}]`;
    }
    
    getTypes() {
        const typeInfo = pokemon_types.find(pt => pt.pokemon_id === this.pokemon_id && pt.form === this.form[0]);

        const typeDef = [];

        // console.table(typeInfo);
        for(const typeAct of typeInfo.type){
            if(Type.all_type[typeAct]){
                typeDef.push(Type.all_type[typeAct]);
            } else {
                const typeInfo2 = type_effectiveness[typeAct];
                const type = new Type(typeAct, typeInfo2.Bug, typeInfo2.Dark, typeInfo2.Dragon, typeInfo2.Electric, typeInfo2.Fairy, typeInfo2.Fighting, typeInfo2.Fire, typeInfo2.Flying, typeInfo2.Ghost, typeInfo2.Grass, typeInfo2.Ground, typeInfo2.Ice, typeInfo2.Normal, typeInfo2.Poison, typeInfo2.Psychic, typeInfo2.Rock, typeInfo2.Steel, typeInfo2.Water);
                typeDef.push(type);
            }
        }
        return typeDef;
    }

    getAttacks() {
        // infos dans pokemon_moves
        const attInfos = pokemon_moves.find(pm => pm.pokemon_id === this.pokemon_id && pm.form === this.form[0]);

        const fastAttackDef = [];
        const chargedAttackDef = [];

        // pour chaque attack on essaye de les transformer en obj
        for(const att of attInfos.fast_moves){
            if(Attack.all_attacks[att]){ // deja fait donc ok
                fastAttackDef.push(Attack.all_attacks[att]);
            } else {                    // sinon on les cree
                const attInfos2 = fast_moves.find(fm => fm.name === att);
                if(attInfos2 !== undefined){
                    const attack = new Attack(attInfos2.move_id, att, attInfos2.name, attInfos2.type, attInfos2.power, attInfos2.duration);
                    fastAttackDef.push(attack);
                }
            }
        }

        for(const att of attInfos.charged_moves){
            if(Attack.all_attacks[att]){ // deja fait donc ok
                chargedAttackDef.push(Attack.all_attacks[att]);
            } else {                    // sinon on les cree
                const attInfos2 = charged_moves.find(fm => fm.name === att);
                const attack = new Attack(attInfos2.move_id, att, attInfos2.name, attInfos2.type, attInfos2.power, attInfos2.duration);
                chargedAttackDef.push(attack);
            }
        }

        return [fastAttackDef, chargedAttackDef];
    }

    static fillAllPokemons() {
        let all_pokemons = [...pokemons];
        for (const item of all_pokemons) {
            if(item.pokemon_id in Pokemon.all_pokemons.map(p => p.pokemon_id)){
                Pokemon.all_pokemons[item.pokemon_id].types.push(item.type);
                Pokemon.all_pokemons[item.pokemon_id].rapides.push(item.fast_moves);    
                Pokemon.all_pokemons[item.pokemon_id].chargees.push(item.charged_moves);
                Pokemon.all_pokemons[item.pokemon_id].form.push(item.form);
            } else {
                Pokemon.all_pokemons.push(new Pokemon(item.base_attack, item.base_defense, item.base_stamina, item.form, item.pokemon_id, item.pokemon_name, item.type, item.fast_moves, item.charged_moves));
            }
        }
    }
}

// const bulbasaur = new Pokemon(118, 111, 128, "Normal", 1, "Bulbasaur");
// console.table(bulbasaur.toString());
// Pokemon.fillAllPokemons();
// console.table(Pokemon.all_pokemons);