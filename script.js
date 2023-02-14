const LINE_PIXEL_COUNT = 40 //this is to make the count both horizontally and vertically
const TOTAL_PIXEL_COUNT = LINE_PIXEL_COUNT**2 //this squares it and makes it a square

//track scores to display to user
let totalFoodEaten = 0;
let totalDistanceTraveled = 0;

const gameContainer = document.getElementById("gameContainer");

//this is to fill a space using JS/ create game board
const createGameBoardPixels = () => {
for(let i = 1; i <= TOTAL_PIXEL_COUNT; i++){
  gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id="pixel${i}"></div>"`
  } //innerHtml is more vunerable than innerText but innerHTML gives you more space
}

//Shorten references to game pixels
const gameBoardPixels = document.getElementsByClassName("gameBoardPixel")

let currentFoodPosition = 0;
//goal is to remove food from the board when the snake eats it and apply it elsewhere
const createFood = () =>{
gameBoardPixels[currentFoodPosition].classList.remove('food')
//generate food randomly on the board
currentFoodPosition = Math.floor(Math.random()*TOTAL_PIXEL_COUNT)
gameBoardPixels[currentFoodPosition].classList.add('food')
}

//Setup of snake behavior

const LEFT_DIR = 37
const UP_DIR = 38
const RIGHT_DIR = 39
const DOWN_DIR = 40

let snakeCurrentDirection = RIGHT_DIR

//makes sure that the user input works and snake changes direction; can make this in OOP
const changeDirection = newDirectionCode => {
  if(newDirectionCode == snakeCurrentDirection) return;
  
  if(newDirectionCode == LEFT_DIR && snakeCurrentDirection !== RIGHT_DIR){
    snakeCurrentDirection = newDirectionCode
  }else if(newDirectionCode == UP_DIR && snakeCurrentDirection !== DOWN_DIR){
    snakeCurrentDirection = newDirectionCode
  }else if(newDirectionCode == RIGHT_DIR && snakeCurrentDirection !== LEFT_DIR){
    snakeCurrentDirection = newDirectionCode
  }else if(newDirectionCode == DOWN_DIR && snakeCurrentDirection !== UP_DIR){
    snakeCurrentDirection = newDirectionCode
  }
}

//set starting point for snake on load
let currentHeadPosition = TOTAL_PIXEL_COUNT/2;

//set initial length
let snakeLength = 200;

//Start moving snake

