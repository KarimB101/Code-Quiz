//getting javascript code of highscore to log into browser
var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
var ul = document.querySelector("#highscores") 

console.log(highscores)

function printHighscores() {

    
    console.log(highscores.length)

    for (var i = 0; i < highscores.length; i++) {
        console.log(highscores[i])

        //create <li></li>
        var li = document.createElement("li")

        //add html with initails and scores to li tag
        li.innerHTML = `
    ${highscores[i].initials} - ${highscores[i].score} 
    `

        //append li tag to ul to add each highscore
        ul.appendChild(li)
    }
  
}
// clear the list of highscores when clicking the clear button
function clearHighscores() {
    window.localStorage.removeItem('highscores')
    window.location.reload();
}
document.getElementById('clear').onclick = clearHighscores

console.log(clearHighscores)

printHighscores()
//loop to retrieve and store highscores

