const displayContainer = document.getElementById('display');
const workingDisplay = document.getElementById('workingDisplay');
const resultDisplay = document.getElementById('resultDisplay');
const historyDiv = document.getElementById('historyDiv');
const leftSide = document.getElementById('leftSide');

const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const equalsBtn = document.getElementById('equalsBtn');
const decimalBtn = document.getElementById('decimalBtn');
const plusMinusBtn = document.getElementById('plusMinus');

let evaluationCounter = 0;
let decimalCheck = false; //used to allow decimals after the operator
let equalsCheck = true; //prevents equals button from being hit more than once in a row
const history = []; //array within which all of the evaluationObjects are stored

document.addEventListener('keydown', (e)=>{ //keyboard support
    if (e.key === '+' || e.key === '-' || 
        e.key === '*' || e.key === '/' || 
        e.key === '^') {
            tempElement = document.createElement('div');
            tempElement.setAttribute('data-operator', `${e.key}`);
            operatorClick(tempElement);
            tempElement.remove();
    } else if (e.key === '0' || e.key === '1' || 
               e.key === '2' || e.key === '3' || 
               e.key === '4' || e.key === '5' || 
               e.key === '6' || e.key === '7' || 
               e.key === '8' || e.key === '9') {
                tempElement = document.createElement('div');
                tempElement.setAttribute('data-number', `${e.key}`);
                numberClick(tempElement);
                tempElement.remove();
    } else if (e.key === '=' || e.key === 'Enter') {
        equalsBtnClick();
    } else if (e.key === '.') {
        decimalBtnClick();
    } else if (e.key === 'Backspace') {
        deleteBtnClick();
    }
})

//button functions were consolidated into global functions to make keyboard support more readable
equalsBtn.addEventListener('click', equalsBtnClick);
clearBtn.addEventListener('click', clearBtnClick);
clearBtn.addEventListener('dblclick', ()=>{ //double-clicking clearBtn clears the history
    leftSide.innerHTML = '';
})
deleteBtn.addEventListener('click', deleteBtnClick);
decimalBtn.addEventListener('click', decimalBtnClick);

let btnClick = (e) => { //adds button data-number or data-operator to workingDisplay
    equalsCheck = true;
    if (!(e.getAttribute('data-operator'))) {
        numberClick(e);
    } else if (!(e.getAttribute('data-number'))) {
        operatorClick(e);
        }
}

function clearBtnClick () {
    workingDisplay.textContent = '';
    resultDisplay.textContent = '';
    equalsCheck = true;
}

function equalsBtnClick () {
    if (equalsCheck === false) { // prevents equivalent history object from being displayed if '=' is pressed multiple times
        return;
    } else if (equalsCheck === true) {
        pressEquals();
        calcHistory = document.createElement('div');
        calcHistory.classList.add('calcHistory');
        calcHistory.textContent = `${history[evaluationCounter-1].firstOperand} 
                                ${history[evaluationCounter-1].operatorInput} 
                                ${history[evaluationCounter-1].secondOperand} = 
                                ${resultDisplay.textContent}`;
        leftSide.appendChild(calcHistory);
        equalsCheck = false;
    }
}

function deleteBtnClick () {
    let string = workingDisplay.textContent;
    string = string.substring(0, string.length-1);
    workingDisplay.textContent = string;
    equalsCheck = true;
}

function decimalBtnClick () {
    if (workingDisplay.textContent.includes('.')) {
        if (decimalCheck === true) { //checks if there is a decimal before the operator, allowing for a decimal after the operator
            workingDisplay.textContent += '.';
            decimalCheck = false;
        }
         return;
     } 
     workingDisplay.textContent += '.';
}

function operatorClick (e) {
    let opInput = e.getAttribute('data-operator');
        if (workingDisplay.textContent.includes('.')) {
            decimalCheck = true; //if there is a decimal before the operator, allows for second decimal point
        }
        if (workingDisplay.textContent.includes('+') || workingDisplay.textContent.includes('-') || //allows for multiple operators
            workingDisplay.textContent.includes('*') || workingDisplay.textContent.includes('/') || 
            workingDisplay.textContent.includes('^')) {
                pressEquals();
                workingDisplay.textContent = `${resultDisplay.textContent} ${opInput} `;
            } else {
                workingDisplay.textContent += ` ${opInput} `;
            }
}

function numberClick (e) {
    let numberInput = e.getAttribute('data-number');
    workingDisplay.textContent += numberInput;
}

function pressEquals () { //creates evaluationObject, stores to history array, evaluates calculator fxn
    createObject();
    if (history[evaluationCounter].firstOperand === '' || 
        history[evaluationCounter].secondOperand === '') { //prevents weird values stemming from pressing =
        clearBtnClick();
    }
    let a = history[evaluationCounter].firstOperand;
    let b = history[evaluationCounter].secondOperand;
    let operator = history[evaluationCounter].operatorInput;
    resultDisplay.textContent = operate(a,b,operator);
    history[evaluationCounter].result = resultDisplay.textContent;
    if (resultDisplay.textContent === 'NaN' || 
        resultDisplay.textContent === 'undefined' ||
        a === '' || b === '') {
            if (alert('Please enter a valid expression!')) { //reloads page if expression input sucks
            } else {
                window.location.reload();
            }
    }
    evaluationCounter++;
}

function createObject () { // creates an object from workingDisplay.textContent -- called by pressEquals()
    const displayArr = workingDisplay.textContent.split(' '); //creates array from workingDisplay string
    const evaluationObject = new Object();
    evaluationObject.firstOperand = displayArr[0];
    evaluationObject.operatorInput = displayArr[1];
    evaluationObject.secondOperand = displayArr[2];
    history.push(evaluationObject);
}

function operate (a,b,operator) { //performs evaluation of calculator inputs
    if (operator === '+') {
        return parseFloat(a) + parseFloat(b);
    } else if (operator === '-') {
        return a - b;
    } else if (operator === '*') {
        return Number((a * b).toFixed(9));
    } else if (operator === '/') {
        return Number((a / b).toFixed(9));
    } else if (operator === '^') {
        return a ** b;
    }
}