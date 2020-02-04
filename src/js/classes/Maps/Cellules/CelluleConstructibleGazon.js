

class CelluleGazon extends CelluleConstructible {

    constructor (coordx, coordy, coordz) {
        super (coordx, coordy, coordz);
    }

    createCellule (scene) {
        super.createCellule (scene);
        try {
            let tower = this.tower.drawTower (scene);
            return this.objectCellule, tower;
        }
        catch (e) { return this.objectCellule; }
    }
}
