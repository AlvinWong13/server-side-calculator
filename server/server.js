const express = require('express');
const bodyParser = require('body-parser');
const PORT = 5000;

const app = express();

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.listen(PORT, () => {
  console.log('Server is listening on port', PORT);
})

let equationHistory = [];
let equation = {};

// get data and start to calculate
app.post('/equate', (req, res) =>{
  equation = req.body;
  console.log(equation);
  solveEquation(equation);
  res.sendStatus(200);
})

// send history
app.get('/equate', (req, res) => {
  console.log('History sent');
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
  if(mathOperation === '+') {
    answer = firstNum + secondNum;
  } else if (mathOperation === '-') {
    answer = firstNum = secondNum;
  } else if (mathOperation === '*') {
    answer = firstNum * secondNum;
  } else if (mathOperation === '/') {
    answer = firstNum / secondNum;
  }
  console.log(answer);
  equation.answer = answer;
  equationHistory.push(equation);
}