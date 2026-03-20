class Attack {

    static all_attacks = {};
    // TODO mettre en anglais
    constructor(id, nom, type, puissance, duree) {
        this.id = id;
        this.nom = nom;
        this.type = type;
        this.puissance = puissance;
        this.duree = duree;
    }

    toString() {
        return `${this.nom} : #${this.id}, ${this.type}, ${this.puissance}, ${this.duree}ms`;
    }

    static fill_attacks() {
        let all_moves = [...fast_moves, ...charged_moves];
        for (const item of all_moves) {
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