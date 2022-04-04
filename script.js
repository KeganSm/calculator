const displayContainer = document.getElementById('display');
const workingDisplay = document.getElementById('workingDisplay');
const resultDisplay = document.getElementById('resultDispaly');
const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const equalsBtn = document.getElementById('equalsBtn');
const decimalBtn = document.getElementById('decimalBtn');
const exponentBtn = document.getElementById('exponentBtn');
const divideBtn = document.getElementById('divideBtn');
const multiplyBtn = document.getElementById('multiplyBtn');
const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');
const zeroBtn = document.getElementById('zero');
const oneBtn = document.getElementById('one');
const twoBtn = document.getElementById('two');
const threeBtn = document.getElementById('three');
const fourBtn = document.getElementById('four');
const fiveBtn = document.getElementById('five');
const sixBtn = document.getElementById('six');
const sevenBtn = document.getElementById('seven');
const eightBtn = document.getElementById('eight');
const nineBtn = document.getElementById('nine');

// My goal here:
//have buttons populate the display screen
//each time 'equals' is clicked, it creates an object from a string array taken from the display screen
//the object has the keys first operand, second operand, operator, and result
//these objects should provide accessibility to the values, and also allow for a history tab down the line

let displayValue;
let firstOperand = '';
let secondOperand = '';
let operatorInput = '';
const history = [];
let objectCounter = 1;

/*
function pressEquals () { //creates evaluationObject, stores to history array, ...evaluates calculator fxn...
    const displayArr = workingDisplay.textContent.split('');
    const evaluationObject = new Object();
    evaluationObject.objectCounter = objectCounter;
    evaluationObject.firstOperand = displayArr[0];
    evaluationObject.operatorInput = displayArr[1];
    evaluationObject.secondOperand = displayArr[2];
    evaluationObject.result = resultDisplay.textContent;
    history.push(evaluationObject);
    objectCounter++;
}
*/
//I am commenting this fxn out until I get the display working

function clearDisplay () {

}

function operate (a,b,operator) { //performs evaluation of calculator inputs
    if (operator === '+') {
        return add(a,b);
    } else if (operator === '-') {
        return subtract(a,b);
    } else if (operator === '*') {
        return multiply(a,b);
    } else if (operator === '/') {
        return divide(a,b);
    } else if (operator === 'n') {
        return exponent(a,b);
    }
}

function add (a,b) {
    return a + b;
}
function subtract (a,b) {
    return a - b;
}
function multiply (a,b) {
    return a * b;
}
function divide (a,b) {
    return a / b;
}
function exponent (a,b) {
    return a ** b;
}