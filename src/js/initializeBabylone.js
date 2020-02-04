
window.onload = init;
window.onresize = resize;

var canvas, game;
function init () {
    canvas = document.querySelector ("#canvasBabylon");

    game = new GameTest ();

    resize ();
}

function resize () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    game.resize ();
}
