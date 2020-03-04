var WIDTHMENU = 300;
class Information {

    constructor () {
        destroyInformations ();

        this.main = document.createElement("div");
        this.main.id = "divInformation";
        this.main.style.position = "absolute";
        this.main.style.top = "0px";
        this.main.style.height = window.innerHeight + "px";
        this.main.style.width = WIDTHMENU + "px";
        this.main.style.right = 0 + "px";

        this.main.style.backgroundColor = "rgba(130, 130, 130, 0.8)";

        this.domTitle = document.createElement ("div");
        this.domTitle.style.textAlign = "center";

        this.domCoord = document.createElement ("table");
        this.domCoord.style.margin = "auto auto";
        let tr = document.createElement ("tr");
        let tdx = document.createElement ("td");
        let tdy = document.createElement ("td");
        let tdz = document.createElement ("td");
        this.domCoordX = document.createElement ("td");
        this.domCoordY = document.createElement ("td");
        this.domCoordZ = document.createElement ("td");
        tdx.innerHTML = "X :";
        tdy.innerHTML = "Y :";
        tdz.innerHTML = "Z :";
        tr.appendChild (tdx);
        tr.appendChild (this.domCoordX);
        tr.appendChild (tdy);
        tr.appendChild (this.domCoordY);
        tr.appendChild (tdz);
        tr.appendChild (this.domCoordZ);
        this.domCoord.appendChild (tr);


        this.addElementDom (this.domTitle);
        this.addElementDom (this.domCoord);
        document.body.appendChild (this.main);
    }

    setTitle (title) {
        this.domTitle.innerHTML = "<h2>" + title + "</h2>";
    }

    setCoords (x, y, z) {
        this.domCoordX.innerHTML = x;
        this.domCoordY.innerHTML = y;
        this.domCoordZ.innerHTML = z;
    }

    addButton (name, nameButton, toDo) {
        let table = document.createElement ("table");
        let tr = document.createElement ("tr");
        let tdlabel = document.createElement ("td");
        let tdButton = document.createElement ("td");
        let label = document.createElement ("label");
        let button = document.createElement ("button");

        label.innerHTML = name;
        button.innerText = nameButton;
        button.onclick = function () { toDo (); }

        tdlabel.appendChild (label);
        tdButton.appendChild (button);
        tr.appendChild (tdlabel);
        tr.appendChild (tdButton);
        table.appendChild (tr);
        this.addElementDom (table);
    }

    addTableTurret (cellule, listClassTurrets) {
        let lengthListTurrets = ((listClassTurrets.length + 1) / 2) | 0;
        let tableTurrets = document.createElement ("table");
        for (let i=0; i < lengthListTurrets; i++) {
            let tr = document.createElement ("tr");

            for (let j=0; j<2; j++) {
                if (i * 2 + j < listClassTurrets.length) {
                    let tempTurret = new listClassTurrets[i * 2 + j] (0, 0);
                    let td = document.createElement ("td");
                    let can = document.createElement ("button");

                    can.onclick = () => {
                        console.log(cellule);
                        cellule.placeClassTurret (listClassTurrets[i * 2 + j]);
                        //cellule.showInformations ();
                    }
/*
                    can.width = SIDEWIDTHCELLULE;
                    can.height = SIDEWIDTHCELLULE;
                    can.style.border = "solid thin black";
                    can.style.backgroundColor = "ivory";
                    can.title = tempTurret.name;*/
                    can.innerHTML = tempTurret.name;

                    /*let ctxcan = can.getContext ("2d");
                    ctxcan.save ();
                    ctxcan.translate (SIDEWIDTHCELLULE / 2, SIDEWIDTHCELLULE / 2);
                    tempTurret.drawTurret (ctxcan);
                    ctxcan.restore ();*/

                    td.appendChild (can);
                    tr.appendChild (td);
                }
            }

            tableTurrets.appendChild (tr);
        }

        this.addElementDom (tableTurrets);
    }

    addTurretInformations (turret) {
        // to do...
    }

    addElementDom (dom) {
        this.main.appendChild (dom);
    }
}

function destroyInformations () {
    try { document.querySelector ("#divInformation").remove (); }
    catch (e) { }
}
