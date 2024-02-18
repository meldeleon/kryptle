export { Tokenizer };

// Define the types of tokens that can be recognized
const TokenTypes = {
  NUMBER: "NUMBER",
  ADDITION: "+",
  SUBTRACTION: "-",
  MULTIPLICATION: "*",
  DIVISION: "/",
  EXPONENTIATION: "^",
  PARENTHESIS_LEFT: "(",
  PARENTHESIS_RIGHT: ")",
};

// Define the regular expressions for each token type
const TokenSpec = [
  [/^\s+/, null], // Whitespace (ignored)
  [/^\d+/, TokenTypes.NUMBER], // Number
  [/^\+/, TokenTypes.ADDITION], // Addition
  [/^\-/, TokenTypes.SUBTRACTION], // Subtraction
  [/^\*/, TokenTypes.MULTIPLICATION], // Multiplication
  [/^\//, TokenTypes.DIVISION], // Division
  [/^\^/, TokenTypes.EXPONENTIATION], // Exponentiation
  [/^\(/, TokenTypes.PARENTHESIS_LEFT], // Left parenthesis
  [/^\)/, TokenTypes.PARENTHESIS_RIGHT], // Right parenthesis
];

// Tokenizer class to convert an input string into tokens
class Tokenizer {
  constructor(input) {
    this.input = input;
    this.cursor = 0;
  }

  // Check if there are more tokens to process
  hasMoreTokens() {
    return this.cursor < this.input.length;
  }

  // Match a token using a regular expression
  match(regex, exprChunk) {
    const matched = regex.exec(exprChunk);
    if (matched === null) return null;

    this.cursor += matched[0].length;
    return matched[0];
  }

  // Get the next token from the input
  getNextToken() {
    if (!this.hasMoreTokens()) return null;

    const exprChunk = this.input.slice(this.cursor);

    for (const [regex, type] of TokenSpec) {
      const tokenValue = this.match(regex, exprChunk);

      // Skip if no match or if it's whitespace
      if (tokenValue === null || type === null) {
        continue;
      }

      return {
        type,
        value: tokenValue,
      };
    }

    throw new SyntaxError(`Unexpected token: ${exprChunk[0]}`);
  }
}

// Helper function to return all tokens from an input string
function returnTokens(input) {
  const tokenizer = new Tokenizer(input);
  let tokenArr = [];
  let token;
  while ((token = tokenizer.getNextToken())) {
    tokenArr.push(token);
  }
  return tokenArr;
}
