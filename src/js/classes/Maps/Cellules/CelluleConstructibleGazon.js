

class CelluleGazon extends CelluleConstructible {

    constructor (coordx, coordy, coordz, game) {
        super (coordx, coordy, coordz, game);

        this.name = "CelluleConstructibleGazon";
    }

    /*getCelluleColor() {
        return new BABYLON.Color4(0, 0.8, 0, 1);
    }*/

    createCellule (scene) {
        super.createCellule (scene);
        try {
            let tower = this.tower.drawTower (scene);
            return this.objectCellule, tower;
        }
        catch (e) { return this.objectCellule; }
    }
}
