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
  let exprArr = expr.split(" ")
  let stack = []
  let output = ""
  for (let i = 0; i < exprArr.length; i++) {
    let currentSymbol = exprArr[i]
    if (isInt(currentSymbol)) {
      output.concat(currentSymbol)
    } else if (validOperator) {
    }
  }
}

function isInt(x) {
  return !isNaN(parseInt(x))
}

function isValidOperator(x) {
  const operators = ["+", "-", "*", "/", "^"]
}
