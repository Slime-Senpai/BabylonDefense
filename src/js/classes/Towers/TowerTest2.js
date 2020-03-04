
class TowerTestDeux extends Tower {

    constructor (coordx, coordy, coordz) {
        super (coordx, coordy, coordz);

        this.height = 50;
    }

    drawTower (scene) {
        /*let lesPieds = BABYLON.MeshBuilder.CreateCylinder("cone",
                                                            { diameterTop: 11,
                                                              diameter: 12,
                                                              height: this.height * 0.1,
                                                              tessellation: 96},
                                                             scene);

        lesPieds.position.x = this.posx;
        lesPieds.position.y = this.posy + this.height * 0.1 / 2;
        lesPieds.position.z = this.posz;*/





        let colorBase = new BABYLON.Color4 (0.3, 0.3, 0.3, 1);
        let base = BABYLON.MeshBuilder.CreateCylinder("cone",
                                                            { diameterTop: 14,
                                                              diameter: 14,
                                                              height: this.height,
                                                              tessellation: 8,
                                                              faceColors: [colorBase, colorBase, colorBase]},
                                                             scene);

        /*var greenMat = new BABYLON.StandardMaterial("greenMat", scene);
       	greenMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
       	greenMat.alpha = 0.8;

        let colorChapeau = new BABYLON.Color4 (0.7, 0.1, 0.6, 1);
        let chapeau = BABYLON.MeshBuilder.CreateCylinder("cone",
                                                            { diameter: 16,
                                                              height: this.height * 0.3,
                                                              tessellation: 96
                                                            faceColors: [colorChapeau, colorChapeau, colorChapeau] },
                                                             scene);
        chapeau.material = greenMat;*/



        /*let laCeriseSurLeChapeau = BABYLON.MeshBuilder.CreateSphere("sphereCeriseChapeau", {diameter: 8, diameterY: 6}, scene);
        laCeriseSurLeChapeau.position.x = this.posx;
        laCeriseSurLeChapeau.position.y = this.posy + this.height;
        laCeriseSurLeChapeau.position.z = this.posz;
        laCeriseSurLeChapeau.material = greenMat;*/


        let petiteMerdouille;
        let colorMerdouille = new BABYLON.Color4 (0.8, 0.6, 0.4, 1);

        let nbMerdouilles = 8;
        for (let i=0; i<nbMerdouilles; i++) {
            petiteMerdouille = BABYLON.MeshBuilder.CreateCylinder("cone",
                                              { diameter: 3,
                                                height: this.height,
                                                tessellation: 96,
                                                faceColors: [colorBase, colorBase, colorBase]},
                                                scene);
            petiteMerdouille.position.x = this.posx + Math.cos (2 * i * Math.PI / nbMerdouilles) * 6;
            petiteMerdouille.position.y = this.posy + this.height / 2;
            petiteMerdouille.position.z = this.posz + Math.sin (2 * i * Math.PI / nbMerdouilles) * 6;
        }
        base.position.x = this.posx;
        base.position.y = this.posy + this.height / 2;
        base.position.z = this.posz;

        chapeau.position.x = this.posx;
        chapeau.position.y = this.posy + this.height * 0.8;
        chapeau.position.z = this.posz;
    }
}
