
class WaveTest extends Wave {

    /*
    * constructeur de la classe
    * prend en paramètres un tableau des ennemies à faire apparaître, un tableau des les temps entre chaque ennemis, la case où les faire apparaître et la case où ils doivent aller
    */
    constructor(minions, cooldowns, cellStart, cellEnd, game) {
        super(minions, cooldowns, cellStart, cellEnd, game);
    }


    spawn() {
        if(this.cooldown > 0){
            this.cooldown--;
            return 0;
        }
        if(this.spawning < this.minions.length){
            console.log("Spawned!");
            let object = this.minions[this.spawning];
            this.game.listMinions[this.spawning] = new object(this.cellStart);
            this.game.listMinions[this.spawning].createMinion(this.game.map.mainScene);
            this.game.listMinions[this.spawning].moveTo(this.cellEnd);
            this.cooldown = this.cooldowns[this.spawning];
            this.spawning++;
            return 1;
        }
        return -1;
    }

}
