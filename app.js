const character = document.getElementById("character");
const block = document.getElementById("block");
const resetBtn = document.getElementById("resetBtn");
const scoreP = document.getElementById("score");
const jumpEffect = new Audio("jumpEffect.mp3");

//Initial values
var score = 0,
  play = true,
  speed = 1,
  addDificulty = 0;

//Jumping with click and Space
document.onclick = () => {
  jump();
};
document.addEventListener("keydown", (e) => {
  // this will be executed if we press space
  if (e.key == " ") {
    jump();
  }
});

//This function add and remove the css jump animation
function jump() {
  //adding the jump animation and checking if didn't have it
  if (character.classList !== "animate") {
    character.classList.add("animate");
    jumpEffect.play();
  }
  //Removing the class when the animation is over (500ms)
  setTimeout(() => {
    character.classList.remove("animate");
  }, 500);
}

//
resetBtn.addEventListener("click", () => {
  block.style.animation = "block " + speed + "s infinite linear";
  resetBtn.style.display = "none";
  play = true;
  score = 0;
  scoreP.innerText = score;
});
// resetBtn.onclick =

var checkDead = setInterval(() => {
  var characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  var blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
    block.style.animation = "none";
    resetBtn.style.display = "block";
    play = false;
  } else {
    if (play) {
      score = parseInt(scoreP.innerText) + 1;
      addDificulty += 1;
      scoreP.innerText = score;
      //Every 500 points the block will be faster
      if (addDificulty >= 500) {
        speed -= 0.1;
        block.style.animation = "block " + speed + "s infinite linear";
        addDificulty = 0;
      }
    }
  }
  //   console.log('si')
}, 10);
