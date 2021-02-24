document.addEventListener("DOMContentLoaded", () => {

})

let currentPiece;
let copy;
let phase = 0 // zero is selected, 1 is moving

//// LOOK INTO BUBBLING ///// 

let board = document.getElementById('chessboard')
const gameBoard = board.innerHTML

board.addEventListener('click', handleClick)

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