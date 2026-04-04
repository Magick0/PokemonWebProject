
class Type{

    static all_types = {};
    static tabTemp = {};


    constructor(nom, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16, t17, t18){
        this.nomType = nom
        this.Bug = t1
        this.Dark = t2
        this.Dragon = t3
        this.Electric = t4
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


    static fill_types() {
        for (var types in type_effectiveness) {
            var effectiveness = type_effectiveness[types];
            Type.all_types[types] = new Type( 
                types,
                effectiveness.Bug, 
                effectiveness.Dark, 
                effectiveness.Dragon, 
                effectiveness.Electric, 
                effectiveness.Fairy, 
                effectiveness.Fighting, 
                effectiveness.Fire, 
                effectiveness.Flying, 
                effectiveness.Ghost, 
                effectiveness.Grass, 
                effectiveness.Ground, 
                effectiveness.Ice, 
                effectiveness.Normal, 
                effectiveness.Poison, 
                effectiveness.Psychic, 
                effectiveness.Rock, 
                effectiveness.Steel, 
                effectiveness.Water
            );
        }
    }



    toString() {
        const groups = {};
        for (const [key, value] of Object.entries(this)) {
            if (key === "nomType") continue;

            if (!groups[value]) {
                groups[value] = [];
            }
            groups[value].push(key);
        }

        const sortedEffs = Object.keys(groups).map(Number).sort((a, b) => b - a);
        const segments = sortedEffs.map(eff => {
            const types = groups[eff].sort(); 
            const effDisplay = (eff === 1) ? "1.0" : eff.toString();
            return `${effDisplay} = [${types.join(', ')}]`;
        });

        return `${this.nomType} : ${segments.join(', ')}`;
    }
}

// const bug = new Type("Bug",1.0,1.6,1.0,1.0,0.625,0.625,0.625,0.625,0.625,1.6,1.0,1.0,1.0,0.625,1.6,1.0,0.625,1.0);

// bug.triTst();
// console.table(bug.toString());

// Type.fill_types();
// console.table(Type.all_types);

