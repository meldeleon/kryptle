export { reversePolishNotation };

// Define the operators with their precedence and associativity
const operators = {
  "^": {
    precedence: 4,
    associativity: "right",
  },
  "*": {
    precedence: 3,
    associativity: "left",
  },
  "/": {
    precedence: 3,
    associativity: "left",
  },
  "+": {
    precedence: 2,
    associativity: "left",
  },
  "-": {
    precedence: 2,
    associativity: "left",
  },
};

/**
 * Evaluates an expression written in reverse Polish notation (RPN).
 * @param {string} expr The RPN expression as a string.
 * @returns {number} The result of the expression.
 */
function reversePolishNotation(expr) {
  let expressionArr = expr.trim().split(" ");
  let stack = [];
  const opSymbols = Object.keys(operators);

  expressionArr.forEach((currentSymbol) => {
    if (!isNaN(parseInt(currentSymbol))) {
      // If the current symbol is a number, push it to the stack
      stack.push(parseInt(currentSymbol));
    } else if (opSymbols.includes(currentSymbol)) {
      // If the current symbol is an operator, pop two numbers from the stack,
      // perform the operation, and push the result back onto the stack
      let y = stack.pop();
      let x = stack.pop();
      if (x === undefined || y === undefined) {
        console.error("Insufficient values in the expression.");
        return;
      }
      stack.push(performOperation(x, y, currentSymbol));
    } else if (currentSymbol !== "") {
      // If the symbol is not recognized, log an error
      console.error(`${currentSymbol} is not a valid symbol`);
    }
  });

  if (stack.length === 1) {
    return stack[0];
  } else {
    console.error(`${expr} is not a valid RPN expression`);
  }
}

/**
 * Performs the mathematical operation indicated by the operand on two numbers.
 * @param {number} x The first number.
 * @param {number} y The second number.
 * @param {string} operand The operator symbol.
 * @returns {number} The result of the operation.
 */
function performOperation(x, y, operand) {
  switch (operand) {
    case "+":
      return x + y;
    case "-":
      return x - y;
    case "/":
      return x / y;
    case "*":
      return x * y;
    case "^":
      return Math.pow(x, y);
    default:
      console.error(`${operand} is not a valid operator`);
      return 0; // Return 0 for unrecognized operators
  }
}
