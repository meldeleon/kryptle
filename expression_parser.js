let test = "1*5+3^2"

let result = reversePolishNotation(shuntingYard(test))
console.log(result)

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

//RPN
function reversePolishNotation(expr) {
  let expressionArr = expr.split(" ")
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

//SHUNTING YARD

function assert(predicate) {
  if (predicate) return
  throw new Error("Assertion failed due to invalid token")
}

function shuntingYard(expr) {
  const stack = []
  let output = ""
  const opSymbols = Object.keys(operators)
  //helper functions
  //returns top of stack
  function peek() {
    return stack.at(-1)
  }

  function addToOutput(token) {
    output += " " + token
  }

  function handlePop() {
    return stack.pop()
  }

  function handleToken(token) {
    switch (true) {
      // if it is a number, add it to output
      case !isNaN(parseInt(token)):
        addToOutput(token)
        break

      case opSymbols.includes(token):
        const o1 = token
        let o2 = peek()

        while (
          o2 !== undefined &&
          o2 !== "(" &&
          (operators[o2].prec > operators[o1].prec ||
            (operators[o2].prec === operators[o1].prec &&
              operators[o1].assoc === "left"))
        ) {
          addToOutput(handlePop())
          o2 = peek()
        }
        stack.push(o1)
        break
      case token === "(":
        stack.push(token)
        break
      case token === ")":
        let topOfStack = peek()
        while (topOfStack !== "(") {
          assert(stack.length !== 0)
          addToOutput(handlePop())
          topOfStack = peek()
        }
        assert(peek() === "(")
        handlePop()
        break
      default:
        throw new Error(`Invalid token: ${token}`)
    }
  }
  for (let i of expr) {
    if (i === " ") continue

    handleToken(i)
  }

  while (stack.length !== 0) {
    assert(peek() !== "(")
    addToOutput(stack.pop())
  }

  return output
}
