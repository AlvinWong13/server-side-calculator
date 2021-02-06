$(document).ready(onReady);

function onReady() {
  console.log('i am ready');
  $('#equalBtn').on('click', equate);
}

let calcInput = $('#calcInput').val();
let num1 = 0;
let num2 = 0;
let operator = '';

// send data to server for processing input values
function equate() {
  console.log('equate function');
  calcInput = $('#calcInput').val();
  num1 = parseFloat($('#calcInput').val());
  let stringOfNumbers = num1.toString()
  let remainder = calcInput.slice(stringOfNumbers.length, 20);
  console.log(remainder);
  operator = leftover.substr(0, 1);
  num2 = leftover.substr(1, 20);
  if (dataValue() === false) {
    return false;
  }
  $.ajax({
    method: 'POST'
    url: '/equate',
    data: {
      firstNumber: num1,
      secondNumber: num2,
      operator: operator
    }
  }).then(response => {
    console.log('equation response:', response);

  })
}// end equate

// obtain history from server

// request server remove all previous data

// obtain operator

// post past equations to DOM

// empty previous inputs

// check there are 2 inputs and an operator

// allow user to rerun previous equations
