import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('[name=delay]'),
  delayStep: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
};

refs.form.addEventListener('submit', onSubmitButtonClick);

function onSubmitButtonClick(e) {
  e.preventDefault();
  const firstDelayNum = Number(refs.firstDelay.value);
  const delayStepNum = Number(refs.delayStep.value);
  const amountNum = Number(refs.amount.value);

  let delay = firstDelayNum;
  for (let i = 1; i <= amountNum; i += 1) {
    createPromise(i, delay);
    delay += delayStepNum;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
    .then(
      ({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      },
      ({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    )
    .catch(err => {
      console.log(err);
    });
}
