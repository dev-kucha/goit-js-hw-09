import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  button: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    onSelectedDate(selectedDates);
  },
};
flatpickr('#datetime-picker', options);

let selectedDate = null;

refs.button.setAttribute('disabled', 'disabled');

refs.button.addEventListener('click', onStartButtonClick);

function onSelectedDate(selectedDates) {
  selectedDate = selectedDates[0];
  const currentDate = new Date();
  if (selectedDate < currentDate) {
    // window.alert('Please choose a date in the future');
    Notify.failure('Please choose a date in the future');
    return;
  }
  refs.button.removeAttribute('disabled');
}

function onStartButtonClick() {
  timerID = setInterval(() => {
    const differentDate = selectedDate - new Date();

    if (differentDate <= 0) {
      clearInterval(timerID);
      return;
    }

    refs.dataDays.innerHTML = addLeadingZero(convertMs(differentDate).days);
    refs.dataHours.innerHTML = addLeadingZero(convertMs(differentDate).hours);
    refs.dataMinutes.innerHTML = addLeadingZero(
      convertMs(differentDate).minutes
    );
    refs.dataSeconds.innerHTML = addLeadingZero(
      convertMs(differentDate).seconds
    );
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
