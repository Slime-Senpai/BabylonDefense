
class Wave {

    /*
    * constructeur de la classe
    * prend en paramètres un tableau des ennemies à faire apparaître, un tableau des les temps entre chaque ennemis, la case où les faire apparaître et la case où ils doivent aller
    */
    constructor(minions, cooldowns, cellStart, cellEnd, game) {
        // Wave est un classe abstraite !
        if (this.constructor === Wave) {
            throw new TypeError("La classe Wave est un classe abstraite. Créez un classe fille pour l'utiliser.");
        }
        this.minions = minions;
        this.cooldowns = cooldowns;
        this.cellStart = cellStart;
        this.cellEnd = cellEnd;
        this.game = game;
        this.spawning = 0;
        this.cooldown = 0;
    }


    spawn() {
        
    }

}
