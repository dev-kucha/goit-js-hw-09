const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('[name=delay]'),
  delayStep: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
};

refs.form.addEventListener('submit', onSubmitButtonClick);

console.log(refs);

function onSubmitButtonClick(e) {
  e.preventDefault();
  // console.log(refs.firstDelay.value);
  // console.log(refs.delayStep.value);
  // console.log(refs.amount.value);

  for (let i = 1; i <= refs.amount.value; i += 1) {
    console.log(i);
    createPromise(i, refs.firstDelay.value);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    console.log(`Fulfill - position: ${position}, delay: ${delay}`);
  } else {
    // Reject
    console.log(`Reject - position: ${position}, delay: ${delay}`);
  }
}

// function createPromiseTest(e) {
//   e.preventDefault();
//   console.log(refs.firstDelay.value);
// }
