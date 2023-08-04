const refs = {
  body: document.body,
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

refs.start.addEventListener('click', onButtonStart);
refs.stop.addEventListener('click', onButtonStop);

let id = null;

function onButtonStart(event) {
  if (refs.body.dataset.active === 'true') {
    return;
  }

  refs.body.dataset.active = true;
  changeColor();

  refs.start.disabled = true;
  refs.stop.disabled = false;

  id = setInterval(changeColor, 1000);
}

function onButtonStop(event) {
  clearInterval(id);

  refs.body.dataset.active = false;
  refs.start.disabled = false;
  refs.stop.disabled = true;
}

function changeColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
