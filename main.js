// game name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector(".header").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} game created by Beloued Bouabdellah`;
let myinputs = document.querySelector(".game-area .inputs");
let numberOfTries = 6;
let numberOfLetters = 6;
let words = ["DOCKER","DJANGO","WELCOM","SCHOOL","CREATE","UBDATE","DELETE","MASTER","BRANCH"];
let wordToGuess = words[Math.floor(Math.random() * words.length)];
let currentTry = 1;
// begin load number of tries
function generateInput(){
for (let i = 1; i <= numberOfTries; i++){
    let box = document.createElement("div");
    box.className = "box";
    let tryText = document.createElement("label");
    tryText.innerHTML = `Try ${i}`;
    tryText.setAttribute("for",`try-${i}-letter-1`);
    let inputs = document.createElement("div");
    inputs.className = `try-${i}`;
    for (let j = 1; j <= numberOfLetters; j++){
        let myinput = document.createElement("input");
        myinput.maxLength = 1;
        myinput.id = `try-${i}-letter-${j}`;
        inputs.appendChild(myinput);
    }
    box.appendChild(tryText);
    box.appendChild(inputs);
    myinputs.appendChild(box);
    if (i === 1){
        box.classList.add("active");
        document.querySelector(".active #try-1-letter-1").focus();
    }
}
}
// end load number of tries
// begin move the cursor to the next input
function move(){
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
        const nextInput = inputs[index + 1];
        const previousInput = inputs[index - 1];
        input.addEventListener("input",function (e){
        if (nextInput && input.parentElement === nextInput.parentElement && e.target.value !== "")
            nextInput.focus();
        });
        input.addEventListener('keydown', function(e){
            if (e.key === 'Backspace'){
                if (e.target.value === "" && previousInput && e.target.parentElement === previousInput.parentElement){
                e.preventDefault();
                previousInput.focus();
                }
            }
            else
            if (e.key === 'Enter' || e.key === "ArrowRight"){
                e.preventDefault();
                if (nextInput && input.parentElement === nextInput.parentElement)
                    nextInput.focus();
            }
            else
            if (e.key === "ArrowLeft" && previousInput && e.target.parentElement === previousInput.parentElement){
                    previousInput.focus();
            }
        });
    })};
// end move

//  check the word
let numberOfHints = 2;
let hintButton = document.querySelector(".hint");
let message = document.querySelector(".message");
let checkButton = document.querySelector(".check");
function createMessage(success){
    message.innerHTML = "";
    // disactive the current try
    document.querySelector(`.try-${currentTry}`).parentElement.classList.remove("active");
    if (success){
        message.innerHTML = "congratulation you success in the game";
        document.documentElement.style.setProperty('--message-color', '#18ba89');
        checkButton.disabled = true;
        hintButton.disabled = true;
    }
    else{
        if (currentTry < numberOfTries){
        message.innerHTML = "your answer is wrong , repeat the try";
        let nextElement = document.querySelector(`.try-${currentTry+1}`);
        nextElement.parentElement.classList.add("active");
        // focus on the next element
        document.querySelector(`#try-${currentTry+1}-letter-1`).focus();
        }
        else{
        message.innerHTML = `you lose the game , the word is ${wordToGuess}`;
        checkButton.disabled = true;
        hintButton.disabled = true;
        }
        document.documentElement.style.setProperty('--message-color', '#f89e13');
    }
    message.style.display = "block"; 
}
function checkWord(){
        checkButton.addEventListener("click",() => {
        let success = true;
        for (let i = 1; i <= numberOfLetters; i++){
            const input = document.getElementById(`try-${currentTry}-letter-${i}`);
            if (input.value !== ""){
            if (input.value.toUpperCase() === wordToGuess[i-1])
                input.className = "in-place";
            else{
                success = false;    
                if (wordToGuess.indexOf(input.value.toUpperCase()) !== -1)
                    input.className = "not-in-place";
                else
                input.className = "no";
            }
        }
        else
        success = false;
        }
            createMessage(success);
            if (! success && currentTry < numberOfTries)
            currentTry++;
})};
// end check word

// manage hints
document.querySelector(".hint span").innerHTML = numberOfHints;

function search(array){
    let i = 0;
    for (; i < array.length; i++)
        if (array[i].value === "")
            break;
    if (i < array.length)
        return i;
    else
        return -1;
}
function manageHints(){
    hintButton.addEventListener("click",() => {
        if (numberOfHints > 0){
        let inputs = document.querySelectorAll(`.try-${currentTry} input`);
        // search for the first index empty input 
        let hintindex = search(inputs);
        // if all the inputs are not empty
        if (hintindex === -1){
        do{
        hintindex = Math.floor(Math.random() * numberOfLetters);
        } while (inputs[hintindex].classList.contains("in-place"));
        }
        let hintInput = inputs[hintindex];
        hintInput.value = wordToGuess[hintindex];
        hintInput.classList.add("in-place");
        hintInput.style.cssText = "pointer-events: none;";
        numberOfHints--;
        }
        if (numberOfHints === 0)
        hintButton.disabled = true;
        document.querySelector(".hint span").innerHTML = numberOfHints;
    });
}
// end manage hints
window.onload = function(){
    generateInput();
    move();
    console.log(wordToGuess);
};
document.addEventListener('DOMContentLoaded', function(){
    checkWord();
    manageHints();
});