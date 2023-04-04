const numberButtons = document.querySelectorAll(".numberButton") as NodeListOf<HTMLButtonElement>;
const operButtons = document.querySelectorAll(".operButton") as NodeListOf<HTMLButtonElement>;
const restButton = document.querySelector(".resetButton") as HTMLButtonElement
const correctButton = document.querySelector(".correctButton") as HTMLButtonElement
const equalButton = document.querySelector(".equalButton") as HTMLButtonElement
const firsInputTag = document.querySelector(".firstInput") as HTMLSpanElement
const secondInputTag = document.querySelector(".secondInput") as HTMLSpanElement

let firstInputState = ""
let secondInputState: any = ""
let operationState: string | undefined = ""

function Reset() {
  firstInputState = ""
  secondInputState = ""
  operationState = undefined
}
function Correct() {
  secondInputState = secondInputState.toString().slice(0, -1)
}
function InputNumberButton(number: number | string) {
  if (typeof secondInputState === "undefined") {
    secondInputState = "";
  }
  if (number === "." && secondInputState.includes(".")) return
  secondInputState = secondInputState.toString() + number.toString()
}
function SelectOperation(operation: string) {
  if (secondInputState === "") return
  if (firstInputState !== "") {
    CalProcess()
  }
  operationState = operation;
  firstInputState = secondInputState;
  secondInputState = ""
}

function CalProcess(): number | undefined {
  let result
  let num1 = parseFloat(firstInputState)
  let num2 = typeof secondInputState === 'string' ? parseFloat(secondInputState) : NaN;
  if (isNaN(num1) || isNaN(num2)) return
  switch (operationState) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "X":
      result = num1 * num2;
      break;
    case "÷":
      result = num1 / num2;
      break;
    case "x^n":
      result = Math.pow(num1, num2);
      break;
    case "%":
      result = (num1 / 100) * num2;
      break;
    default:
      return
  }
  secondInputState = result;
  operationState = undefined;
  firstInputState = "";
}


function getResultNumber(number: number | string) {
  if (typeof number === "number") {
    return number.toLocaleString('en', {
      maximumFractionDigits: 10
    })
  }
  const stringNumber = number.toString()
  const intergerNumber = stringNumber.includes(".") ? parseFloat(stringNumber.split('.')[0]) : parseInt(stringNumber);
  const decimalNumber = stringNumber.includes(".") ? stringNumber.split('.')[1] : null;
  let integerDisplay
  if (isNaN(intergerNumber)) {
    integerDisplay = ""
  } else {
    integerDisplay = intergerNumber.toLocaleString('en', {
      maximumFractionDigits: 0
    })
  }
  if (decimalNumber !== null) {
    return `${integerDisplay}.${decimalNumber}`
  } else {
    return integerDisplay
  }
}
function updateState() {
  secondInputTag.innerText = getResultNumber(secondInputState)
  if (operationState !== undefined) {
    firsInputTag.innerText = `${getResultNumber(firstInputState)} ${operationState}`
  }
  else {
    firsInputTag.innerText = ''
  }
}


numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent ?? "";
    InputNumberButton(buttonText)
    updateState()
    console.log(button.textContent)
  })
})

operButtons.forEach(button => {
  button.addEventListener('click', () => {
    SelectOperation(button.innerText)
    updateState()
    console.log(button.textContent)
  })
})

equalButton.addEventListener('click', button => {
  CalProcess()
  updateState()
})

restButton.addEventListener('click', button => {
  Reset()
  updateState()
})

correctButton.addEventListener('click', button => {
  Correct()
  updateState()
})
