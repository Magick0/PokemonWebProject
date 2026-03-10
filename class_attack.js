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

    fill_attacks() {

        let index = 1;

        // regrouper toutes les sources de données
        let all_moves = [...pokemon_moves, ...fast_moves, ...charged_moves];

        for (let item of all_moves) {

            let attaque = new Attack(
                index,
                item.name,
                item.type,
                item.power,
                item.duration
            );

            Attack.all_attacks[index] = attaque;
            index++;
        }
    }
}