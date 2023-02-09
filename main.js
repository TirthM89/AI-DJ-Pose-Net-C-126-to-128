song = "";

function preload() {

    soundFormats('mp3');
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video,0,0,500,500);
}

function p() {
    song.play();
}
