
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

        this.mainCamera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 150, 0), this.mainScene);
        this.mainCamera.setTarget(new BABYLON.Vector3(150, 0, 150));
        this.mainCamera.attachControl(canvas, true);
        this.mainCamera.inputs.removeMouse();
        this.mainCamera.inputs.removeByType("FreeCameraKeyboardMoveInput");
        

        // Create our own manager:
        var FreeCameraKeyboardRestrictedInput = function () {
                this._keys = [];
                this.keysUp = [38, 90];
                this.keysDown = [40, 83];
                this.keysLeft = [37, 81];
                this.keysRight = [39, 68];
                this.speed = 0.5;
        }
    
        // Hooking keyboard events
        FreeCameraKeyboardRestrictedInput.prototype.attachControl = function (element, noPreventDefault) {
            var _this = this;
            if (!this._onKeyDown) {
                element.tabIndex = 1;
                this._onKeyDown = function (evt) {
                    if (_this.keysLeft.indexOf(evt.keyCode) !== -1 ||
                        _this.keysRight.indexOf(evt.keyCode) !== -1 ||
                        _this.keysUp.indexOf(evt.keyCode) !== -1 ||
                        _this.keysDown.indexOf(evt.keyCode) !== -1) {
                        var index = _this._keys.indexOf(evt.keyCode);
                        if (index === -1) {
                            _this._keys.push(evt.keyCode);
                        }
                        if (!noPreventDefault) {
                            evt.preventDefault();
                        }
                    }
                };
                this._onKeyUp = function (evt) {
                    if (_this.keysLeft.indexOf(evt.keyCode) !== -1 ||
                        _this.keysRight.indexOf(evt.keyCode) !== -1 ||
                        _this.keysUp.indexOf(evt.keyCode) !== -1 ||
                        _this.keysDown.indexOf(evt.keyCode) !== -1) {
                        var index = _this._keys.indexOf(evt.keyCode);
                        if (index >= 0) {
                            _this._keys.splice(index, 1);
                        }
                        if (!noPreventDefault) {
                            evt.preventDefault();
                        }
                    }
                };
    
                element.addEventListener("keydown", this._onKeyDown, false);
                element.addEventListener("keyup", this._onKeyUp, false);
                BABYLON.Tools.RegisterTopRootEvents(canvas, [
                    { name: "blur", handler: this._onLostFocus }
                ]);
            }
        };
    
        // Unhook
        FreeCameraKeyboardRestrictedInput.prototype.detachControl = function (element) {
            if (this._onKeyDown) {
                element.removeEventListener("keydown", this._onKeyDown);
                element.removeEventListener("keyup", this._onKeyUp);
                BABYLON.Tools.UnregisterTopRootEvents(canvas, [
                    { name: "blur", handler: this._onLostFocus }
                ]);
                this._keys = [];
                this._onKeyDown = null;
                this._onKeyUp = null;
            }
        };
    
        // This function is called by the system on every frame
        FreeCameraKeyboardRestrictedInput.prototype.checkInputs = function () {
            if (this._onKeyDown) {
                var camera = this.camera;
                // Keyboard
                for (var index = 0; index < this._keys.length; index++) {
                    var keyCode = this._keys[index];
                    if (this.keysLeft.indexOf(keyCode) !== -1) {
                        camera.cameraDirection.z += this.speed;
                        camera.cameraDirection.x -= this.speed;
                    }
                    else if (this.keysRight.indexOf(keyCode) !== -1) {
                        camera.cameraDirection.z -= this.speed;
                        camera.cameraDirection.x += this.speed;
                    }
                    else if (this.keysUp.indexOf(keyCode) !== -1) {
                        camera.cameraDirection.z += this.speed;
                        camera.cameraDirection.x += this.speed;
                    }
                    else if (this.keysDown.indexOf(keyCode) !== -1) {
                        camera.cameraDirection.z -= this.speed;
                        camera.cameraDirection.x -= this.speed;
                    }
                }
            }
        };
        FreeCameraKeyboardRestrictedInput.prototype.getTypeName = function () {
            return "FreeCameraKeyboardRestrictedInput";
        };
        FreeCameraKeyboardRestrictedInput.prototype._onLostFocus = function (e) {
            this._keys = [];
        };
        FreeCameraKeyboardRestrictedInput.prototype.getSimpleName = function () {
            return "keyboardRestricted";
        };
    
        // Connect to camera:
        this.mainCamera.inputs.add(new FreeCameraKeyboardRestrictedInput());

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
