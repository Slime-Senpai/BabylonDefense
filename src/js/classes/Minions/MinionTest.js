
class MinionTest extends Minion {

    constructor () {
        super (100, 5);
    }

    createMinion (scene) {
        let corpsDeLaMouche = BABYLON.MeshBuilder.CreateSphere("uneMouche", {diameter: 8}, scene);
        corpsDeLaMouche.position.x = 100;
        corpsDeLaMouche.position.y = 20;
        corpsDeLaMouche.position.z = 100;

        let roue1 = BABYLON.MeshBuilder.CreateCylinder("roue", {height: 0.5, diameter: 16, tessellation: 24}, scene);
        roue1.position = new BABYLON.Vector3 (100 + 4, 20, 100);
        roue1.rotate(new BABYLON.Vector3 (0, 0, 1), Math.PI / 2, BABYLON.Space.WORLD);

        let roue2 = BABYLON.MeshBuilder.CreateCylinder("roue", {height: 0.5, diameter: 16, tessellation: 24}, scene);
        roue2.position.x = 100 - 4;
        roue2.position.y = 20;
        roue2.position.z = 100;
        roue2.rotate(new BABYLON.Vector3 (0, 0, 1), Math.PI / 2, BABYLON.Space.WORLD);
    }
}
