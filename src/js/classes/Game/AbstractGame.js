
class Game {

    constructor () {
        // Game est un classe abstraite !
        if (this.constructor === Game) {
            throw new TypeError("La classe Game est un classe abstraite. Créez un classe fille pour l'utiliser.");
        }

        this.map = null;
    }

    resize () {
        this.map.resize ();
    }
}
