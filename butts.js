import { create, all } from "mathjs"
const math = create(all)
const limitedEvaluate = math.evaluate
math.import(
  {
    import: function () {
      throw new Error("Function import is disabled")
    },
    createUnit: function () {
      throw new Error("Function createUnit is disabled")
    },
    evaluate: function () {
      throw new Error("Function evaluate is disabled")
    },
    parse: function () {
      throw new Error("Function parse is disabled")
    },
    simplify: function () {
      throw new Error("Function simplify is disabled")
    },
    derivative: function () {
      throw new Error("Function derivative is disabled")
    },
  },
  { override: true }
)

let butts = " 5 + 5 - 1 * 25"

console.log(limitedEvaluate(butts))

let introStr = `Welcome to
============================================
 _____ _____ __ __ _____ _____ __    _____ 
|  |  | __  |  |  |  _  |_   _|  |  |   __|
|    -|    -|_   _|   __| | | |  |__|   __|
|__|__|__|__| |_| |__|    |_| |_____|_____|

=============================================
Numbers: [ 1 ] [ 2 ] [ 3 ] [ 4 ] [ 5 ]
Target: [ 22 ]
Operators: +, -, *, `
