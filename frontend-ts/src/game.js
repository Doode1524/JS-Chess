"use strict";
var Game = /** @class */ (function () {
    function Game(id, name, winner, white_player, black_player) {
        this.id = id;
        this.name = name;
        this.winner = winner;
        this.white_player = white_player;
        this.black_player = black_player;
        Game.all.push(this);
    }
    Game.prototype.renderGame = function () {
        var gamesDiv = document.getElementById("recent-games");
        gamesDiv.innerHTML += "\n              <li><strong>" + this.name + "</strong> Winner: <strong>" + this.winner + "</strong> </li><br/>\n              ";
    };
    Game.all = [];
    Game.recentGames = function () {
        fetch(BASE_URL + "/recent")
            .then(function (resp) { return resp.json(); })
            .then(function (games) {
            for (var _i = 0, games_1 = games; _i < games_1.length; _i++) {
                var game = games_1[_i];
                var g = new Game(game.id, game.name, game.winner, game.white_player, game.black_player); /// add players breaks?
                g.renderGame();
            }
        });
    };
    Game.startGame = function () {
        wp = null;
        bp = null;
        var gamesDiv = document.getElementById("recent-games");
        gamesDiv.innerHTML = "";
        Game.recentGames();
        console.log("start button clicked!");
        newGameDiv.innerText = "Please Select White Player";
        var wpArray = document.querySelectorAll("#select-btn");
        wpArray.forEach(function (w) { return w.addEventListener("click", selectUser); });
    };
    return Game;
}());
