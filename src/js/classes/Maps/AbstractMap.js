
class Map {

    constructor () {
        // Map est un classe abstraite !
        if (this.constructor === Map) {
            throw new TypeError("La classe Map est un classe abstraite. Créez un classe fille pour l'utiliser.");
        }

        this.engine = this.createDefaultEngine ();

        this.engine.runRenderLoop(() => {
            if (this.mainScene) {
                this.mainScene.render();
            }
        });

    }

    getCellule (x, z) {
        return this.listCellules[z][x];
    }

    resize () {
        try {
            this.engine.resize ();
        }
        catch (e) { console.log (e); }
    }

    createDefaultEngine () {
        return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
    }

    createMap (listMinions) {
        this.mainScene = new BABYLON.Scene(this.engine);
        //this.mainCamera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), this.mainScene);

        this.mainCamera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(-50, 200, 0), this.mainScene);
        this.mainCamera.setTarget(new BABYLON.Vector3(0, 0, 0));
        this.mainCamera.attachControl(canvas, true);

        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(-100, 100, -100), this.mainScene);

        this.listCellules.forEach ((line) => {
            line.forEach ((cellule) => {
                cellule.createCellule (this.mainScene, this.mainCamera);
            });
        });

        listMinions.forEach ((minion) => {
            minion.createMinion (this.mainScene);
        });

        return this.mainScene;
    }
}
