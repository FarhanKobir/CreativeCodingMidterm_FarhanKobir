// adjective - desolate (of a person, NOT of a place) - feel very sad, alone, and without hope (Collins Dictionary)

// scene 1 - ball bouncing in pastel color pallete (very nice)
// scene 2 - flashing red and blue (like police came)
// scene 3 - the ball attached to the mouse, behind black bars and one massive pair of eyes in the middle following mouse
// scene 4 (maybe) - random generate of canvas full of small eyes, mouse has ball attached to it, but as you go, it overlays white stroke (kinda like everyone is avoiding ball)
// scene 5 - same as scene 1, but colors are different shades of gray, maybe even make ball become faster and angular (start off with 21 sides, each bounce removes 3 sides until becomes triangle)
// - END -

// note : first make it the way i want, then find ways to make things into objects with methods and incorporate arrays (required)
// make general structure with low detail first, then make it better and more detailed

// notes for further development: do smth with scene 2 so it's not just flashing between the two, scene 3 make bars move to the right continuously

class Eye {
  constructor(x, y, eyeRadius, pupilRadius) {
    this.x = x;
    this.y = y;
    this.eyeRadius = eyeRadius;
    this.pupilRadius = pupilRadius;
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, this.eyeRadius * 2);
    
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    let distance = sqrt(dx * dx + dy * dy);
    let pupilX = this.x + (dx / distance) * (this.eyeRadius - this.pupilRadius);
    let pupilY = this.y + (dy / distance) * (this.eyeRadius - this.pupilRadius);
    
    fill(0);
    ellipse(pupilX, pupilY, this.pupilRadius * 2);
  }
}

class Pair{
  constructor(eyeL, eyeR){
    this.eyeL = eyeL;
    this.eyeR = eyeR;
  }

  display(){
    this.eyeL.display();
    this.eyeR.display();
  }
}


let position1;
let velocity1;
let position2;
let velocity2;
let bounceCount = 0;
let bgColor;
let flashing = false;
let flashTimer = 0;
let flashState = false;
let flashDuration = 2000;
let flashEndTime = 0;
let sceneState3 = false;
let face = [];
let eyeX1;
let eyeY1;
let eyeX2;
let eyeY2;
let eyeRadius = 150;
let pupilRadius = 60;
let r = 255;
let g = 255
let b = 100;
let sceneState4 = false;
let col = 9;  
let row = 5;  
let eyeSpacing = 200;
let circleSize = 200;
let sceneState5 = false;
let sides = 24;
let sceneState6 = false;


function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = getPastel();

  // for ball
  position1 = createVector(100, 100);
  velocity1 = createVector(7, 7);

  position2 = createVector(100, 100);
  velocity2 = createVector(3, 3);

  // eye location
  eyeX1 = (windowWidth / 2) - 150;
  eyeY1 = windowHeight / 3;
  eyeX2 = (windowWidth / 2) + 150;
  eyeY2 = windowHeight / 3;

  face.push(new Pair(new Eye(eyeX1, eyeY1, 150, 60), new Eye(eyeX2, eyeY2, 150, 60)));

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let eye_Y = i * eyeSpacing + eyeSpacing / 2;
      if (j % 2 == 0){ // so that pair of eyes will have spaces between them
        let eye_X = j * eyeSpacing + eyeSpacing / 2;
        face.push(new Pair(new Eye(eye_X, eye_Y, 60, 20), new Eye(eye_X + 120, eye_Y, 60, 20)));
      }
      else{
        let eye_X = j * eyeSpacing + eyeSpacing + 100;
        face.push(new Pair(new Eye(eye_X, eye_Y, 60, 20), new Eye(eye_X + 120, eye_Y, 60, 20)));
      }
    }
  }

}

function draw() {
  // scene 2
  if (bounceCount >= 5) {
    if (millis() - flashTimer > 100) { // each color for 500 ms
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
      bgColor = color(200);
      sceneState3 = true;
    }
  }
  background(bgColor);

  // scene 1
  if (bounceCount < 5) {
    // control ball speed
    position1.add(velocity1);
    // check if bounce
    if (position1.x > width || position1.x < 0) {
      velocity1.x *= -1;
      bounceCount++;
      changeBackground();
    }
    if (position1.y > height || position1.y < 0) {
      velocity1.y *= -1;
      bounceCount++;
      changeBackground();
    }
    
    stroke(0);
    strokeWeight(3);
    fill(r, g, b);
    circle(position1.x, position1.y, circleSize);
  }
  
  // scene 3
  if (sceneState3){
    strokeWeight(3);
    fill(r, g, b);
    circle(mouseX, mouseY, circleSize);
    
    // prison bars
    for (let i = 0; i < windowWidth + 10; i+= 100){
        strokeWeight(40);
        line(i, -10, i, windowHeight + 10);
    }

    // eye
    strokeWeight(3);
    face[0].display();

    // make circle towards balck
    r -= .25;
    g -= .25;
    b -= .10;

    if (r <= 0) {
      sceneState4 = true;
      sceneState3 = false;
      bgColor = color(200);
    }
  }
  
  // scene 4
  if (sceneState4) {
    background(bgColor);
    strokeWeight(3);
    fill(r, g, b);
    circle(mouseX, mouseY, circleSize);

    for (let i = 1; i < face.length; i++){
      face[i].display();
    }

    if (circleSize > 80) {
      circleSize-=.2;
    } else {
      sceneState4 = false;
      sceneState5 = true;
      bgColor = color(255);
    }
  }

  // scene 5
  if (sceneState5) {
    background(bgColor);
    // control ball speed
    position2.add(velocity2);
    // check if bounce
    if (position2.x > width || position2.x < 0) {
      velocity2.x *= -1;
      if (sides>3){
        sides -= 3;
        circleSize -= 10;
      }

    }
    if (position2.y > height || position2.y < 0) {
      velocity2.y *= -1;
      if (sides>3){
        sides -= 3;
        circleSize -= 10;
      }
    }
    stroke(0);
    strokeWeight(3);
    fill(r, g, b);
    drawPolygon(position2.x, position2.y, circleSize, sides);
    if (sides == 3){
      sceneState5 = false;
      sceneState6 = true;
    }
  }

  if (sceneState6){
    background(255);
    drawPolygon(position2.x, position2.y, circleSize, sides);
    circleSize += 3;
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
  } 
  else if (bounceCount < 5) {
    bgColor = getPastel();
  }
}

function drawPolygon(x, y, radius, side) {
  let angle = TWO_PI / side;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let x1 = x + cos(a) * radius;
    let y1 = y + sin(a) * radius;
    vertex(x1, y1);
  }
  endShape(CLOSE);
}


// *taken from chatgpt* TEMPORARY TO TEST IDEA (also make sure you understand what is happening here)
// can make this into an object
// function drawEye(x, y) {
//   fill(255);
//   ellipse(x, y, eyeRadius * 2);
  
//   let dx = mouseX - x;
//   let dy = mouseY - y;
//   let distance = sqrt(dx * dx + dy * dy); // pythagreon theorem
//   let pupilX = x + (dx / distance) * (eyeRadius - pupilRadius); // makes sure the pupil stays within the eyes
//   let pupilY = y + (dy / distance) * (eyeRadius - pupilRadius);
  
//   fill(0);
//   ellipse(pupilX, pupilY, pupilRadius * 2);
// }