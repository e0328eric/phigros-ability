export class PhigrosAbility {
    constructor(difficulty) {
        this.life = 100;
        this.score = 0;
        this.difficulty = Number(difficulty);
    }
    changeLife(total, great, bad, miss) {
        var perfect = total - Number(great) - Number(bad) - Number(miss);
        var changedLife = this.life +
            0.1 * perfect -
            Number(great) -
            Number(bad) * 2 -
            Number(miss) * 4;
        this.life = changedLife < 0 ? 0 : changedLife > 100 ? 100 : changedLife;
    }
}
