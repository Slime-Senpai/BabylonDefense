
class CelluleConstructible extends Cellule {

    constructor (coordx, coordy, coordz, game) {
        super (coordx, coordy, coordz);
        this.game = game;
        this.tower = null;
        this.name = "CelluleConstructible";
    }

    monter (n) {
        super.monter (n);

        try { this.tower.setPositionY (this.posy); }
        catch (e) { }
    }

    setTower (classTower, game) {
        this.tower = new classTower (this.posx, this.posy, this.posz);
        game.listTowers.push(this.tower);
        console.log(game.listTowers);
    }

    createCellule (scene) {
        super.createCellule (scene);
        try {
            let tower = this.tower.drawTower (scene);
            return this.objectCellule, tower;
        }
        catch (e) { return this.objectCellule; }
    }

    placeClassTurret (classTurret) {
        this.setTower (classTurret, game);
        this.tower.drawTower (game.map.mainScene);
    }
}
