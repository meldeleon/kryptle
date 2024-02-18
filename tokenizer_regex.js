export {Tokenizer}


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
  [/^\^/, TokenTypes.EXPONENTIATION],
  [/^\(/, TokenTypes.PARENTHESIS_LEFT],
  [/^\)/, TokenTypes.PARENTHESIS_RIGHT],
]

class Tokenizer {
  constructor(input) {
    this.input = input,
    this.cursor = 0
  }
  hasMoreTokens(){
    return this.cursor < this.input.length
  }
  match(regex, exprChunk) {
    const matched = regex.exec(exprChunk)
    if (matched === null) return null

    this.cursor += matched[0].length
    return matched[0]
  } 
  getNextToken() {
    if (!this.hasMoreTokens()) return null
    
    const exprChunk = this.input.slice(this.cursor)

    for (const [regex, type] of TokenSpec){
      const tokenValue = this.match(regex, exprChunk)
      
      //no matches
      if (tokenValue === null){
      continue
      }
      
      // whitespace
      if (type === null){
      return this.getNextToken()
      }

      return  {
        type,
        value: tokenValue
      }
    }
    throw new SyntaxError(`Unexpected token ${exprChunk[0]}}`)
  }
}


function returnTokens(input) {
  const tokenizer = new Tokenizer(input)
  let tokenArr = []
  let token
  while ((token = tokenizer.getNextToken())){
    tokenArr.push(token)
  }
  return tokenArr
}

const input = '10 + 20 * 30 - 40'
console.log(returnTokens(input))