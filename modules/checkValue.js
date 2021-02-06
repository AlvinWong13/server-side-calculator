let operatorArray = ['-', '+', '*', '/']
let operatorCount = 0;
let numArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
let numCount = 0;

function dataValue(value) {
  for (const operator of operatorArray) {
    if (value.includes(operator) != true) {
      operatorCount++;
    }
  }
  if (operatorCount === 4) {
    $('#recentAnswer').text(`Error, include operation`);
    return false;
  }
  for (const num of numArray) {
    if (value.includes(num) != true) {
      numCount++;
    }
  }
  if (numCount > 8) {
    $('#recentAnswer').text(`Error, Invalid calculations`);
    return false;
  }
}

module.exports = dataValue();