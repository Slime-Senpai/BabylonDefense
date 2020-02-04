
class Tower {

    /*
    * constructeur de la classe
    * prend en paramètres les positions en x, y, z de sa position dans l'espace
    */
    constructor (coordx, coordy, coordz) {
        this.posx = coordx;
        this.posy = coordy;
        this.posz = coordz;

    }

    getPositionX () { return this.posx; }
    getPositionY () { return this.posy; }
    getPositionZ () { return this.posz; }

    setPositionY (y) {
        this.posy = y;
    }

    drawTower (scene) {
        return null;
    }
}
