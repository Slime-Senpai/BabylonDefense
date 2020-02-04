
class CelluleConstructible extends Cellule {

    constructor (coordx, coordy, coordz) {
        super (coordx, coordy, coordz);
        this.tower = null;
    }

    monter (n) {
        super.monter (n);

        try { this.tower.setPositionY (this.posy); }
        catch (e) { }
    }

    setTower (classTower) {
        this.tower = new classTower (this.posx, this.posy, this.posz);
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
