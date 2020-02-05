
class Minion {

    constructor (pvmax, speed, cellule) {
        this.pvmax = pvmax;
        this.speed = speed;

        // position dans l'espace
        this.posx = cellule.posx;
        this.posy = cellule.posy;
        this.posz = cellule.posz;

        // vecteurs de déplacements
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;

        // point à viser
        this.visex = this.posx;
        this.visey = this.posy;
        this.visez = this.posz;

        this.actualpv = this.pvmax;
        this.body = [];
    }



    getActualLife () { return this.actualpv; }

    createMinion (scene) {

    }

    moveTo (cellule) {
        this.visex = cellule.posx;
        this.visey = cellule.posy;
        this.visez = cellule.posz;

        this.vx = 0;
        this.vy = 0;
        this.vz = 0;


        // test dans l'axe des x
        if (this.visex + this.speed > this.posx) {
            this.vx = this.speed;
        }
        else if (this.visex - this.speed < this.posx) {
            this.vx = -this.speed
        }
        // test dans l'axe des y
        if (this.visey + this.speed > this.posy) {
            this.vy = this.speed;
        }
        else if (this.visey - this.speed < this.posy) {
            this.vy = -this.speed
        }
        // test dans l'axe des z
        if (this.visez + this.speed > this.posz) {
            this.vz = this.speed;
        }
        else if (this.visez - this.speed < this.posz) {
            this.vz = -this.speed
        }
    }

    move (actualCell) {
        if (this.visex - this.vx <= this.posx && this.visex + this.vx >= this.posx) { this.vx = 0; }
        if (this.visez - this.vz <= this.posz && this.visez + this.vz >= this.posz) { this.vz = 0; }
        this.posx += this.vx;
        this.posy += this.vy;
        this.posz += this.vz;

        if (this.posy < 0) { this.posy = 0; }

        this.body.forEach((member) => {
            member.part.position = new BABYLON.Vector3 (this.posx + member.vector.x, actualCell.posy + member.vector.y + this.height / 2, this.posz + member.vector.z);
        });
    }
}
