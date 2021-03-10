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

    static recentGames = () => {
        fetch(`${BASE_URL}/recent`)
            .then(resp => resp.json())
            .then(games => {
                for (const game of games) {
                    let g = new Game(game.id, game.name, game.winner)
                    g.renderGame()
                }
            })
    }

    static startGame = () => {
        wp = null
        bp = null

        let gamesDiv = document.getElementById("recent-games")

        gamesDiv.innerHTML = ""

        Game.recentGames()

        console.log("start button clicked!")

        newGameDiv.innerText = "Please Select White Player"

        let wpArray = document.querySelectorAll('#select-btn')
        wpArray.forEach((w) => w.addEventListener('click', selectUser))
    }
}