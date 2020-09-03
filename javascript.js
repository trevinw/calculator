let displayArea = document.getElementById("display");
let numberButtons = document.querySelectorAll(".number-button");
let operationButtons = document.querySelectorAll(".operation-button");
let clearButton = document.getElementById("clear-button");
let zeroButton = document.getElementById("zero-button");
clearButton.addEventListener("click", function() {
    clearButtonPress();
});
let equalsButton = document.getElementById("equals-button");
equalsButton.addEventListener("click", function() {
    equalsButtonPress();
});
let decimalButton = document.getElementById("decimal-button");
decimalButton.addEventListener("click", function() {
    decimalButtonPress();
});
let backspaceButton = document.getElementById("backspace-button");
backspaceButton.addEventListener("click", function() {
    backspaceButtonPress();
});

let enteredNum1 = null;
let enteredNum2 = null;
let enteredOp1 = null;

function add(num1, num2) {
    displayArea.textContent = (+num1 + +num2);
}
function subtract(num1, num2) {
    displayArea.textContent = (+num1 - +num2);
}
function multiply(num1, num2) {
    displayArea.textContent = (+num1 * +num2);
}
function divide(num1, num2) {
    if (+num2 != 0) {
        displayArea.textContent = (+num1 / +num2);
    } else {
        displayArea.textContent = "Cannot divide by zero!";
    }
}

function operate() {
    if (enteredOp1 == "+") {
        add(enteredNum1, enteredNum2);
    } else if (enteredOp1 == "-") {
        subtract(enteredNum1, enteredNum2);
    } else if (enteredOp1 == "*") {
        multiply(enteredNum1, enteredNum2);
    } else if (enteredOp1 == "/") {
        divide(enteredNum1, enteredNum2);
    }
}

function setDisplayText(symbol) {
    displayArea.textContent = symbol;
}

function updateDisplayText(symbol) {
    clearDisplay();
    displayArea.textContent = displayArea.textContent + symbol;
}

numberButtons.forEach(button => button.addEventListener("click", function() {
    inputNumbers(this);
}));

operationButtons.forEach(button => button.addEventListener("click", function() {
    inputOperations(this);
}));

function inputOperations(button) {
    unDisableDecimal();
    if (button.textContent == "/") {
        zeroButton.disabled = true;
    }
    if (enteredNum1 != null && enteredNum2 != null && enteredOp1 != null) {
        operate();
        enteredOp1 = button.textContent;
        enteredNum1 = displayArea.textContent;
        enteredNum2 = null;
    }
    if(enteredNum1 != null && enteredNum2 == null) {
        enteredOp1 = button.textContent;
    }
}

function inputNumbers(button) {
    unDisableZero();
    if ((enteredNum1 != null && enteredNum1.length >= 17 && enteredOp1 == null) ||
    (enteredNum2 != null && enteredNum2.length >= 17 && enteredOp1 != null)) {
        return;
    }
    if (enteredNum1 == null && enteredNum2 == null && enteredOp1 == null) {
        enteredNum1 = button.textContent;
        updateDisplayText(enteredNum1);
        return;
    }

    if (enteredNum1 != null && enteredNum2 == null && enteredOp1 == null) {
        enteredNum1 += button.textContent;
        updateDisplayText(enteredNum1);
        return;
    }

    if (enteredNum1 != null && enteredNum2 == null && enteredOp1 != null) {
        enteredNum2 = button.textContent;
        updateDisplayText(enteredNum2);
        return;
    }

    if (enteredNum1 != null && enteredNum2 != null && enteredOp1 != null) {
        enteredNum2 += button.textContent;
        updateDisplayText(enteredNum2);
        return;
    }
}

function clearDisplay() {
    displayArea.textContent = "";
}

function clearButtonPress() {
    clearDisplay();
    enteredNum1 = null;
    enteredNum2 = null;
    enteredOp1 = null;
}

function equalsButtonPress() {
    if (enteredNum1 != null && enteredNum2 != null && enteredOp1 != null) {
        operate();
        enteredNum1 = displayArea.textContent;
        enteredNum2 = null;
        enteredOp1 = null;
    }
}

function decimalButtonPress() {
    if (!enteredNum1.includes(".")) {
        if (enteredNum1 != null && enteredNum2 == null && enteredOp1 == null) {
            enteredNum1 += decimalButton.textContent;
            decimalButton.disabled = true;
            return;
        }
    }
    if (!enteredNum2.includes(".")) {
        if (enteredNum1 != null && enteredNum2 != null && enteredOp1 != null) {
            enteredNum2 += decimalButton.textContent;
            decimalButton.disabled = true;
            return;
        }
    }
}

function unDisableDecimal() {
    decimalButton.disabled = false;
}

function unDisableZero() {
    zeroButton.disabled = false;
}

function backspaceButtonPress() {
    if (enteredNum1 != null && enteredNum2 == null && enteredOp1 == null) {
        enteredNum1 = enteredNum1.slice(0, -1);
        updateDisplayText(enteredNum1);
    }

    if (enteredNum1 != null && enteredNum2 != null && enteredOp1 != null) {
        enteredNum2 = enteredNum2.slice(0, -1);
        updateDisplayText(enteredNum2);
    }
}