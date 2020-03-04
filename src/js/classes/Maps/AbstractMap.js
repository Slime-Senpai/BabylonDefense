
class Map {

    constructor (game) {
        // Map est un classe abstraite !
        if (this.constructor === Map) {
            throw new TypeError("La classe Map est un classe abstraite. Créez un classe fille pour l'utiliser.");
        }

        this.game = game;

        this.engine = this.createDefaultEngine ();

        this.engine.runRenderLoop(() => {
            if (this.mainScene) {
                this.mainScene.render();
            }
        });

    }

    getCellule (x, z) {
        if(this.listCellules.length > z && z >= 0 && this.listCellules[z].length > x && x >= 0){
            return this.listCellules[z][x];
        }
        return this.listCellules[0][0];
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

        this.mainCamera = new BABYLON.FollowCamera("camera1", new BABYLON.Vector3(0, 200, 0), this.mainScene);
        this.mainCamera.setTarget(new BABYLON.Vector3(0, 0, 200));
        this.mainCamera.radius = 300;
        //this.mainCamera.heightOffset = 3; // how high above the object to place the camera
   this.mainCamera.rotationOffset = 90; // the viewing angle
   this.mainCamera.cameraAcceleration = 0; // how fast to move
   this.mainCamera.maxCameraSpeed = 50; // speed limit

        this.mainCamera.attachControl(canvas, true);

        var focus = BABYLON.Mesh.CreateSphere("focus", 8, 1.8, this.mainScene);
        focus.position.y = 0.9;
        focus.isVisible = false

    focus.speed = new BABYLON.Vector3(0, 0, 1);
    focus.nextspeed = new BABYLON.Vector3.Zero();
    // Keypress events
        window.keyisdown = {};
        window.addEventListener('keydown', function (event) {
            window.keyisdown[event.keyCode] = true;
        });

        window.addEventListener('keyup', function (event) {
            window.keyisdown[event.keyCode] = false;
        });

        window.tempv = new BABYLON.Vector3.Zero();

        this.mainScene.registerBeforeRender(() => {
            // Player speed
            var v = 1.5;
            focus.nextspeed.x = 0;
            focus.nextspeed.z = 0;

            if (window.keyisdown[37]) {
                focus.nextspeed.x = -v;
                focus.nextspeed.z = -v;
            }
            if (window.keyisdown[39]) {
                focus.nextspeed.x = v;
                focus.nextspeed.z = v;
            }
            if (window.keyisdown[38]) {
                focus.nextspeed.x = -v;
                focus.nextspeed.z = v;
            }
            if (window.keyisdown[40]) {
                focus.nextspeed.x = v;
                focus.nextspeed.z = -v;
            }

            focus.speed = BABYLON.Vector3.Lerp(focus.speed, focus.nextspeed, 0.1);

            focus.moveWithCollisions(focus.speed);
/*
            if (focus.position.x > 500.0) { focus.position.x = 500.0; }
            if (focus.position.x < -50.0) { focus.position.x = -50.0; }
            if (focus.position.z > 500.0) { focus.position.z = 500.0; }
            if (focus.position.z < -50.0) { focus.position.z = -50.0; }
*/
            //focus.nexttorch = lightImpostor.getAbsolutePosition();
            //torch.position.copyFrom(focus.nexttorch);
            //torch.intensity = 0.7 + Math.random() * 0.1;
            //torch.position.x += Math.random() * 0.125 - 0.0625;
            //torch.position.z += Math.random() * 0.125 - 0.0625;


            this.mainCamera.position.x = focus.position.x + 25;
            this.mainCamera.position.y = 200;
            this.mainCamera.position.z = focus.position.z - 25;
        });

        var getGroundPosition = () => {
            console.log(this.mainScene.pointerX | 0, this.mainScene.pointerY | 0);
            var pickinfo = this.mainScene.pick(this.mainScene.pointerX | 0, this.mainScene.pointerY | 0);
            if (pickinfo.hit) {
                return new BABYLON.Vector3(pickinfo.pickedPoint.x | 0, 0, pickinfo.pickedPoint.z | 0);
            }
            return null;
        }

        this.startingPoint;

        let pointerDown = (mesh) => {
            this.startingPoint = getGroundPosition();
        }
        let pointerUp = () => {
            if (this.startingPoint) {
                this.startingPoint = null;
                return;
            }
        }

        let pointerMove = () => {
            if (!this.startingPoint) {
                return;
            }
            var current = getGroundPosition();
            if (!current) {
                return;
            }

            //console.log(current, this.startingPoint);

            var diff = current.subtract(this.startingPoint);
            console.log(this.startingPoint, current, new BABYLON.Vector3(diff.x | 0, 0, diff.z | 0));
            focus.position.subtractInPlace(new BABYLON.Vector3(diff.x | 0, 0, diff.z | 0));

            //this.startingPoint = current;
        }

        this.mainScene.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {
          			case BABYLON.PointerEventTypes.POINTERDOWN:
            				pointerDown();
            				break;
          			case BABYLON.PointerEventTypes.POINTERUP:
                    pointerUp();
            				break;
          			case BABYLON.PointerEventTypes.POINTERMOVE:
                    pointerMove();
            				break;
            }
        });
        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(500, 1500, 500), this.mainScene);

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
