document.addEventListener("DOMContentLoaded", () => {
    createUser()
    fetchUsers()
})

const BASE_URL = "http://127.0.0.1:3000"
let currentPiece;
let copy;
let wp;
let bp;
let player = 0 //zero is white 1 is black
let phase = 0 // zero is selected, 1 is moving
let start = document.getElementById('start-btn')
let newGameDiv = document.getElementById('new-game')
let board = document.getElementById('chessboard')
const gameBoard = board.innerHTML
const blackPlayer = new User()
const whitePlayer = new User()
let currentGame;


//// LOOK INTO BUBBLING ///// 

board.addEventListener('click', handleClick)
start.addEventListener('click', startGame)

function handleClick(e) {
    let selectedDiv = e.target
    console.log(e.target, "was clicked!")

    if (phase == 0 || selectedDiv == currentPiece) {
        toggleSelected(selectedDiv)
        console.log(phase)
    } else {
        selectedDiv.innerText = copy
        selectedDiv.style.color = 'black'
        currentPiece.innerText = ""
        phase = 0
        console.log(phase)
    } // check else if
}

function toggleSelected(selectedDiv) {
    if (selectedDiv == currentPiece || selectedDiv.innerText == "") {
        selectedDiv.style.color = "black"
        currentPiece = null
        phase = 0
    } else {
        currentPiece = selectedDiv
        copy = currentPiece.innerText
        selectedDiv.style.color = "blue"
        phase = 1
    }
}

let pieces = []
class Piece {
    constructor(name, unicode) {
        this.name = name
        this.unicode = unicode
        pieces.push(this)
    }
}

function resetBoard() {
    board.innerHTML = gameBoard
}

function fetchUsers() {
    fetch(`${BASE_URL}/users`)
        .then(resp => resp.json())
        .then(users => {
            for (const user of users) {
                let u = new User(user.id, user.first_name, user.last_name)
                u.renderUser()
            }
        })
}

function createUser() {
    let newUserForm = document.getElementById('create_user')

    newUserForm.innerHTML +=
        `
    <form>
    First Name: <input type="text" id= "first_name"><br>
    Last Name: <input type="text" id= "last_name"><br>
    <input type="submit" value="Create User">
    </form>
    `
    newUserForm.addEventListener("submit", userSubmit)
}

function userSubmit() {
    event.preventDefault()
    let first_name = document.getElementById("first_name").value
    let last_name = document.getElementById("last_name").value

    let user = {
        first_name: first_name,
        last_name: last_name
    }

    fetch(`${BASE_URL}/users`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(user)
        })
        .then(resp => resp.json())
        .then(user => {
            let u = new User(user.id, user.first_name, user.last_name)
            u.renderUser()
            let first_name = document.getElementById("first_name").value = ""
            let last_name = document.getElementById("last_name").value = ""
        })
}

function deleteUser() {

    let userId = parseInt(event.target.dataset.id)
    let allUsers = document.getElementById("all_users")

    fetch(`${BASE_URL}/users/${userId}`, {
            method: 'DELETE'
        })
        .then(function(resp) {
            allUsers.innerText = ""
            fetchUsers()
        })
        // this.location.reload()
}
/////////////////////////////////
function startGame() {
    console.log("start button clicked!")
    newGameDiv.innerText = "Please Select White Player"
    let wpArray = document.querySelectorAll('#select-btn')
    wpArray.forEach((w) => w.addEventListener('click', selectUser))
}

