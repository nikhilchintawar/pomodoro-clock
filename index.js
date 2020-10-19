const breakTime = document.querySelector(".break-time");
const sessionTime = document.querySelector(".session-time");
const increaseBreakTime = document.querySelector(".break-time-increase");
const decreaseBreakTime = document.querySelector(".break-time-decrease");
const increaseSessionTime = document.querySelector(".session-time-increase");
const decreaseSessionTime = document.querySelector(".session-time-decrease");
const playButton = document.getElementById("playButton");
const displaySeconds = document.querySelector(".seconds");
const displayMinutes = document.querySelector(".minutes")
const faPlay = document.querySelector(".fa-play");
const faPause = document.querySelector(".fa-pause");
const faSync = document.querySelector(".fa-sync");
const controlsButton = document.querySelector(".controls-button");
const seBrHeading = document.getElementById("se-br-heading");


let brTime = parseInt(breakTime.textContent);
let seTime = parseInt(sessionTime.textContent);
let setSeTime;
let setBrTime;
let remainingMinutes = displayMinutes.textContent;
let remainingSeconds = displaySeconds.textContent;
let resetSeconds = remainingSeconds;
let click = 0;
let breakTimeStarted = false;

const second = 1000;
const minute = second * 60;

const incBreakTime = () => {
    brTime += 1;
    breakTime.textContent = brTime;
    brTime < 10 ? displayMinutes.textContent = `0${brTime}` : displayMinutes.textContent = brTime;
    brTime = parseInt(breakTime.textContent);
    setBrTime = brTime;
}

const decBreakTime = () => {
    if(brTime === 0) return;
    brTime -= 1;
    breakTime.textContent = brTime;
    brTime < 10 ? displayMinutes.textContent = `0${brTime}` : displayMinutes.textContent = brTime;
    brTime = parseInt(breakTime.textContent);
    setBrTime = brTime;
}

const incSessionTime = () => {
    seTime++;
    sessionTime.textContent = seTime
    seTime < 10 ? displayMinutes.textContent = `0${seTime}` : displayMinutes.textContent = seTime;
    seTime = parseInt(sessionTime.textContent);
    setSeTime = seTime
}

const decSessionTime = () => {
    if(seTime === 0) return;
    seTime--;
    sessionTime.textContent = seTime
    seTime < 10 ? displayMinutes.textContent = `0${seTime}` : displayMinutes.textContent = seTime;
    seTime = parseInt(sessionTime.textContent);
    setSeTime = seTime
}

let seconds = 0;
let updatedSeconds;
let interval;


const pomodoro = (mins) => {
    seconds = mins * 60;

    interval = setInterval(function(){
        seconds--;
        
        // console.log(click)
        // console.log('1',seconds)
        // console.log('2',updatedSeconds)
        if(click > 0 && updatedSeconds){ 
            updatedSeconds--;        
            updatedSeconds < 10 ? displaySeconds.textContent = `0${parseInt(updatedSeconds)}` : displaySeconds.textContent = parseInt(updatedSeconds);
            
            if(!updatedSeconds){
                click = 0;
                seconds = 0; 
            }

        }else{
            if(breakTimeStarted){
                if(brTime === setBrTime){
                    brTime--;
                    if (brTime <= 0) {
                        brTime = 0;
                        displaySeconds.classList.add("warning");
                    }
                        brTime < 10 ? displayMinutes.textContent = `0${brTime}` : displayMinutes.textContent = brTime;

                }else{
                        brTime < 10 ? displayMinutes.textContent = `0${brTime}` : displayMinutes.textContent = brTime;

                }
            }else{
                if(seTime === setSeTime){
                    seTime--;
                    if (seTime <= 0) {
                        seTime = 0;
                        displaySeconds.classList.add("warning");
                    }
                    seTime < 10 ? displayMinutes.textContent = `0${seTime}` : displayMinutes.textContent = seTime;
                }else{
                    seTime < 10 ? displayMinutes.textContent = `0${seTime}` : displayMinutes.textContent = seTime;                    
                }
            }
            seconds < 10 ? displaySeconds.textContent = `0${seconds}` : displaySeconds.textContent = seconds;
        }

        if(!seconds){

            if(breakTimeStarted){
                brTime--;
                    brTime < 10 ? displayMinutes.textContent = `0${brTime}` : displayMinutes.textContent = brTime;

            }else{
                seTime--;
                seTime < 10 ? displayMinutes.textContent = `0${seTime}` : displayMinutes.textContent = seTime;
            }
            clearInterval(interval)
            pomodoro(1);
            if(seTime === 0 || brTime === 0){
                console.log(brTime, seTime)
                displaySeconds.classList.add("warning");
            }
            if(seTime === -1 && !breakTimeStarted){
                breakTimeStarted = true;
                console.log("break time started")
                displayMinutes.textContent = brTime;
                displaySeconds.classList.remove("warning");
                seBrHeading.textContent = "Break Time!";
                seTime = setSeTime;
            }
            if(brTime === -1 && breakTimeStarted){
                breakTimeStarted = false;
                console.log("session time");
                displayMinutes.textContent = seTime;
                displaySeconds.classList.remove("warning");
                seBrHeading.textContent = "Session";
                brTime = setBrTime;
            }

        }
    }, second)
}

let playing;

const faPlayButton = () => {
        controlsButton.children[0].classList.replace("fa-play", "fa-pause");
        pomodoro(1);
}

const faPauseButton = () => {
    controlsButton.children[0].classList.replace("fa-pause", "fa-play");
    clearInterval(interval);
}


const togglePlay = () => {
    if(playing){
        faPauseButton();
        seTime = displayMinutes.textContent;
        updatedSeconds = displaySeconds.textContent;
        // console.log(updatedSeconds)
        playing = false;
        click++;

    }else{
        faPlayButton();
        playing = true;
    }
}

const reset = () => {
    faPauseButton()
    displayMinutes.textContent = setSeTime;
    displaySeconds.textContent = resetSeconds
    click = 0;
    playing = false;
}

// const breakTime = (){
    
// }

increaseBreakTime.addEventListener('click', incBreakTime);
decreaseBreakTime.addEventListener('click', decBreakTime);
increaseSessionTime.addEventListener('click', incSessionTime);
decreaseSessionTime.addEventListener('click', decSessionTime);
playButton.addEventListener('click', togglePlay);
faSync.addEventListener('click', reset);