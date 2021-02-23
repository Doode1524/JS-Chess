document.addEventListener("DOMContentLoaded", () => {

})

let currentPiece;
let copy;
let phase = 0 // zero is selected, 1 is moving

//// LOOK INTO BUBBLING ///// 

let board = document.getElementById('chessboard')

board.addEventListener('click', handleClick)

function handleClick(e) {
    console.log(e.target, "was clicked!")
    let selectedDiv = e.target
    if (phase == 0 || selectedDiv == currentPiece) {
        toggleSelected(selectedDiv)
        console.log(phase)
    } else {
        selectedDiv.innerText = copy
        currentPiece.innerText = ""
        phase = 0
        console.log(phase)
    } // check else if
}

function toggleSelected(selectedDiv) {
    if (selectedDiv == currentPiece) {
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