function selectUser(e) {
    e.preventDefault()
    console.log(e)

    if (wp) {
        let id = e.target.dataset.id
        fetch(BASE_URL + /users/ + id, {

            })
            .then(function(resp) {
                return resp.json();
            })
            .then(function(resp) {
                console.log(resp)
                blackPlayer.resp = resp
                blackPlayer.color = "Black"
                blackPlayer.first_name = resp.first_name
                blackPlayer.last_name = resp.last_name
                blackPlayer.id = resp.id
            })
            .then(() => {
                bp = blackPlayer
            })
            .then(() => {
                vsText()
            })

    } else {
        wp = whitePlayer
        let id = e.target.dataset.id
        fetch(BASE_URL + /users/ + id, {

            })
            .then(function(resp) {
                return resp.json();
            })
            .then(function(resp) {
                console.log(resp)
                whitePlayer.resp = resp
                whitePlayer.color = "White"
                whitePlayer.first_name = resp.first_name
                whitePlayer.last_name = resp.last_name
                whitePlayer.id = resp.id
            })
        newGameDiv.innerText = "Please Select Black Player"
    }

    function vsText() {

        if (wp && bp) {
            newGameDiv.innerText = ""
            newGameDiv.innerHTML += `
            White player: ${wp.first_name} ${wp.last_name} <br/> 
            Black player: ${bp.first_name} ${bp.last_name} <br/> 
            <form>
            Game Name: <input type="text" id= "game_name"><br>
            <input type="submit" value="Create New Game">
            </form>`

            newGameDiv.addEventListener("submit", newGameSubmit)
                // resetBoard() // DONT FORGET TO ADD THIS 
        }
    }

    function newGameSubmit() {
        event.preventDefault()
        let name = document.getElementById('game_name').value

        let game = {
            name: name,
            white_player_id: whitePlayer.id,
            black_player_id: blackPlayer.id
        }

        fetch(`${BASE_URL}/games`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(game)
            })
            .then(resp => resp.json())
            .then(game => {
                let g = new Game(game.id, game.winner, game.name, game.white_player, game.black_player)
                currentGame = g
            })
        newGameDiv.innerText = ""
        newGameDiv.innerHTML += `
        White player: ${wp.first_name} ${wp.last_name} &nbsp <button id="white-check-btn" data-id=${whitePlayer.id}>Check</button><button id="white-checkmate-btn" data-id=${whitePlayer.id}>Checkmate</button><br/> 
        Black player: ${bp.first_name} ${bp.last_name} &nbsp <button id="black-check-btn" data-id=${blackPlayer.id}>Check</button><button id="black-checkmate-btn" data-id=${blackPlayer.id}>Checkmate</button><br/> 
        ${game.name} has started!`
        resetBoard()
        let checkWhite = document.getElementById('white-check-btn')
        let checkmateWhite = document.getElementById('white-checkmate-btn')
        checkWhite.addEventListener('click', handleCheck)
        checkmateWhite.addEventListener('click', handleCheckmate)
        let checkBlack = document.getElementById('black-check-btn')
        let checkmateBlack = document.getElementById('black-checkmate-btn')
        checkBlack.addEventListener('click', handleCheck)
        checkmateBlack.addEventListener('click', handleCheckmate)
    }

    h2t = document.createElement('h2')

    function handleCheck(e) {
        e.preventDefault()
        console.log(e.target)
        if (h2t) {
            h2t.innerText = ""
        }
        let id = e.target.dataset.id
        fetch(BASE_URL + /users/ + id, {

            })
            .then(function(resp) {
                return resp.json();
            })
            .then(function(resp) {
                console.log(resp)
                h2t.innerText = `${resp.first_name} ${resp.last_name} is in check!`
                newGameDiv.append(h2t)
            })
    }

    function handleCheckmate(e) {
        e.preventDefault()
        console.log(e.target)
        if (h2t) {
            h2t.innerText = ""
        }
        let id = e.target.dataset.id

        fetch(BASE_URL + /users/ + id, {

            })
            .then(function(resp) {
                return resp.json();
            })
            .then(function(resp) {
                console.log(resp)
                if (id == whitePlayer.id) {
                    h2t.innerText = `${blackPlayer.first_name} ${blackPlayer.last_name} is the WINNER!`
                    newGameDiv.append(h2t)
                    currentGame.winner = currentGame.black_player.first_name + " " + currentGame.black_player.last_name
                } else {
                    h2t.innerText = `${whitePlayer.first_name} ${whitePlayer.last_name} is the WINNER!`
                    newGameDiv.append(h2t)
                    currentGame.winner = currentGame.white_player.first_name + " " + currentGame.white_player.last_name
                }
                let cgid = currentGame.id
                let game = {
                    winner: currentGame.winner
                }

                fetch(BASE_URL + "/games/" + cgid, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(game)
                })

                .then(resp => resp.json())
                    .then(game => {
                        return game.winner = currentGame.winner
                    })

            })

    }
}