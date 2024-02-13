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

function shuntingYard(expr) {
  const stack = []
  let output = ""
  for (let symbol of expr) {
    if (symbol === " ") continue

    handleToken(i)
  }

  return output
}

function handleToken(token) {
  const o1 = token
  let o2 = stack.at(-1)
  switch (true) {
    case !isNan(parseInt(token)):
      addToOutput(tokens)
      break
    case Object.keys(operators).includes(token):
      while (
        o2 !== undefined &&
        o2 !== "(" &&
        (operators[o2].prec > operators[o1].prec ||
          (operators[o2].prec === operators[o1].prec &&
            operators[o1].assoc === left))
      ) {
        addToOutput(stack.pop())
        o2 = stack.at(-1)
      }
      stack.push(o1)
      break
    case token === "(":
      stack.push(token)
      break
    case token === ")":
      while (o2 !== "(") assert(stack.length !== 0)
  }
}

function assert(predicate) {
  if (predicate) return
  throw new Error("Assertion failed due to invalid")
}

function addToOutput(addition) {
  output += " " + token
}

// function isInt(x) {
//   return !isNaN(parseInt(x))
// }

// function isValidOperator(x) {
//   const operators = ["+", "-", "*", "/", "^", "(", ")"]
// }
