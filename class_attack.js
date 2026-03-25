class Attack {

    static all_attacks = {};
    constructor(id, nom, type, power, duration) {
        this.id = id;
        this.name = nom;
        this.type = type;
        this.power = power;
        this.duration = duration;
    }

    toString() {
        return `${this.name} : #${this.id}, ${this.type}, ${this.power}, ${this.duration}ms`;
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