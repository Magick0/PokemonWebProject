class Attack {

    static all_attacks = {}; // dictionnaire contenant les Objets Attack

    // constructeur de la classe Attack
    constructor(id, nom, type, power, duration) {
        this.id = id;
        this.name = nom;
        this.type = type;
        this.power = power;
        this.duration = duration;
    }

    // toString de Attack
    toString() {
        return `${this.name} : #${this.id}, ${this.type}, ${this.power}, ${this.duration}ms`;
    }

    // fonction pour remplire le dictionnaire all_attacks 
    static fill_attacks() {
        let all_moves = [...fast_moves, ...charged_moves];  // on récupere les fast moves et charged moves 
        // pour chaque attaques 
        for (const item of all_moves) {
            // On indexe les attaques sur leurs ID 
            Attack.all_attacks[item.move_id] = new Attack(
                item.move_id, 
                item.name,
                item.type,
                item.power,
                item.duration
            );
        }
    }
}

// Attack.fill_attacks();
// console.table(Attack.all_attacks);
// console.table(Attack.all_attacks);