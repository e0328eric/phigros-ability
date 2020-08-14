// Damage constants of given difficulty
// For each element corresponds by
// [good damage, bad damage, miss damage, perfect life heal]
const lifeDamage: [number, number, number, number][] = [
    [1, 2, 4, 0.1],
    [0.5, 2, 4, 0.15],
    [0, 1, 3, 0.1],
];

export class PhigrosAbility {
    life: number = 100;
    score: number = 0;
    difficulty: number;

    constructor(difficulty: string) {
        this.difficulty = Number(difficulty);
    }

    changeLife(total: number, great: string, bad: string, miss: string) {
        var perfect = total - Number(great) - Number(bad) - Number(miss);
        var changedLife =
            this.life +
            lifeDamage[this.difficulty][3] * perfect -
            lifeDamage[this.difficulty][0] * Number(great) -
            lifeDamage[this.difficulty][1] * Number(bad) -
            lifeDamage[this.difficulty][2] * Number(miss);
        this.life = changedLife < 0 ? 0 : changedLife > 100 ? 100 : changedLife;
    }
}
