const datePicker = document.getElementById('date-picker');
const title = document.getElementById('title');
const form = document.getElementById('countdownForm');
const counter = document.querySelectorAll('span');
const inputContainer = document.getElementById('input-container');

const countdown = document.getElementById('countdown');
const countDownBtn = document.getElementById('countdown-button');

const complete = document.getElementById('complete');
const completeBtn = document.getElementById('complete-button');
const completeInfo = document.getElementById('complete-info');

let dateValue;
let counting;
let duration;
let titleValue;

// prevent selecting the past dates
let now = new Date().toISOString().split('T')[0];
datePicker.setAttribute('min', now)


//Setting formula
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//go to the countDown UI
function countDownStart(e) {
    e.preventDefault();

    //Gettiing value from form
    titleValue = e.srcElement[0].value;
    dateValue = e.srcElement[1].value;


    storingData();

    if (!titleValue || !dateValue){
        alert("Please Fill Data!")
    } else {
        inputContainer.hidden = true;
        countdown.hidden = false;
        complete.hidden = true;
        updateUI()
    }

}

//UpdateUI
function updateUI() {
    counting = setInterval( () => {
        let time2 = new Date(dateValue);
        let selectedTime = time2.getTime();

        //get Current time
        let time = new Date();
        let currentTime = time.getTime();

        //get the duration between current time and selected time
        duration = selectedTime - currentTime;
        console.log(duration);
        
        //Transforming the duration into day, hour, minute, second
        let countDay = Math.floor(duration / day);
        let countHour = Math.floor((duration % day) / hour);
        let countMinute = Math.floor((duration % hour) / minute);
        let countSecond = Math.floor((duration % minute) / second);

        console.log(countDay, countHour, countMinute, countSecond);
        
        //Updating value to countdown UI
        counter[0].textContent = countDay;
        counter[1].textContent = countHour;
        counter[2].textContent = countMinute;
        counter[3].textContent = countSecond;

        //Check if the coundown is finished
        if (duration < 0) {
            clearInterval(counting);
            inputContainer.hidden = true;
            countdown.hidden = true;
            complete.hidden = false;
            completeInfo.textContent = `You have completed your ${titleValue} at ${dateValue}.`;
            localStorage.removeItem('info');
        }
    }, 1000);
}

//Reset all 
function reset() {
    inputContainer.hidden = false;
    countdown.hidden = true;
    complete.hidden = true;
    clearInterval(counting);
    title.value = '';
    datePicker.value = 0;
    localStorage.removeItem('info');
}

function storingData() {
    let information = {'title': titleValue, 'date': dateValue};
    localStorage.setItem('info', JSON.stringify(information));
}

function restoringPreviousCountdown () {
    if (localStorage.getItem('info')){
        let prevData = JSON.parse(localStorage.getItem('info'));
        dateValue = prevData.date;
        titleValue = prevData.title;
        updateUI()
        inputContainer.hidden = true;
        countdown.hidden = false;
        complete.hidden = true;
    }
}

restoringPreviousCountdown()

//Event Listeners
form.addEventListener('submit', countDownStart);
countDownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);
