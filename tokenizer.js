const input = "10 + 20ε"

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

const tokenize = (expr) => {
  //if end epsilon does not exist add
  if (expr.charAt(-1) !== "ε") {
    expr += "ε"
  }
  let buffer = ""
  let tokens = []
  let opSymbols = Object.keys(operators)
  const cycleBuffer = () => {
    if (buffer.length > 0) {
      tokens.push(buffer)
      buffer = ""
    }
  }
  for (let char of expr) {
    if (!isNaN(parseInt(char))) {
      buffer += char
    } else if (opSymbols.includes(char)) {
      cycleBuffer()
      buffer += char
    } else if (char === " ") {
      cycleBuffer()
    } else if (char === "ε") {
      cycleBuffer()
      return tokens
    } else {
      console.error(`${char} is not a recognized character.`)
    }
  }
}

console.log(tokenize(input))
