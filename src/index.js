
// Recognition
let recognition;
let recognizing = false;
let final_transcript = "";
let input = 0;

let elems = [].slice.call(document.querySelectorAll('.field'));


if (!("webkitSpeechRecognition" in window)) {
  alert("You need to use Chrome or Safari browser");
} else {
  console.log("API soportada");
  recognition = new webkitSpeechRecognition();
  recognition.lang = "es-ES";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onstart = function () {
    // recognizing = true;
    console.log(recognizing);
    console.log("listening...");
  };

  recognition.onresult = function (event) {
    final_transcript = event.results[0][0].transcript;
    console.log('You said: ', final_transcript);
    return final_transcript;
  };

  recognition.onerror = function (event) {
    if (event.error == 'no-speech') {
      console.log("You're no speaking ;)");
    }
    recognition.stop();
  };

  recognition.onsoundend = function () {
    console.log('Sound has stopped being received');
    recognizing = false;
    printText(final_transcript);
    final_transcript = '';
    goNextInput();
  }

  recognition.onend = function () {
    recognizing = false;
    console.log('Speech recognition service disconnected');
  };
}

function whichInput() {
  elems.forEach(function (el, i, array) {
    if (el.hasFocus) {
      console.log(i);
      input = i;
    }
  });
  console.log('input is', input);
  return input;
}

function goNextInput() {
  input++;
  if (input < elems.length) {
    elems[input].focus();
    console.log(elems[input]);
    console.log('listening again');
    recognition.start();
  }
}

function printText(text) {
  let input = whichInput();
  elems[input].value = text;
  event.preventDefault();
  console.log(text);
}

function startButton(event) {
  event.preventDefault();
  console.log("start button clicked");
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.start();
}


// -------------------------------

// start rotate animation

let cvv = document.querySelector("input[data-id='cvv']");
let card = document.querySelector(".card");

cvv.addEventListener("focus", function () {
  card.classList.add("inversed");
});

cvv.addEventListener("blur", function () {
  card.classList.remove("inversed");
});
// end rotate animation

// initializing data-binding

// name binding
const name = document.querySelector("input.name");

const labelName = document.querySelector(".label.name");

name.addEventListener("onchange", e => {
  labelName.innerHTML = final_transcrip;
  if (!e.target.value) {
    labelName.innerHTML = "Ada Lovelace Byron";
  }
});
// end name binding

// number binding
const number = document.querySelector("input.number");

const labelNumber = document.querySelector(".label.number");

number.addEventListener("onchange", e => {
  labelNumber.innerHTML = e.target.value;
  if (e.target.value[0] === 4) {
    card.classList.add("visa");
  } else if (e.target.value[0] === 5) {
    card.classList.add("mastercard");
  }
  if (e.target.value === "") {
    labelNumber.innerHTML = "0000 0000 0000 0000";
    card.classList.remove("mastercard");
    // card.classList.remove("visa");
  }
});
// end number binding

// date binding
const date = document.querySelector("input.date");

const labelDate = document.querySelector(".label.date");

date.addEventListener("onchange", e => {
  labelDate.innerHTML = e.target.value;
  if (!e.target.value) {
    labelDate.innerHTML = "09/23";
  }
});
// end date binding

// number cvv

const labelCvv = document.querySelector("span.cvv");

cvv.addEventListener("onchange", e => {
  labelCvv.innerHTML = e.target.value;
  if (!e.target.value) {
    labelCvv.innerHTML = "999";
  }
});
// end cvv binding
