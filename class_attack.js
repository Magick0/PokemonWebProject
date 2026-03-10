class Attack{

    static all_attacks = [];

    constructor(id,nom,type,puissance,duree){
        this.id = id
        this.nom = nom 
        this.type = type
        this.puissance = puissance
        this.duree = duree
    }

    toString() {
        return `${this.name} : #${this.id}, ${this.type}, ${this.power}, ${this.duration}ms`;
    }

    fill_attack(){
        // parcours de pokemon_moves 
        for(let item of pokemon_moves){
            let index = 1;
            // création de l'objet
            let attaque = new Attack(index,item.name,item.type,item.power,item.duration)
            index++;
            // insertion de l'objet dans la variable de classe
            Attack.all_attacks[attaque.id] = attaque;
        }

        // parcours de fast_moves
        for(let item of fast_moves){
            let index = 1;
            // création de l'objet
            let attaque = new Attack(index,item.name,item.type,item.power,item.duration)
            index++;
            // insertion de l'objet dans la variable de classe
            Attack.all_attacks[attaque.id] = attaque;
        }

        // parcours de charged_moves
        for(let item of charged_moves){
            let index = 1;
            // création de l'objet
            let attaque = new Attack(index,item.name,item.type,item.power,item.duration)
            index++;
            // insertion de l'objet dans la variable de classe
            Attack.all_attacks[attaque.id] = attaque;
        }

    }
}