const displayContainer = document.getElementById('display');
const workingDisplay = document.getElementById('workingDisplay');
const resultDisplay = document.getElementById('resultDisplay');

const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const equalsBtn = document.getElementById('equalsBtn');
const decimalBtn = document.getElementById('decimalBtn');
const plusMinusBtn = document.getElementById('plusMinus');

let evaluationCounter = 0;
let decimalCheck = false; //used to allow decimals after the operator
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

decimalBtn.addEventListener('click', ()=>{ //decimal button
    if (workingDisplay.textContent.includes('.')) {
       if (decimalCheck === true) { //checks if there is a decimal before the operator, allowing for a decimal after the operator
           workingDisplay.textContent += '.';
           decimalCheck = false;
       }
        return;
    } 
    workingDisplay.textContent += '.';
})

plusMinusBtn.addEventListener('click', ()=>{
                                        //...working on the +/-...
})


let btnClick = (e) => { //adds button data-number or data-operator to workingDisplay
    if (!(e.getAttribute('data-operator'))) {
        let numberInput = e.getAttribute('data-number');
        workingDisplay.textContent += numberInput;
    } else if (!(e.getAttribute('data-number'))) {
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
}

function pressEquals () { //creates evaluationObject, stores to history array, ...evaluates calculator fxn... 
    createObject();
    if (history[evaluationCounter].firstOperand === '' || 
        history[evaluationCounter].secondOperand === '') { //prevents weird values stemming from pressing =
        return resultDisplay.textContent = '';
    }
    let a = history[evaluationCounter].firstOperand;
    let b = history[evaluationCounter].secondOperand;
    let operator = history[evaluationCounter].operatorInput;
    resultDisplay.textContent = operate(a,b,operator);
    history[evaluationCounter].result = resultDisplay.textContent;
    console.log(history);
    evaluationCounter++;
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
        return parseFloat(a) + parseFloat(b);
    } else if (operator === '-') {
        return a - b;
    } else if (operator === '*') {
        return a * b;
    } else if (operator === '/') {
        return a / b;
    } else if (operator === '^') {
        return a ** b;
    }
}