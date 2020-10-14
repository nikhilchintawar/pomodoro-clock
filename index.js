const breakTime = document.querySelector(".break-time");
const sessionTime = document.querySelector(".session-time");
const increaseBreakTime = document.querySelector(".break-time-increase");
const decreaseBreakTime = document.querySelector(".break-time-decrease");
const increaseSessionTime = document.querySelector(".session-time-increase");
const decreaseSessionTime = document.querySelector(".session-time-decrease");
const minutes = document.querySelector(".minutes")

let brTime = parseInt(breakTime.textContent);
let seTime = parseInt(sessionTime.textContent);

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
    minutes.textContent = seTime
}

const decSessionTime = () => {
    if(seTime === 0) return;
    seTime -= 1
    sessionTime.textContent = seTime
    minutes.textContent = seTime

}


increaseBreakTime.addEventListener('click', incBreakTime);
decreaseBreakTime.addEventListener('click', decBreakTime);
increaseSessionTime.addEventListener('click', incSessionTime);
decreaseSessionTime.addEventListener('click', decSessionTime);