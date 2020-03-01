
class GameTest extends Game {

    constructor() {
        super();

        this.map = new MapTest(16, 16);

        this.actualWorkers = 10;
        this.actualGold = 1000;

        this.listMinions = [];
        let cellStart = this.map.getCellule(7, 0);
        let cellEnd = this.map.getCellule(7, 15);

        console.log(cellStart, cellEnd);
        //this.listMinions[0].moveTo(cellEnd);

        this.wave = new WaveTest([MinionTest, MinionTest, MinionTest, MinionTest, MinionTest, MinionTest, MinionTest], [100, 100, 100, 100, 100, 100, 100], cellStart, cellEnd, this);


        this.map.createMap([]);
    }
}
