import Notiflix from 'notiflix';

const delayInput = document.querySelector('[name = "delay"]');
const stepInput = document.querySelector('[name = "step"]');
const amountInput = document.querySelector('[name = "amount"]');
const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

let intervalID = null;

function onSubmitForm(event) {
  event.preventDefault();
  let delayTime = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  if (delayTime < 0 || step < 0 || amount <= 0) {
    window.alert(`Please enter a positive number`);
  } else {
    for (let i = 1; i <= amount; i += 1) {
      createPromise(i, delayTime);
      delayTime += step;
    }
  }
  form.reset();
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    intervalID = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
