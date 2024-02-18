export {shuntingYard}
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



//SHUNTING YARD

function assert(predicate) {
  if (predicate) return
  throw new Error("Assertion failed due to invalid token")
}

function shuntingYard(expr) {
  const stack = []
  let output = new String()
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
    // if a token is a number, add it to output
    if (!isNaN(parseInt(token))){
        addToOutput(token)
    } 
    // if the token is an operator
    else if (opSymbols.includes(token)){
        const o1 = token
        let o2 = peek()
        // check to see if we should pop existing operators out of the stack before adding this operator
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
        //then push the operator into the stack
        stack.push(o1)
    } 
    // if the token is left paren push to stack
    else if (token === "("){
        stack.push(token)
    } 
    // if the token is right paren, as long as the top of the stack is not left paren and the stack i not empty -- pop the operator from stack and add to output string (things within parentheses take precedent)
    else if (token === ")"){
        let topOfStack = peek()
        while(topOfStack !== "(") {
            assert(stack.length !==0)
            addToOutput(handlePop())
            topOfStack = peek()
        }
        assert(peek()=== "(")
        handlePop()
    } 
    else {
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