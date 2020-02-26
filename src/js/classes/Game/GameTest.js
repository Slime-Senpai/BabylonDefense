
class GameTest extends Game {

    constructor() {
        super();

        this.map = new MapTest(16, 16);

        this.actualWorkers = 10;
        this.actualGold = 1000;

        this.listMinions = [];
        let cellStart = this.map.getCellule(0, 0);
        let cellEnd = this.map.getCellule(15, 0);

        console.log(cellStart, cellEnd);
        this.listMinions.push(new MinionTest(cellStart));
        this.listMinions[0].moveTo(cellEnd);


        this.map.createMap(this.listMinions);
    }
}
