const refs = {};
refs.dataStart = document.querySelector('button[data-start]');
refs.dataStop = document.querySelector('button[data-stop]');
refs.body = document.querySelector('body');

refs.dataStart.addEventListener('click', onDataStartClick);
refs.dataStop.addEventListener('click', onDataStopClick);

function onDataStartClick() {
  refs.dataStart.setAttribute('disabled', 'disabled');
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onDataStopClick() {
  clearInterval(timerId);
  refs.dataStart.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
