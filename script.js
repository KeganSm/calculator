const displayContainer = document.getElementById('display');
const workingDisplay = document.getElementById('workingDisplay');
const resultDisplay = document.getElementById('resultDisplay');

const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const equalsBtn = document.getElementById('equalsBtn');
const decimalBtn = document.getElementById('decimalBtn');

let displayValue;
let evaluationCounter = 0;
const history = []; //array within which all of the evaluationObjects are stored

// My goal here:
//have buttons populate the display screen
//each time 'equals' is clicked, it creates an object from a string array taken from the display screen
//the object has the keys first operand, second operand, operator, and result
//these objects should provide accessibility to the values, and also allow for a history tab down the line


equalsBtn.addEventListener('click', pressEquals); //equals button

clearBtn.addEventListener('click', ()=>{ //clear button
    workingDisplay.textContent = '';
    resultDisplay.textContent = '';
})
deleteBtn.addEventListener('click', ()=>{ //delete button
    let string = workingDisplay.textContent;
    string = string.substring(0, string.length-1);
    workingDisplay.textContent = string;
})
let btnClick = (e) => { //adds button data-number or data-operator to workingDisplay
    if (!(e.getAttribute('data-operator'))) {
        let numberInput = e.getAttribute('data-number');
        workingDisplay.textContent += numberInput;
    } else if (!(e.getAttribute('data-number'))) {
        let opInput = e.getAttribute('data-operator');
        workingDisplay.textContent += ` ${opInput} `;
    }
}

function pressEquals () { //creates evaluationObject, stores to history array, ...evaluates calculator fxn... 
    createObject();
    console.log(history);
    let a = history[evaluationCounter].firstOperand;
    let b = history[evaluationCounter].secondOperand;
    let operator = history[evaluationCounter].operatorInput;
    resultDisplay.textContent = operate(a,b,operator);
    evaluationCounter++;
}

function createObject () { // creates an object from workingDisplay.textContent -- called by pressEquals()
    const displayArr = workingDisplay.textContent.split(' ');
    const evaluationObject = new Object();
    evaluationObject.firstOperand = displayArr[0];
    evaluationObject.operatorInput = displayArr[1];
    evaluationObject.secondOperand = displayArr[2];
    evaluationObject.result = resultDisplay.textContent;
    history.push(evaluationObject);
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
    } else if (operator === '^') {
        return exponent(a,b);
    }
}

function add (a,b) {
    return parseInt(a) + parseInt(b);
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