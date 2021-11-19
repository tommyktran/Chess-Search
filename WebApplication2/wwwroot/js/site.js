// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//function getGame(play = "", ratings = '1600,1800,2000,2200,2500', speeds = 'blitz,rapid,classical') {
//    fetch(`https://explorer.lichess.ovh/lichess?variant=standard&speeds=${speeds}&play=${play}&ratings=${ratings}`)
//        .then(response => response.json())
//        .then((data) => {
//            console.log(data);
//            return data;
//        });
//};

//getGame();

var board1 = Chessboard('board1', 'start')
let results;
const chess = new Chess()

function getGame(play = "", ratings = '1600,1800,2000,2200,2500', speeds = 'blitz,rapid,classical') {
    fetch(`https://explorer.lichess.ovh/lichess?variant=standard&speeds=${speeds}&play=${play}&ratings=${ratings}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            //return data;
            results = data;
            document.getElementById('results').value = JSON.stringify(data);
            document.getElementById('opening').innerText = results.opening.name;
            chess.reset()
            for (let move of document.getElementById("moves").value.split(",")) {
                chess.move(move, { sloppy: true });
                console.log(move);

            }
            board1.position(chess.fen());
        })
        .catch((error) => {
            document.getElementById('results').value = 'Error ' + error.toString() + '\n\n Check if your input was correct.';
            chess.reset();
            board1.position(chess.fen());
            document.getElementById('opening').innerText = '(None)';

        });
    };