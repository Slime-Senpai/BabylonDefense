
class GameTest extends Game {

    constructor () {
        super ();

        this.map = new MapTest (16, 16);


        this.listMinions = [];

        this.listMinions.push (new MinionTest ());


        this.map.createMap (this.listMinions);
    }
}
