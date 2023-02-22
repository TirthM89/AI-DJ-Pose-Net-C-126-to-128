song = "";
LWX = 0;
LWY = 0;
RWX = 0;
RWY = 0;
scoreLW = 0;
scoreRW = 0;

function preload() {

    soundFormats('mp3');
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(500,500);
    canvas.position(415,180);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
scoreLW = results[0].pose.keypoints[9].score;

scoreRW = results[0].pose.keypoints[10].score;
        LWX = results[0].pose.leftWrist.x;
        LWY = results[0].pose.leftWrist.y;
        RWX = results[0].pose.rightWrist.x;
        RWY = results[0].pose.rightWrist.y;

        console.log("LWX = "+LWX+" LWY = "+LWY+" RWX = "+RWX+" RWY = "+RWY);
        console.log(typeof(LWY));
        console.log("Score of LW is "+scoreLW);
        console.log("Score of RW is "+scoreRW);
    }
}

function modelLoaded() {
    console.log("Pose Net is Intialized");
}
function draw() {
    image(video,0,0,500,500);
    fill("#FF0000");
    stroke("#FF0000");
    if (scoreLW > 0.2) {
        circle(LWX,LWY,20);
    LWYinNumber = Number(LWY);
    removeDecimal = Math.floor(LWYinNumber);
    LWY_divide_1000 = removeDecimal/1000;
    volume = LWY_divide_1000*2;
    document.getElementById("volume").innerHTML = "Volume is equal to "+volume;
    song.setVolume(volume);
    }

    if (scoreRW>0.2) {
        circle(RWX,RWY,20);
        if (RWY>0 && RWY<=100) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if (RWY>100 && RWY<=200) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if (RWY>200 && RWY<=300) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if (RWY>300 && RWY<=400) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
    
    }
}

function p() {
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function pa(){  
    song.pause();
  }

function s(){  
    song.stop();
}