// Damage constants of given difficulty
// For each element corresponds by
// [good damage, bad damage, miss damage, maximum healing gauage]
const lifeDamage: [number, number, number, number][] = [
    [1, 2, 4, 20],
    [0.5, 2, 4, 22.5],
    [0, 2, 3, 47.5],
    [0, 1, 2, 47.5],
];

export class PhigrosAbility {
    life: number = 100;
    score: number = 0;
    difficulty: number;

    constructor(difficulty: string) {
        this.difficulty = Number(difficulty);
    }

    changeLife(total: number, great: number, bad: number, miss: number) {
        var perfect = total - great - bad - miss;
        var changedLife =
            this.life +
            (lifeDamage[this.difficulty][3] * perfect) / total -
            lifeDamage[this.difficulty][0] * great -
            lifeDamage[this.difficulty][1] * bad -
            lifeDamage[this.difficulty][2] * miss;
        this.life = changedLife < 0 ? 0 : changedLife > 100 ? 100 : changedLife;
    }
}
