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


let brTime = parseInt(breakTime.textContent);
let seTime = parseInt(sessionTime.textContent);
let setSeTime = seTime;
let setBrTime = brTime;
let remainingMinutes = displayMinutes.textContent;
let remainingSeconds = displaySeconds.textContent;
let resetSeconds = remainingSeconds;
let click = 0;
let breakTimeStarted = false;

const second = 1000;
const minute = second * 60;

const incBreakTime = () => {
    brTime += 1
    breakTime.textContent = brTime
}

const decBreakTime = () => {
    if(brTime === 0) return;
    brTime -= 1
    breakTime.textContent = brTime
}

const incSessionTime = () => {
    seTime += 1
    sessionTime.textContent = seTime
    displayMinutes.textContent = seTime
}

const decSessionTime = () => {
    if(seTime === 0) return;
    seTime -= 1
    sessionTime.textContent = seTime
    displayMinutes.textContent = seTime
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
                    if (brTime < 0) {
                        brTime = 0;
                    }
                    displayMinutes.textContent = brTime;
                }else{
                    displayMinutes.textContent = brTime
                }
            }else{
                if(seTime === setSeTime){
                    seTime--;
                    if (seTime < 0 ) {
                        seTime = 0;
                    }
                    displayMinutes.textContent = seTime;
                }else{
                    displayMinutes.textContent = seTime;
                }
            }
            seconds < 10 ? displaySeconds.textContent = `0${seconds}` : displaySeconds.textContent = seconds;
        }

        if(!seconds){

            if(breakTimeStarted){
                brTime--;
                displayMinutes.textContent = brTime;
            }else{
                seTime--;
                displayMinutes.textContent = seTime;
            }
            clearInterval(interval)
            pomodoro(1);
            if(seTime === -1 && !breakTimeStarted){
                breakTimeStarted = true;
                console.log("break time started")
                displayMinutes.textContent = brTime;
                seTime = setSeTime;
            }
            if(brTime === -1 && breakTimeStarted){
                breakTimeStarted = false;
                console.log("session time");
                displayMinutes.textContent = seTime;
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
    displayMinutes.textContent = seTime;
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