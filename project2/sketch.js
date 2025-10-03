const TEST = true;
const WaveTime = 20000;
//wave colors
let WaveColA, WaveColB;

//waves
let rows = 5;
let waveMaxHeight = 150;
let baseT = 0;

function timeTester(){
  if (TEST) return 24 + 30/60; 
  return hour() + minute()/60 + second()/3600;
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  noStroke();

  WaveColA = color(27, 60, 83, 100);
  WaveColB = color(93, 59, 138, 100);
}


function draw(){
  const h = timeTester();
  const morning = 6, noon = 13, evening = 17, night = 24;

//background color
  let fromColor, toColor, t;
  if (h >= 0 && h < morning) { fromColor = color("#0d2030"); toColor = color("#f8b195"); t = (h-0)/(morning-0);
  } else if (h >= morning && h < noon) { fromColor = color("#F8B195"); toColor = color("#B4C4F4"); t = (h-morning)/(noon-morning);
  } else if (h >= noon && h < evening) { fromColor = color("#B4C4F4"); toColor = color("#CDA1E3"); t = (h-noon)/(evening-noon);
  } else { fromColor = color("#CDA1E3"); toColor = color("#0d2030"); t = (h-evening)/(night-evening); }

  const bg = lerpColor(fromColor, toColor, constrain(t, 0, 1));
  background(bg);

  // gradient radial
  let gradFrom, gradTo;
  if (h >= 0 && h < morning) { gradFrom = color("#355C7D"); gradTo = color("#fcd658"); t = (h-0)/(morning-0);
  } else if (h >= morning && h < noon) { gradFrom = color("#fcd658"); gradTo = color("#4fb3ff"); t = (h-morning)/(noon-morning);
  } else if (h >= noon && h < evening) { gradFrom = color("#4fb3ff"); gradTo = color("#81eefc"); t = (h-noon)/(evening-noon);
  } else { gradFrom = color("#81eefc"); gradTo = color("#355C7D"); t = (h-evening)/(night-evening); }

  const gradCol = lerpColor(gradFrom, gradTo, constrain(t, 0, 1));
  drawRadialGradient(width/2, height/2, max(width, height) * 0.4, gradCol);

  // draw waves
  drawWaves(rows);
}

function drawRadialGradient(cx, cy, r, col){
  push();

  drawingContext.save();

  const grad = drawingContext.createRadialGradient(cx, cy, 0, cx, cy, r);
  grad.addColorStop(0, `rgba(${red(col)},${green(col)},${blue(col)},0.7)`);
  grad.addColorStop(1, `rgba(${red(col)},${green(col)},${blue(col)},0.0)`);
  drawingContext.fillStyle = grad;
  rect(0, 0, width, height);

  drawingContext.restore();
  pop();
}
//wave color change
function WaveColorChange(ms, period){
  const x = (ms % period) / period;     
  return x < 0.5 ? x * 2 : (1 - x) * 2;  
}

function drawWaves(count){
  for (let i = 0; i < count; i++){
    drawWave(i, count);
  }
  baseT += 0.01;
}

function drawWave(n, rows){
  const baseY = height - n * (waveMaxHeight / 3);
  let t = baseT + n * 100;

  let startX = 0;
  push();
colorMode(RGB, 255);
  noStroke();

   const rowPhaseMs = (n * 700) % WaveTime;         
  const blend = WaveColorChange(millis() + rowPhaseMs, WaveTime)
const c = lerpColor(WaveColA, WaveColB, blend);
  c.setAlpha(200); 
  fill(c);

  beginShape();
  vertex(startX, baseY);
  for (let x = startX; x <= width; x += 10) {
    const y = baseY - map(noise(t), 0, 1, 10, waveMaxHeight);
    vertex(x, y);
    t += 0.01;
  }
  vertex(width, baseY);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  pop();
}

function windowResized(){ 
    resizeCanvas(windowWidth, windowHeight); 
}
