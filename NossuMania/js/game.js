// Define game variables
let health = 100;
let score = 0;
let combo = 0;
let maxCombo = 0;
let isStarted = false;

// Initialize the game
function initGame() {
  // Code to initialize the game
}

// Update game state
function update() {
  // Code to update game state
}

// Handle user input
// Function to handle user input
function handleInput(event) {
  let arrowCleared = false; // Declare and initialize arrowCleared variable

  if (!isStarted) {
    return;
  }


  // Check which arrow key was pressed
  switch (event.key) {
    case 'ArrowUp':
      // Code to handle up arrow key press
      arrowCleared = clearArrow('top');
      break;
    case 'ArrowDown':
      // Code to handle down arrow key press
      arrowCleared = clearArrow('bottom');
      break;
    case 'ArrowLeft':
      // Code to handle left arrow key press
      arrowCleared = clearArrow('left');
      break;
    case 'ArrowRight':
      // Code to handle right arrow key press
      arrowCleared = clearArrow('right');
      break;
    default:
      // Ignore other key presses
      return;
  }

  // If the arrow was not cleared successfully, decrement health
  if (!arrowCleared) {
    decreaseHealth();
  }
}

function stopGame() {
  pauseSong();
  isStarted = false;
  console.log('levaste no cu como gente grande');
}




function decreaseHealth() {
  let healthBar = document.getElementsByClassName('life-progress');
  // Decrease health (adjust as needed)
  health -= 10;
  healthBar[0].style.width = health / 2 + '%';
  combo = 0; // Decrease health by 10 for example
  // Update health display
  renderCombo();
  healthCheck();
}

function healthCheck() {
  if (health <= 0) {
    stopGame();
    health = 0;
    isStarted = false;
  }
}

function clearArrow(direction) {
  const arrowContainer = document.getElementById(direction);
  const arrows = arrowContainer.getElementsByClassName(`arrow-${direction}`);

  // Get the static arrow element
  const staticArrow = document.getElementById(`static-${direction}`);

  // Loop through all arrows in the container
  for (let arrow of arrows) {
    // Calculate the distance between the dynamic arrow and the static arrow div
    const arrowRect = arrow.getBoundingClientRect();
    const staticArrowRect = staticArrow.getBoundingClientRect();
    const distance = Math.sqrt(
      Math.pow(arrowRect.x - staticArrowRect.x, 2) +
      Math.pow(arrowRect.y - staticArrowRect.y, 2)
    );

    // Define a threshold for successful clearance (adjust as needed)
    const clearanceThreshold = 70; // Adjust as needed

    // Check if the distance is within the clearance threshold
    if (distance <= clearanceThreshold) {
      // Remove arrow element from the DOM
      arrow.remove();
      // Increment score when arrow is cleared
      score++;
      combo++;
      if (combo > maxCombo) {
        maxCombo = combo;
      }

      // Update score display
      renderScore();
      renderCombo();
      renderMaxCombo();
      return true; // Return true to indicate arrow was cleared successfully
    }
  }
  return false;
  // Return false if arrow was not cleared successfully
}

// Function to render the score on the screen
function renderScore() {
  // Replace 'score-display' with the ID of your score display element
  document.getElementById('score-display').innerText = `Score: ${score}`;
}

function renderCombo() {
  // Replace 'score-display' with the ID of your score display element
  document.getElementById('combo-display').innerText = `Combo: ${combo}`;
}


function renderMaxCombo() {
  document.getElementById(
    'maxcombo-display'
  ).innerText = `Max Combo: ${maxCombo}`;
}

// Render game elements
function render() {
  // Code to render game elements on the screen
}

// Main game loop
function gameLoop() {
  update();
  render();
}

// Start the game
function startGame() {
  isStarted = true;
  initGame();
  startArrowRain();
  setInterval(gameLoop, 1000 / 60); // Run game loop at 60 FPS
  setTimeout(stopGame, 4 * 60 * 1000 + 31 * 1000);
}

function pauseGame() {
  isStarted = false;
}

function restartGame() {
  // Reset game variables

  pauseSong()

  setTimeout(() => {
    startGame();
    playSong();
  }, 5000);

   health = 100;
   score = 0;
   combo = 0;
   maxCombo = 0;
   isStarted = false;

  // Reset visual elements if needed
    document.querySelector('.life-progress').style.width = '50%'; // Reset health bar width
    renderScore(); // Render initial score
    renderCombo(); // Render initial combo
    renderMaxCombo(); // Render initial max combo


}

// Function to create and animate arrow shapes
function createArrow() {
  if (isStarted) {
    const top = document.getElementById('top');
    const arrow = document.createElement('div');
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    let arrowObj = createRandomArrow(randomNumber);
    arrow.classList.add(arrowObj.className);
    document.getElementById(arrowObj.divName).appendChild(arrow);

    // Animation
    const speed = 5; // Adjust speed as needed
    const interval = setInterval(() => {
      const topPos = arrow.offsetTop;
      if (topPos >= window.innerHeight - 150) {
        clearInterval(interval);
        if (isStarted) {
          decreaseHealth();
        }
          healthCheck();
        
        arrow.remove(); // Remove arrow when it reaches the bottom
      } else {
        arrow.style.top = `${topPos + speed}px`; // Move arrow down
      }
    }, 1000 / 60);
  } // 60 FPS
}

// Function to continuously create arrows at intervals
function startArrowRain() {
  if(isStarted){
  setInterval(createArrow, 1000); // Create arrow every second (adjust interval as needed)
  }
}

function createRandomArrow(num) {
  if (num === 1) {
    return {
      className: 'arrow-right',
      divName: 'right',
    };
  }

  if (num === 2) {
    return {
      className: 'arrow-left',
      divName: 'left',
    };
  }

  if (num === 3) {
    return {
      className: 'arrow-top',
      divName: 'top',
    };
  }

  return {
    className: 'arrow-bottom',
    divName: 'bottom',
  };
}

  document.addEventListener('keydown', handleInput);

  document.getElementById('startbutton').addEventListener('click', function () {
  document.getElementById('startbutton').style.display="none";
  document.getElementById('pausebutton').style.display="flex";

  setTimeout(() => {
    startGame();
    playSong();
  }, 2000);
});

  document.getElementById('pausebutton').addEventListener('click',function (){
  document.getElementById('startbutton').style.display="flex";
  document.getElementById('pausebutton').style.display="none";
  pauseGame();
  pauseSong();

});

document.getElementById('restartbutton').addEventListener('click', restartGame);

