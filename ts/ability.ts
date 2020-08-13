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
            0.1 * perfect -
            Number(great) -
            Number(bad) * 2 -
            Number(miss) * 4;
        this.life = changedLife < 0 ? 0 : changedLife > 100 ? 100 : changedLife;
    }
}
