const displayContainer = document.getElementById('display');
const workingDisplay = document.getElementById('workingDisplay');
const resultDisplay = document.getElementById('resultDisplay');

const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const equalsBtn = document.getElementById('equalsBtn');
const decimalBtn = document.getElementById('decimalBtn');
const plusMinusBtn = document.getElementById('plusMinus');

let multipleOperator;
let evaluationCounter = 0;
const history = []; //array within which all of the evaluationObjects are stored


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

/*
plusMinusBtn.addEventListener('click', ()=>{
    if                                          //...working on the +/-...
})
*/

let btnClick = (e) => { //adds button data-number or data-operator to workingDisplay
    if (!(e.getAttribute('data-operator'))) {
        let numberInput = e.getAttribute('data-number');
        workingDisplay.textContent += numberInput;
    } else if (!(e.getAttribute('data-number'))) {
        let opInput = e.getAttribute('data-operator');
        if (workingDisplay.textContent.includes('+') || workingDisplay.textContent.includes('-') || //allows for multiple operators
            workingDisplay.textContent.includes('*') || workingDisplay.textContent.includes('/') || 
            workingDisplay.textContent.includes('^')) {
                createObject(); // I couldnt figure out a way to condense this to pressEquals() and store it to multipleOperator
                let a = history[evaluationCounter].firstOperand;
                let b = history[evaluationCounter].secondOperand;
                let operator = history[evaluationCounter].operatorInput;
                multipleOperator = operate(a,b,operator);
                resultDisplay.textContent = multipleOperator;
                history[evaluationCounter].result = resultDisplay.textContent;
                console.log(history);
                workingDisplay.textContent = `${multipleOperator} ${opInput} `;
                evaluationCounter++;
            } else {
                workingDisplay.textContent += ` ${opInput} `;
            }
        }
}

function pressEquals () { //creates evaluationObject, stores to history array, ...evaluates calculator fxn... 
    createObject();
    let a = history[evaluationCounter].firstOperand;
    let b = history[evaluationCounter].secondOperand;
    let operator = history[evaluationCounter].operatorInput;
    resultDisplay.textContent = operate(a,b,operator);
    history[evaluationCounter].result = resultDisplay.textContent;
    console.log(history);
    evaluationCounter++;
}

function evalMultipleOperators () {

}

function createObject () { // creates an object from workingDisplay.textContent -- called by pressEquals()
    const displayArr = workingDisplay.textContent.split(' '); //creates array from string
    const evaluationObject = new Object();
    evaluationObject.firstOperand = displayArr[0];
    evaluationObject.operatorInput = displayArr[1];
    evaluationObject.secondOperand = displayArr[2];
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