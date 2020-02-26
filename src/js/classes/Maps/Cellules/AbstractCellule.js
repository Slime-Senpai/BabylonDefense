var RADIUSCELLULE = 30;

class Cellule {

    constructor (coordx, coordy, coordz) {
        // Cellule est un classe abstraite !
        if (this.constructor === Cellule) {
            throw new TypeError("La classe Cellule est un classe abstraite. Créez un classe fille pour l'utiliser.");
        }

        this.radius = RADIUSCELLULE;

        this.posx = coordx * this.radius;
        this.posy = coordy;
        this.posz = coordz * this.radius;

        this.coordx = coordx;
        this.coordy = coordy;
        this.coordz = coordz;

        this.name = "Cellule";
        
        this.objectCellule = null;
    }

    isCliqued (actionManager) {
        // console.log(this, event, actionManager);
        game.createMenu (this);
    }

    getCelluleColor() {
        let color;
        if ((this.coordx%2 == 0 && this.coordz%2 == 0) || (this.coordx%2 == 1 && this.coordz%2 == 1)) {
            color = new BABYLON.Color4(1, 1, 1, 1);
        }else { 
            color = new BABYLON.Color4(0, 0, 0, 0); 
        }
        return color;
    }

    createCellule (scene, camera) {
        let color = this.getCelluleColor();

        this.objectCellule = BABYLON.MeshBuilder.CreateBox("cellule", {height: 0.1 + this.posy,
                                                                    depth: this.radius,
                                                                    width: this.radius,
                                                                    faceColors: [color, color, color, color, color, color]}, scene);



        this.objectCellule.position.x = this.posx;
        this.objectCellule.position.y = this.posy / 2;
        this.objectCellule.position.z = this.posz;

        this.objectCellule.actionManager = new BABYLON.ActionManager(scene);
        this.objectCellule.actionManager.registerAction(
            new BABYLON.InterpolateValueAction (
                BABYLON.ActionManager.OnPickTrigger,
                camera,
                'alpha',
                0,
                500,
                new BABYLON.PredicateCondition (
                    this.objectCellule.actionManager,
                    () => {
                        this.isCliqued (this.objectCellule.actionManager);
                    }
                )
            )
        );

        return this.objectCellule;
    }

    monter (n) {
        this.coordy += n;
        this.posy = this.coordy;
    }
}
