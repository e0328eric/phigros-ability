// Damage constants of given difficulty
// For each element corresponds by
// [good damage, bad damage, miss damage, maximum healing gauage]
const lifeDamage = [
    [1, 2, 4, 20],
    [0.5, 2, 4, 22.5],
    [0, 2, 3, 47.5],
    [0, 1, 2, 47.5],
];
export class PhigrosAbility {
    constructor(difficulty) {
        this.life = 100;
        this.score = 0;
        this.difficulty = Number(difficulty);
    }
    changeLife(total, great, bad, miss) {
        var perfect = total - great - bad - miss;
        var changedLife = this.life +
            (lifeDamage[this.difficulty][3] * perfect) / total -
            lifeDamage[this.difficulty][0] * great -
            lifeDamage[this.difficulty][1] * bad -
            lifeDamage[this.difficulty][2] * miss;
        this.life = changedLife < 0 ? 0 : changedLife > 100 ? 100 : changedLife;
    }
}
