export {reversePolishNotation}
//RPN
const operators = {
    "^": {
      prec: 4,
      assoc: "right",
    },
    "*": {
      prec: 3,
      assoc: "left",
    },
    "/": {
      prec: 3,
      assoc: "left",
    },
    "+": {
      prec: 2,
      assoc: "left",
    },
    "-": {
      prec: 2,
      assoc: "left",
    },
  }


function reversePolishNotation(expr) {
  let expressionArr = expr.trim().split(" ")
  let stack = []
  const opSymbols = Object.keys(operators)
  for (let i = 0; i < expressionArr.length; i++) {
    let currentSymbol = expressionArr[i]
    //check if number
    if (!isNaN(parseInt(currentSymbol))) {
      stack.push(parseInt(currentSymbol))
    } else if (opSymbols.includes(currentSymbol)) {
      let y = stack.pop()
      let x = stack.pop()
      stack.push(maths(x, y, currentSymbol))
    } else if (currentSymbol === "") {
    } else {
      console.error(`${currentSymbol} is not a valid symbol`)
    }
  }
  if (stack.length === 1) {
    return stack[0]
  } else {
    console.error(`${expr} is not a valid RPN expression`)
  }
}

function maths(x, y, operand) {
  switch (operand) {
    case "+":
      return x + y
      break
    case "-":
      return x - y
      break
    case "/":
      return x / y
      break
    case "*":
      return x * y
      break
    case "^":
    case "**":
      return x ** y
      break
    default:
      console.error(`${operand} is not a valid operator`)
  }
}