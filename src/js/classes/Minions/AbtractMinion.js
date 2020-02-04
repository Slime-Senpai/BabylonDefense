
class Minion {

    constructor (pvmax, speed) {
        this.pvmax = pvmax;
        this.speed = speed;

        this.actualpv = this.pvmax;
    }

    

    getActualLife () { return this.actualpv; }

    createMinion (scene) {

    }
}
