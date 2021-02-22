document.addEventListener("DOMContentLoaded", () => {

})
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
    selectedDiv.style.color = "blue"
}