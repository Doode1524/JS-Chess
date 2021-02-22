document.addEventListener("DOMContentLoaded", () => {

})
let currentPiece;
let phase = 0 // zero is selected, 1 is moving

let wk = document.getElementById('b1')
let a3 = document.getElementById('a3')

wk.addEventListener("click", function(e) {
    wk.style.color = 'green'
    a3.addEventListener('click', function(e) {

            a3.innerText = b1.innerText
            a3.style.color = 'red'
            b1.innerText = ""
        })
        // e.dataTransfer.setData("Text", e.target.id)
        // wk.innerText = ""
});

//// LOOK INTO BUBBLING ///// 

let board = document.getElementById('chessboard')
board.addEventListener('click', handleClick)

function handleClick(e) {
    console.log(e.target, "was clicked!")
    let selectedDiv = e.target
    toggleSelected(selectedDiv)
    console.log(phase)

}


function toggleSelected(selectedDiv) {
    if (selectedDiv == currentPiece) {
        selectedDiv.style.color = "black"
        currentPiece = null
        phase = 0
    } else {
        currentPiece = selectedDiv
        selectedDiv.style.color = "blue"
        phase = 1
    }
}

function move(currentPiece) {
    if (phase == 1) {
        selectedDiv.innerText = currentPiece.innerText
    }
}
// if there is current piece
// delete piece in move phase
// if not in moving phase
// there is no currentPiece


// make another click event
// attach it to nodes
// move function