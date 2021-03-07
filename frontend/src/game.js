class Game {

    static all = [];

    constructor(id, name, winner, white_player, black_player) {
        this.id = id
        this.name = name
        this.winner = winner
        this.white_player = white_player
        this.black_player = black_player

        Game.all.push(this)

    }

    renderGame() {

        let gamesDiv = document.getElementById("recent-games")
        gamesDiv.innerHTML +=
            `
        
        <li><strong>${this.name}</strong> Winner: <strong>${this.winner}</strong> </li><br/>
        
        
        `
    }


}