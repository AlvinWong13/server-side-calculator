const express = require('express');
const bodyParser = require('body-parser');
const PORT = 5000;

const app = express();

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.listen(PORT, () => {
  console.log('Server is listening on port', PORT);
})

let equation = {};
let equationHistory = [];

// get data and start to calculate
app.post('/equate', (req, res) =>{
  equation = req.body;
  console.log(equation);
  solveEquation(equation);
  res.sendStatus(201);
})

// send history
app.get('/equate', (req, res) => {
  console.log('History sent');
  equationHistory = [];
  res.send(equationHistory);
})

// delete history
app.delete('/equate', (req, res) => {
  console.log('delete history');
  equationHistory = [];
  res.send(equationHistory);
})

// take in data and run the equation. 
// compile answer from the equation and push into history
function solveEquation(data) {
  let firstNum = +(data.firstNumber);
  let secondNum = +(data.secondNumber);
  let mathOperation = data.operator;
  let answer = 0;
  if(mathOperator === '+') {
    answer = firstNum + secondNum;
  } else if (mathOperator === '-') {
    answer = firstNum = secondNum;
  } else if (mathOperator === '*') {
    answer = firstNum * secondNum;
  } else if (mathOperator === '/') {
    answer = firstNum / secondNum;
  }
  console.log(answer);
  equation.answer = answer;
  equationHistory.push(equation);
}