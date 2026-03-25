
class Type{

    static all_type = {};
    tabTemp = {};


    constructor(nom, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16, t17, t18){
        this.nomType = nom
        this.Bug = t1
        this.Dark = t2
        this.Dragon = t3
        this.Elecrtic = t4
        this.Fairy = t5
        this.Fighting = t6
        this.Fire = t7
        this.Flying = t8
        this.Ghost= t9
        this.Grass = t10
        this.Ground = t11
        this.Ice = t12
        this.Normal = t13
        this.Poison = t14
        this.Psychic = t15
        this.Rock = t16
        this.Steel = t17
        this.Water = t18
    }


    static fill_types(){
        let all_types = [...pokemon_types];
        for (const item of all_types) {
            Type.all_type[item.nomType] = {
                "Bug": item.Bug,
                "Dark": item.Dark,
                "Dragon": item.Dragon,
                "Electric": item.Elecrtic,
                "Fairy": item.Fairy,
                "Fighting": item.Fighting,
                "Fire": item.Fire,
                "Flying": item.Flying,
                "Ghost": item.Ghost,
                "Grass": item.Grass,
                "Ground": item.Ground,
                "Ice": item.Ice,
                "Normal": item.Normal,
                "Poison": item.Poison,
                "Psychic": item.Psychic,
                "Rock": item.Rock,
                "Steel": item.Steel,
                "Water": item.Water
            };
        }
    }

    triTst(){
        const tabTypes = {
            [this.nomType]: {
                "Bug": this.Bug,
                "Dark": this.Dark,
                "Dragon": this.Dragon,
                "Electric": this.Elecrtic,
                "Fairy": this.Fairy,
                "Fighting": this.Fighting,
                "Fire": this.Fire,
                "Flying": this.Flying,
                "Ghost": this.Ghost,
                "Grass": this.Grass,
                "Ground": this.Ground,
                "Ice": this.Ice,
                "Normal": this.Normal,
                "Poison": this.Poison,
                "Psychic": this.Psychic,
                "Rock": this.Rock,
                "Steel": this.Steel,
                "Water": this.Water
            }
        };

        let tabTemp = {};

        for (const [nomT, val] of Object.entries(tabTypes[this.nomType])) {
            if (!this.tabTemp[val]) {
                this.tabTemp[val] = [];
            }
            this.tabTemp[val].push(nomT);
        }
    }

    toString(){
        let head = `${this.nomType} : `;
        let cont = "";

        for (const [eff, types] of Object.entries(this.tabTemp)) {
            cont += ` ${eff} : [${types}],`;
        };
        return head + cont;
    }

}

// const bug = new Type("Bug",1.0,1.6,1.0,1.0,0.625,0.625,0.625,0.625,0.625,1.6,1.0,1.0,1.0,0.625,1.6,1.0,0.625,1.0);

// bug.triTst();
// console.table(bug.toString());


// console.table(Type.all_type);
// bug.fill_types();
// console.table(Type.all_type);

