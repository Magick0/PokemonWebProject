import { type_effectiveness } from './data.js';

class Type{

    static all_type;


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

<<<<<<< HEAD
    triTst(){
        let tabTypes = [];
        for (let i = 1; i < 19; i++) {
            tabTypes.push(this['t' + i])
        }
        console.table(tabTypes);
    }

    toString(){
        return '${this.nomType} : ${this.Bug} = []'}

    

}

const bug = new Type("Bug", 1, 2, 3, 4, 5, 6,1 ,1 , 1, 1,1 ,1 ,1 ,1 ,1, 1, 1, 1);

bug.triTst();
=======
    fill_types(){

    }
}
>>>>>>> f755b56455d7670bc23002af9f6169637c5ba717
