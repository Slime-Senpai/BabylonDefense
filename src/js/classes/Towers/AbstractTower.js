
class Tower {

    /*
    * constructeur de la classe
    * prend en paramètres les positions en x, y, z de sa position dans l'espace
    */
    constructor(coordx, coordy, coordz) {
        this.posx = coordx;
        this.posy = coordy;
        this.posz = coordz;
        this.body = [];
        this.range = 100;
        this.damage = 30;
        this.maxCooldown = 100;
        this.cooldown = this.maxCooldown;
    }

    getPositionX() { return this.posx; }
    getPositionY() { return this.posy; }
    getPositionZ() { return this.posz; }

    setPositionY(y) {
        this.posy = y;
    }

    drawTower(scene) {
        return null;
    }

    aim(scene, listMinions) {
        if(this.cooldown>0){
            this.cooldown--;
            return false;
        }
        this.cooldown = this.maxCooldown;
        listMinions.forEach(minion => { 
            if(minion != null){
                let distance = new BABYLON.Vector3(Math.abs(this.getPositionX())-Math.abs(minion.posx), Math.abs(this.getPositionY())-Math.abs(minion.posy), Math.abs(this.getPositionZ())-Math.abs(minion.posz)).length();
                if(distance < this.range){
                    console.log("attack");
                    this.shoot(scene, minion);
                    return true;
                }
            }
        });
        return false;
    }
    
    shoot(scene, minion) {
        minion.removeLife(this.damage);
        console.log(minion.getActualLife());
    }

}
