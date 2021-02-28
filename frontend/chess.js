document.addEventListener("DOMContentLoaded", () => {
    createUser()
    fetchUsers()
})

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

const BASE_URL = "http://127.0.0.1:3000"

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
        })
}

function deleteUser() {

    let userId = parseInt(event.target.dataset.id)

    fetch(`${BASE_URL}/users/${userId}`, {
        method: 'DELETE'
    })

    this.location.reload()
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
            newGameDiv.innerHTML += `White player: ${wp.first_name} ${wp.last_name} <br/> Black player: ${bp.first_name} ${bp.last_name}`
        }
    }
}