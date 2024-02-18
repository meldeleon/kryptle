import { reversePolishNotation } from "./reverse_polish_notation.js"
import { shuntingYard } from "./shunting_yard.js"


let test = "323+4*(52^2)/(211-5)"
function parseExpression(expr) {
  let shuntingYardResult = shuntingYard(test)
  let result = reversePolishNotation(shuntingYardResult)
  return result
}

console.log(parseExpression(test))
