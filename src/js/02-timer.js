import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const selectDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const min = document.querySelector('[data-minutes]');
const sec = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', '');

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      window.alert('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

flatpickr(selectDate, options);

startBtn.addEventListener('click', startTimer);

function startTimer() {
  startBtn.setAttribute('disabled', '');
  selectDate.setAttribute('disabled', '');

  timerId = setInterval(() => {
    const choosenDate = new Date(selectDate.value);
    const timeLeft = choosenDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    day.textContent = addLeadingZero(days);
    hour.textContent = addLeadingZero(hours);
    min.textContent = addLeadingZero(minutes);
    sec.textContent = addLeadingZero(seconds);

    if (timeLeft < 1000) {
      clearInterval(timerId);
      selectDate.removeAttribute('disabled');
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
