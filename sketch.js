// scene 1 - ball bouncing in pastel color pallete (very nice)
// scene 2 - flashing red and blue (like police came)
// scene 3 - the ball in a sort of prison, behind black bars and one massive pair of eyes in the middle following the mouse
// scene 4 (maybe) - random generate of canvas full of small eyes, mouse has ball attached to it, but as you go, it overlays white stroke (kinda like everyone is avoiding ball)
// scene 5 - same as scene 1, but colors are different shades of gray, maybe even make ball become faster and angular (start off with 21 sides, each bounce removes 3 sides until becomes triangle)
// - END -

// note : first make it the way i want, then find ways to make things into objects with methods and incorporate arrays (required)
// make general structure with low detail first, then make it better and more detailed

let x = 100;
let y = 100;
let xspeed = 3;
let yspeed = 2;
let bounceCount = 0;
let bgColor;
let flashing = false;
let flashTimer = 0;
let flashState = false;
let flashDuration = 5000;
let flashEndTime = 0;
let sceneState3 = false;
let eyeX1;
let eyeY1;
let eyeX2;
let eyeY2;
let eyeRadius = 150;
let pupilRadius = 60;


function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = getPastel();

  // eye location
  eyeX1 = windowWidth / 3;
  eyeY1 = windowHeight / 3;
  eyeX2 = eyeX1 + (eyeRadius * 2.5);
  eyeY2 = windowHeight / 3;

}

function draw() {
  // scene 2
  if (bounceCount >= 5) {
    if (millis() - flashTimer > 500) { // each color for 500 ms
      flashState = !flashState; // allows to alternate between blue and red
      if (flashState){
        bgColor = color(255, 0, 0); // red
      }
      else{
        bgColor = color(0, 0, 255); // blue
      }
      flashTimer = millis();
    }
    
    if (millis() > flashEndTime) { // gray for next scene
      bgColor = color(150);
      sceneState3 = true;
    }
  }
  background(bgColor);
  
  // scene 1
  if (bounceCount < 5) {
    // control ball speed
    x = x + xspeed;
    y = y + yspeed;
    // check if bounce
    if (x > width || x < 0) {
      xspeed = xspeed * -1;
      bounceCount++;
      changeBackground();
    }
    if (y > height || y < 0) {
      yspeed = yspeed * -1;
      bounceCount++;
      changeBackground();
    }
    
    stroke(0);
    strokeWeight(3);
    fill(255);
    circle(x, y, 200);
  }

  // scene 3
  if (sceneState3){
    
    // *put prison bars here*
    
    drawEye(eyeX1, eyeY1);
    drawEye(eyeX2, eyeY2);
  }


}

function getPastel() {
  return color(random(150, 255), random(150, 255), random(150, 255)); // selects random r g b values to make a pastel color
}

function changeBackground() {
  if (bounceCount >= 5 && !flashing) { // checks if time to go to next scene
    flashing = true;
    flashTimer = millis();
    flashEndTime = millis() + flashDuration;
  } else if (bounceCount < 5) {
    bgColor = getPastel();
  }
}

// *taken from chatgpt* TEMPORARY TO TEST IDEA (also make sure you understand what is happening here)
// can make this into an object
function drawEye(x, y) {
  fill(255);
  ellipse(x, y, eyeRadius * 2);
  
  let dx = mouseX - x;
  let dy = mouseY - y;
  let distance = sqrt(dx * dx + dy * dy); // pythagreon theorem
  let pupilX = x + (dx / distance) * (eyeRadius - pupilRadius); // makes sure the pupil stays within the eyes
  let pupilY = y + (dy / distance) * (eyeRadius - pupilRadius);
  
  fill(0);
  ellipse(pupilX, pupilY, pupilRadius * 2);
}

