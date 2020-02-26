
class MinionTest extends Minion {

    constructor(cellule) {
        super(100, 0.5, cellule);

        this.height = 16;
    }

    createMinion(scene) {
        let corpsDeLaMouche = BABYLON.MeshBuilder.CreateSphere("uneMouche", { diameter: 8 }, scene);
        corpsDeLaMouche.position.x = this.posx;
        corpsDeLaMouche.position.y = this.posy;
        corpsDeLaMouche.position.z = this.posz;

        let roue1 = BABYLON.MeshBuilder.CreateCylinder("roue", { height: 0.5, diameter: this.height, tessellation: 24 }, scene);
        roue1.position = new BABYLON.Vector3(this.posx + 4, this.posy, this.posz);
        roue1.rotate(new BABYLON.Vector3(0, 0, 1), Math.PI / 2, BABYLON.Space.WORLD);

        let roue2 = BABYLON.MeshBuilder.CreateCylinder("roue", { height: 0.5, diameter: this.height, tessellation: 24 }, scene);
        roue2.position.x = this.posx - 4;
        roue2.position.y = this.posy;
        roue2.position.z = this.posz;
        roue2.rotate(new BABYLON.Vector3(0, 0, 1), Math.PI / 2, BABYLON.Space.WORLD);

        this.body.push({ "part": corpsDeLaMouche, "vector": { x: 0, y: 0, z: 0 } });
        this.body.push({ "part": roue1, "vector": { x: 4, y: 0, z: 0 } });
        this.body.push({ "part": roue2, "vector": { x: -4, y: 0, z: 0 } });
    }
}
