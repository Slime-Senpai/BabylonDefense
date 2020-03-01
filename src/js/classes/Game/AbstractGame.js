var CSSACTUALMENU = {
    "position": "absolute",
    "width": "300px",
    "height": "100%",
    "backgroundColor": "rgba(170, 170, 170, 0.9)",
    "right": "0px",
    "top": "0px"
};



class Game {

    constructor() {
        // Game est un classe abstraite !
        if (this.constructor === Game) {
            throw new TypeError("La classe Game est un classe abstraite. Créez un classe fille pour l'utiliser.");
        }

        this.maxLife = 10;
        this.actualGold = 0
        this.actualWorkers = 0;

        this.map = null;

        this.actualMenu = null;

        this.listTowers = [];
    }

    // fonctions appelée par un clic utilisateur sur une cellule
    // fait apparaître un menu sur le côté de l'écran avec une description de la cellule cliquée
    createMenu(cellule) {
        // commençons par drop un éventuel menu déjà présent
        try { this.actualMenu.remove(); }
        catch (e) { }

        // créons maintenant l'objet
        this.actualMenu = document.createElement("div");
        for (var key in CSSACTUALMENU) {
            this.actualMenu.style[key] = CSSACTUALMENU[key];
        }

        this.actualMenu.appendChild(this.createNameCoords(cellule));

        document.body.appendChild(this.actualMenu);
    }

    createNameCoords(cellule) {
        let mainDiv = document.createElement("div");
        let table = document.createElement("table");
        let caption = document.createElement("caption");
        caption.innerHTML = cellule.name;

        let tr1 = document.createElement("tr");
        let tr1td1 = document.createElement("td");
        tr1td1.innerHTML = "X : " + (cellule.coordx);
        let tr1td2 = document.createElement("td");
        tr1td2.innerHTML = "Y : " + (cellule.coordy);
        let tr1td3 = document.createElement("td");
        tr1td3.innerHTML = "Z : " + (cellule.coordz);

        tr1.appendChild(tr1td1);
        tr1.appendChild(tr1td2);
        tr1.appendChild(tr1td3);
        table.appendChild(caption);
        table.appendChild(tr1);
        mainDiv.appendChild(table);
        return mainDiv;
    }

    move() {
        this.wave.spawn();
        if(this.listMinions.length > 0){
            for(let i=0; i<this.listMinions.length; i++){
                if(this.listMinions[i] != null && this.listMinions[i].isDead == true){
                    this.listMinions.splice(i, 1);
                    console.log(this.listMinions);
                }
            }
            this.listMinions.forEach((minion) => {
                //this.map.getCellule(((minion.posx + RADIUSCELLULE / 2) / RADIUSCELLULE) | 0, ((minion.posy + RADIUSCELLULE / 2) / RADIUSCELLULE) | 0).color = new BABYLON.Color4(0, 0, 1, 1);
                //this.map.getCellule(((minion.posx + RADIUSCELLULE / 2) / RADIUSCELLULE) | 0, ((minion.posy + RADIUSCELLULE / 2) / RADIUSCELLULE) | 0).createCellule(this.map.mainScene, this.map.mainCamera);
                minion.move(this.map.getCellule(((minion.posz + RADIUSCELLULE / 2) / RADIUSCELLULE) | 0, ((minion.posx + RADIUSCELLULE / 2) / RADIUSCELLULE) | 0));
            });
        }

        if(this.listTowers.length > 0){
            this.listTowers.forEach(tower => {
                tower.aim(null, this.listMinions);
            });
        }
    }

    resize() {
        this.map.resize();
    }
}
