let butts = "1 2 4 2 / 2 3 ^ ^ * + 1 -"
const tokens = ["+", "-", "*", "/", "^"]

console.log(reversePolishNotation(butts))

export function reversePolishNotation(expr) {
  let expressionArr = expr.split(" ")
  let stack = []
  for (let i = 0; i < expressionArr.length; i++) {
    let currentSymbol = expressionArr[i]
    //check if number
    if (!isNaN(parseInt(currentSymbol))) {
      stack.push(parseInt(currentSymbol))
    } else if (tokens.includes(currentSymbol)) {
      let y = stack.pop()
      let x = stack.pop()
      stack.push(maths(x, y, currentSymbol))
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
