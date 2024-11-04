let symmetry = 8;
let angle = 360 / symmetry;
let t = 0;
let brandColors;
let symmetrySlider, colorSpeedSlider, strokeWeightSlider, bgTransparencySlider;
let widthDivSlider, heightDivSlider, scaleXSlider, scaleYSlider;
let controlPanel, animateButton, saveButton, randomTextButton;
let animating = false;
let animationSpeed = 0.5;
let time = 0;

const buttonTexts = [
  "No",
  "Too lazy to build this",
  "Just refresh",
  "CMD + R",
  "lol",
  "I like annoying people",
  "Sorry",
  "Try Again",
  "Just refresh the page",
  "Keep clicking",
  "Almost there",
];

function setup() {
  createCanvas(720, 720);
  angleMode(DEGREES);
  colorMode(RGB, 255);
  background(0);
  noFill();

  brandColors = [color("#D01F30"), color("#FFC300"), color("#00B2FF")];

  controlPanel = createDiv();
  controlPanel.addClass("control-panel");
  controlPanel.position(10, 10);

  symmetrySlider = createSlider(2, 24, 8, 1);
  createLabelWithSlider("Symmetry", symmetrySlider);

  colorSpeedSlider = createSlider(0.1, 2, 0.5, 0.1);
  createLabelWithSlider("Color Speed", colorSpeedSlider);

  strokeWeightSlider = createSlider(1, 20, 10, 1);
  createLabelWithSlider("Stroke Weight", strokeWeightSlider);

  bgTransparencySlider = createSlider(1, 50, 9.5, 0.5);
  createLabelWithSlider("BG Transparency", bgTransparencySlider);

  widthDivSlider = createSlider(1, 5, 3, 0.1);
  createLabelWithSlider("Width Division", widthDivSlider);

  heightDivSlider = createSlider(1, 5, 3, 0.1);
  createLabelWithSlider("Height Division", heightDivSlider);

  scaleXSlider = createSlider(0.5, 5, 2, 0.1);
  createLabelWithSlider("Scale X", scaleXSlider);

  scaleYSlider = createSlider(-5, -0.5, -2, 0.1);
  createLabelWithSlider("Scale Y", scaleYSlider);

  animateButton = createButton("Start Animation");
  animateButton.parent(controlPanel);
  animateButton.mousePressed(toggleAnimation);

  saveButton = createButton("Save Canvas");
  saveButton.parent(controlPanel);
  saveButton.mousePressed(() => saveCanvas("myCanvas", "png"));

  randomTextButton = createButton("Reset");
  randomTextButton.parent(controlPanel);
  randomTextButton.mousePressed(changeButtonText);
}

function createLabelWithSlider(labelText, slider) {
  let container = createDiv();
  container.style("margin-bottom", "10px");
  container.parent(controlPanel);

  let label = createSpan(labelText + ": ");
  label.parent(container);

  let valueDisplay = createSpan(slider.value());
  valueDisplay.addClass("slider-value");
  valueDisplay.style("margin-left", "10px");
  valueDisplay.parent(container);

  slider.valueDisplay = valueDisplay;

  slider.parent(container);
  slider.input(() => {
    valueDisplay.html(slider.value());
  });
}

function toggleAnimation() {
  animating = !animating;
  animateButton.html(animating ? "Pause Animation" : "Start Animation");
}

function changeButtonText() {
  const newText = random(buttonTexts);
  randomTextButton.html(newText);
}

function updateSliderValueDisplay(slider) {
  slider.valueDisplay.html(slider.value().toFixed(2));
}

function draw() {
  if (animating) {
    time += animationSpeed;

    symmetrySlider.value(map(sin(time * 10), -1, 1, 2, 24));
    updateSliderValueDisplay(symmetrySlider);

    colorSpeedSlider.value(map(sin(time), -1, 1, 0.1, 2));
    updateSliderValueDisplay(colorSpeedSlider);

    strokeWeightSlider.value(map(sin(time * 5), -1, 1, 1, 20));
    updateSliderValueDisplay(strokeWeightSlider);

    bgTransparencySlider.value(map(sin(time * 8.5), -1, 1, 1, 50));
    updateSliderValueDisplay(bgTransparencySlider);

    widthDivSlider.value(map(sin(time * 8), -1, 1, 1, 5));
    updateSliderValueDisplay(widthDivSlider);

    heightDivSlider.value(map(sin(time * 11), -1, 1, 1, 5));
    updateSliderValueDisplay(heightDivSlider);

    scaleXSlider.value(map(sin(time * 9), -1, 1, 0.5, 5));
    updateSliderValueDisplay(scaleXSlider);

    scaleYSlider.value(map(sin(time * 7), -1, 1, -5, -0.5));
    updateSliderValueDisplay(scaleYSlider);
  }

  symmetry = symmetrySlider.value();
  angle = 360 / symmetry;
  let colorSpeed = colorSpeedSlider.value();
  let strokeW = strokeWeightSlider.value();
  let bgTransparency = bgTransparencySlider.value();
  let widthDiv = widthDivSlider.value();
  let heightDiv = heightDivSlider.value();
  let scaleX = scaleXSlider.value();
  let scaleY = scaleYSlider.value();

  background(0, bgTransparency);

  translate(width / 2, height / 2);

  let x1 = ((noise(t) - 0.5) * width) / widthDiv;
  let y1 = ((noise(t + 1000) - 0.5) * height) / heightDiv;
  let x2 = ((noise(t + 0.05) - 0.5) * width) / widthDiv;
  let y2 = ((noise(t + 1000 + 0.05) - 0.5) * height) / heightDiv;

  t += 0.01;

  let totalColors = brandColors.length;
  let tNorm = (t * colorSpeed) % totalColors;
  let colorIndex = floor(tNorm);
  let tColor = tNorm - colorIndex;
  let colFrom = brandColors[colorIndex];
  let colTo = brandColors[(colorIndex + 1) % totalColors];
  let col = lerpColor(colFrom, colTo, tColor);

  for (let i = 0; i < symmetry; i++) {
    rotate(angle);

    stroke(col);
    strokeWeight(strokeW);

    line(x1, y1, x2, y2);

    push();
    scale(scaleX, scaleY);
    line(x1, y1, x2, y2);
    pop();
  }

  if (frameCount > 20000) {
    noLoop();
  }
}
