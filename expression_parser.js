import { Tokenizer } from "./tokenizer_regex.js"
import { reversePolishNotation } from "./reverse_polish_notation.js"
import { shuntingYard } from "./shunting_yard.js"


let test = "3+4*2/(1-5)^2^3"
let shuntingYardResult = shuntingYard(test)
let result = reversePolishNotation(shuntingYardResult)
console.log({shuntingYardResult}, {result})


