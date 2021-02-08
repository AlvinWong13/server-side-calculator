$(document).ready(onReady);

function onReady() {
  //console.log('i am ready');
  $('#equalBtn').on('click', equate);
  $('.calculator').on('click', 'button', buttonInput);
  $('#clearBtn').on('click', clearInputs);
  $('#clearHistory').on('click', clearHistory);
  $('#historyList').on('click', '.previousEquation', rerunInput)
  getHistory();
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
  operator = remainder.substr(0, 1);
  num2 = remainder.substr(1, 20);
  if (dataValue() === false) {
    return false;
  }
  $.ajax({
    method: 'POST',
    url: '/equate',
    data: {
      firstNumber: num1,
      operator: operator,
      secondNumber: num2
    }
  }).then(response => {
    console.log('equation response:', response);
    getHistory();
  })
}// end equate

// check button input
function buttonInput() {
  //console.log('button pressed');
  let input = $(this).text();
  if (input === '=' || input === 'C') {
    return false;
  }
  //console.log(input);
  $('#calcInput').val($('#calcInput').val() + input);
}// end button input

// obtain history from server
function getHistory() {
  //console.log('Get History');
  $.ajax({
    method: 'GET',
    url: '/equate'
  }).then((response) =>{
    console.log('Retrieved history', response);
    appendEquation(response);
    $('#calcInput').val(`${response[response.length - 1].answer}`);
  })
}// response history

// request server remove all previous data
function clearHistory() {
  //console.log('clear history');
  $.ajax({
    method: 'Delete',
    url: '/equate',
    success: (result) => {
      console.log('cleared history');
      appendEquation(result);
      clearInputs();
      $('#recentHistory').text('');
    }
  })
}// end history cleared

// obtain operator
function operatorClicked() {
  console.log('obtain operator');
  operator = $(this).text();
  console.log(operator);
}// end operator

// post past equations to DOM
function appendEquation(data) {
  console.log('Append Equation');
  $('#historyList').empty();
  for ( const equations of data) {
    $('#historyList').append(`
    <li class="previousEquations">
    ${equations.firstNumber}
    ${equations.operator}
    ${equations.secondNumber} 
    = ${equations.answer}
    </li>
    `)
  }
}// end append Equation

// empty previous inputs
function clearInputs() {
  console.log('clear inputs');
  $('#calcInput').val('');
  $('#recentHistory').text('')
}// end clear inputs

//check inputs to have 2 numbers and operator
function dataValue() {
  if(operator == '') {
    $('#recentHistory').text(`Error, enter valid operator`);
    return false;
  }
  if(num1 == '' || num2 == '') {
    $('#recentHistory').text(`Error, input valid numerical calculations`);
    return false;
  }
}// end data value

// allow user to rerun previous equations
function rerunInput() {
  console.log('Previous calculation');
  let previousInput = $(this).text();
  let a = previousInput.indexOf('=');
  let deletedInput = previousInput.slice(x,20);
  let newInput = previousInput.replace(deletedInput, '');
  let finalInput = newInput.replace(/\s/g, ''); //remove global whitespace
  $('#calcInput').val(finalInput);
}// end rerun
