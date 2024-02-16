const TokenTypes = {
  NUMBER: "NUMBER",
  ADDITION: "+",
  SUBTRACTION: "-",
  MULTIPLICATION: "*",
  DIVISION: "/",
  EXPONENTIATION: "^",
  PARENTHESIS_LEFT: "(",
  PARENTHESIS_RIGHT: ")",
}

const TokenSpec = [
  [/^\s+/, null],
  [/^\d+/, TokenTypes.NUMBER],
  [/^\+/, TokenTypes.ADDITION],
  [/^\-/, TokenTypes.SUBTRACTION],
  [/^\*/, TokenTypes.MULTIPLICATION],
  [/^\//, TokenTypes.DIVISION],
]
