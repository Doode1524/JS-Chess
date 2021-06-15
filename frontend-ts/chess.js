"use strict";
document.addEventListener("DOMContentLoaded", function () {
    User.createUser();
    User.fetchUsers();
    Game.recentGames();
    board.addEventListener("click", handleClick);
    start.addEventListener("click", Game.startGame);
});
var BASE_URL = "http://127.0.0.1:3000";
var currentPiece;
var copy;
var wp;
var bp;
var player = 0; //zero is white 1 is black
var phase = 0; // zero is selected, 1 is moving
var start = document.getElementById("start-btn");
var newGameDiv = document.getElementById("new-game");
var board = document.getElementById("chessboard");
var gameBoard = board.innerHTML;
var blackPlayer = new User();
var whitePlayer = new User();
var currentGame;
var handleClick = function (e) {
    var selectedDiv = e.target;
    console.log(e.target, "was clicked!");
    if (phase == 0 || selectedDiv == currentPiece) {
        toggleSelected(selectedDiv);
        console.log(phase);
    }
    else {
        selectedDiv.innerText = copy;
        selectedDiv.style.color = "black";
        currentPiece.innerText = "";
        phase = 0;
        console.log(phase);
    }
};
var toggleSelected = function (selectedDiv) {
    if (selectedDiv == currentPiece || selectedDiv.innerText == "") {
        selectedDiv.style.color = "black";
        currentPiece = null;
        phase = 0;
    }
    else {
        currentPiece = selectedDiv;
        copy = currentPiece.innerText;
        selectedDiv.style.color = "blue";
        phase = 1;
    }
};
var resetBoard = function () {
    // value of null at 228??
    board.innerHTML = gameBoard;
};
var selectUser = function (e) {
    e.preventDefault();
    console.log(e);
    if (wp) {
        var id = e.target.dataset.id;
        fetch(BASE_URL + /users/ + id, {})
            .then(function (resp) {
            return resp.json();
        })
            .then(function (resp) {
            console.log("hi", resp);
            blackPlayer.resp = resp;
            blackPlayer.color = "Black";
            blackPlayer.first_name = resp.first_name;
            blackPlayer.last_name = resp.last_name;
            blackPlayer.id = resp.id;
        })
            .then(function () {
            bp = blackPlayer;
        })
            .then(function () {
            vsText();
        });
    }
    else {
        wp = whitePlayer;
        var id = e.target.dataset.id;
        fetch(BASE_URL + /users/ + id, {})
            .then(function (resp) {
            return resp.json();
        })
            .then(function (resp) {
            console.log(resp);
            whitePlayer.resp = resp;
            whitePlayer.color = "White";
            whitePlayer.first_name = resp.first_name;
            whitePlayer.last_name = resp.last_name;
            whitePlayer.id = resp.id;
        });
        newGameDiv.innerText = "Please Select Black Player";
    }
    var vsText = function () {
        if (wp && bp) {
            newGameDiv.innerHTML = "\n  \n                  White player: " + wp.first_name + " " + wp.last_name + " <br/> \n                  Black player: " + bp.first_name + " " + bp.last_name + " <br/>\n  \n                  <form>\n                  Game Name: <input type=\"text\" id= \"game_name\"><br>\n                  <input type=\"submit\" value=\"Create New Game\">\n                  </form>";
            newGameDiv.addEventListener("submit", newGameSubmit);
        }
    };
    var newGameSubmit = function () {
        event.preventDefault();
        var name = document.getElementById("game_name").value;
        var game = {
            name: name,
            white_player_id: whitePlayer.id,
            black_player_id: blackPlayer.id,
        };
        fetch(BASE_URL + "/games", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(game),
        })
            .then(function (resp) { return resp.json(); })
            .then(function (game) {
            var g = new Game(game.id, game.winner, game.name, game.white_player, game.black_player);
            currentGame = g;
        });
        newGameDiv.removeEventListener("submit", newGameSubmit);
        newGameDiv.innerText = "";
        newGameDiv.innerHTML += "\n  \n          White player: " + wp.first_name + " " + wp.last_name + " <br/> <button id=\"white-check-btn\" data-id=" + whitePlayer.id + ">Check</button><button id=\"white-checkmate-btn\" data-id=" + whitePlayer.id + ">Checkmate</button><br/><br/> \n          Black player: " + bp.first_name + " " + bp.last_name + " <br/> <button id=\"black-check-btn\" data-id=" + blackPlayer.id + ">Check</button><button id=\"black-checkmate-btn\" data-id=" + blackPlayer.id + ">Checkmate</button><br/> \n          <h3>" + game.name + " has started!<h3>";
        resetBoard();
        var checkWhite = document.getElementById("white-check-btn");
        var checkmateWhite = document.getElementById("white-checkmate-btn");
        var checkBlack = document.getElementById("black-check-btn");
        var checkmateBlack = document.getElementById("black-checkmate-btn");
        checkWhite.addEventListener("click", handleCheck);
        checkmateWhite.addEventListener("click", handleCheckmate);
        checkBlack.addEventListener("click", handleCheck);
        checkmateBlack.addEventListener("click", handleCheckmate);
    };
    h2t = document.createElement("h2");
    var handleCheck = function (e) {
        e.preventDefault();
        console.log(e.target);
        if (h2t) {
            h2t.innerText = "";
        }
        var id = e.target.dataset.id;
        fetch(BASE_URL + /users/ + id, {})
            .then(function (resp) {
            return resp.json();
        })
            .then(function (resp) {
            console.log(resp);
            h2t.innerText = resp.first_name + " " + resp.last_name + " is in check!";
            newGameDiv.append(h2t);
        });
    };
    var handleCheckmate = function (e) {
        e.preventDefault();
        console.log(e.target);
        if (h2t) {
            h2t.innerText = "";
        }
        var id = e.target.dataset.id;
        fetch(BASE_URL + /users/ + id, {})
            .then(function (resp) {
            return resp.json();
        })
            .then(function (resp) {
            console.log(resp);
            if (id == whitePlayer.id) {
                h2t.innerText = blackPlayer.first_name + " " + blackPlayer.last_name + " is the WINNER!";
                newGameDiv.append(h2t);
                currentGame.winner =
                    currentGame.black_player.first_name +
                        " " +
                        currentGame.black_player.last_name;
            }
            else {
                h2t.innerText = whitePlayer.first_name + " " + whitePlayer.last_name + " is the WINNER!";
                newGameDiv.append(h2t);
                currentGame.winner =
                    currentGame.white_player.first_name +
                        " " +
                        currentGame.white_player.last_name;
            }
            var cgid = currentGame.id;
            var game = {
                winner: currentGame.winner,
            };
            fetch(BASE_URL + "/games/" + cgid, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(game),
            })
                .then(function (resp) { return resp.json(); })
                .then(function (game) {
                return (game.winner = currentGame.winner);
            });
        });
    };
};
