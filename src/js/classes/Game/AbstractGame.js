
class Game {

    constructor () {
        // Game est un classe abstraite !
        if (this.constructor === Game) {
            throw new TypeError("La classe Game est un classe abstraite. Créez un classe fille pour l'utiliser.");
        }

        this.maxLife = 10;
        this.actualGold = 0
        this.actualWorkers = 0;

        this.map = null;
    }

    move () {
        this.listMinions.forEach((minion) => {
          minion.move (this.map.getCellule(((minion.posx + RADIUSCELLULE / 2) / RADIUSCELLULE) | 0, ((minion.posy + RADIUSCELLULE / 2) / RADIUSCELLULE) | 0));
        });
    }

    resize () {
        this.map.resize ();
    }
}
