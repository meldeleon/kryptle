import { Tokenizer } from "./tokenizer_regex.js";
export { shuntingYard };

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

// Helper function to throw an error if a condition is not met
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// The main shunting yard algorithm function
function shuntingYard(expression) {
  const stack = [];
  let output = "";
  const operatorSymbols = Object.keys(operators);

  // Helper function to get the top element of the stack
  function peek() {
    return stack.at(-1);
  }

  // Helper function to add a token to the output string
  function addToOutput(token) {
    output += (output ? " " : "") + token;
  }

  // Function to handle each token in the expression
  function handleToken(token) {
    if (!isNaN(parseInt(token))) {
      // If the token is a number, add it to the output
      addToOutput(token);
    } else if (operatorSymbols.includes(token)) {
      // If the token is an operator, handle operator precedence and associativity
      const currentOperator = token;
      let topOperator = peek();
      while (
        topOperator !== undefined &&
        topOperator !== "(" &&
        (operators[topOperator].precedence > operators[currentOperator].precedence ||
          (operators[topOperator].precedence === operators[currentOperator].precedence &&
            operators[currentOperator].associativity === "left"))
      ) {
        addToOutput(stack.pop());
        topOperator = peek();
      }
      stack.push(currentOperator);
    } else if (token === "(") {
      // If the token is a left parenthesis, push it onto the stack
      stack.push(token);
    } else if (token === ")") {
      // If the token is a right parenthesis, pop operators from the stack until a left parenthesis is encountered
      while (peek() !== "(") {
        assert(stack.length !== 0, "Mismatched parentheses");
        addToOutput(stack.pop());
      }
      assert(peek() === "(", "Mismatched parentheses");
      stack.pop();
    } else {
      // If the token is invalid, throw an error
      throw new Error(`Invalid token: ${token}`);
    }
  }

  // Tokenize the expression and process each token
  const tokenizer = new Tokenizer(expression);
  let token;
  while ((token = tokenizer.getNextToken())) {
    handleToken(token.value);
  }

  // Pop any remaining operators from the stack and add them to the output
  while (stack.length !== 0) {
    assert(peek() !== "(", "Mismatched parentheses");
    addToOutput(stack.pop());
  }

  return output;
}
