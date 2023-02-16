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
const moveSnake = () =>{
  switch(snakeCurrentDirection) {
    case LEFT_DIR:
      --currentHeadPosition
      const isHeadAtLeft = currentHeadPosition % LINE_PIXEL_COUNT == LINE_PIXEL_COUNT - 1 || currentHeadPosition < 0
      if(isHeadAtLeft){
        currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT
      }
      break;

    case RIGHT_DIR:
      ++currentHeadPosition
      const isHeadAtRight = currentHeadPosition % LINE_PIXEL_COUNT == 0
      if(isHeadAtRight){
        currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT
      }
      break;

    case UP_DIR:
      currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT
      const isHeadAtTop = currentHeadPosition < 0
      if(isHeadAtTop){
        currentHeadPosition = currentHeadPosition + TOTAL_PIXEL_COUNT
      }
      break;

    case DOWN_DIR:
      currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT
      const isHeadAtBottom = currentHeadPosition > TOTAL_PIXEL_COUNT -1
      if(isHeadAtBottom) {
        currentHeadPosition = currentHeadPosition - TOTAL_PIXEL_COUNT
      }
    break;
    default:
    break;
  }

  //accessed the correct pixel w/n the HTML collection
  let nextSnakeHeadPixel = gameBoardPixels[currentHeadPosition]

  //check if snake head is about to interact w/ body
  if(nextSnakeHeadPixel.classList.contains("snakeBodyPixel")){
    clearInterval(moveSnakeInterval)
    alert(`You have eaten ${totalFoodEaten} food and traveled ${totalDistanceTraveled} blocks.`)

    //reset the board
    window.location.reload()
  }

  //assuming an empty pixel, add snake bodystyling
  nextSnakeHeadPixel.classList.add("snakeBodyPixel")

  //Remove snake styling to keep snake appropriate length
setTimeout(() => {
  nextSnakeHeadPixel.classList.remove("snakeBodyPixel")
}, snakeLength)

  //This descrbes what to do when the snakee eats a food pixel
  if(currentHeadPosition == currentFoodPosition){
    totalFoodEaten++
    document.getElementById("pointsEarned").innerText = totalFoodEaten

    snakeLength = snakeLength + 100
    createFood()
  }

}

createGameBoardPixels();

createFood();

