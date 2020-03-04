
class MapTest extends Map {

    constructor(x, y, game) {
        super(game);

        this.listCellules = [];

        let line;

        for (let i = 0; i < x; i++) {
            line = [];
            for (let j = 0; j < y; j++) {
                line.push(new CelluleGazon(i, 0, j));

                //line[j].setTower (TowerTest);
            }
            this.listCellules.push(line);
        }

        for (let i = 5; i < 12; i++) {
            this.listCellules[i - 3][8].setTower(TowerTest, game);
            this.listCellules[i-3][11].setTower (TowerTestDeux, game);

            this.listCellules[3][i].monter(5);
            this.listCellules[4][i].monter(10);
            this.listCellules[5][i].monter(15);
            this.listCellules[6][i].monter(10);
            this.listCellules[7][i].monter(5);
        }

    }
}
