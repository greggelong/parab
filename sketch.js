let v0 = 90; // Initial velocity (m/s)
let theta = 100; // Launch angle (degrees)
let g = 9.81; // Gravity (m/s^2)
let timeStep = 0.5; // Time step for calculation (s)
let points = [];
let pindex = 0;
let numOfParab = 0;
let clr;
//let maxTime = 10; // Maximum time to prevent infinite loop (s)

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Convert angle to radians
  //theta = radians(theta);
  angleMode(DEGREES);
  pixelDensity(1);
  // Calculate the trajectory points
  background(0);

  //theta = random(45, 300);
  // v0= floor(random(90,100))
  calculateTrajectory();
  clr = color(255, 0, 0);
}

function draw() {
  if (numOfParab > 60) {
    numOfParab = 0;
    background(0);
  } else {
    if (pindex < points.length) {
      pindex++;
      plotPara(clr);
    } else {
      pindex = 0;
      theta = random(0, 360);
      v0 = floor(random(90, 100));
      calculateTrajectory();
      let cl = random(255);
      clr = color(cl, 255 - cl, 255 - cl);
      numOfParab++;
    }
  }
}

function plotPara(clr) {
  //background(220);
  // Draw the trajectory
  stroke(clr);
  strokeWeight(5);
  //fill(clr);
  noFill();
  beginShape();
  for (let i = 0; i < pindex; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape();
}

function calculateTrajectory() {
  points = [];
  let t = 0.1;
  let x;
  let y;
  while (true) {
    x = v0 * cos(theta) * t + width / 2;
    y = height * 0.5 - (v0 * sin(theta) * t - 0.5 * g * t * t);
    if (y >= height) break; // Stop when the projectile hits the ground
    points.push({ x: x, y: y });
    t += timeStep;
  }
}
