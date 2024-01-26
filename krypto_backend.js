//CLASSES FOR GAME

class Deck {
  constructor() {
    let deck = new Array()
    for (let i = 1; i < 26; i++) {
      if (i <= 6) {
        for (let j = 0; j < 3; j++) {
          deck.push(i)
        }
      } else if (i >= 7 && i <= 10) {
        for (let j = 0; j < 4; j++) {
          deck.push(i)
        }
      } else if (i >= 11 && i <= 17) {
        for (let j = 0; j < 2; j++) {
          deck.push(i)
        }
      } else {
        deck.push(i)
      }
    }
    this.cards = deck
  }
  //get deck
  getDeck() {
    return this.cards
  }
}

class Hand {
  constructor(cards) {
    this.cards = cards
  }
  getHand() {
    return this.cards
  }
  takeCard(card) {
    this.cards.push(card)
  }
}

class Target {
  constructor(card) {
    this.card = card
  }
  getTarget() {
    return this.card
  }
}

class Round {
  constructor(deck, hands) {
    let roundDeck = new Deck()
    let hand = []
    for (let i = 0; i < 5; i++) {
      hand.push(randomDeal(roundDeck))
    }
    this.hand = hand
    this.target = randomDeal(roundDeck)
    this.deck = roundDeck
  }
  printRound() {}
}

// DEALING FUNCTIONS
function randomDeal(deck) {
  let index = Math.floor(Math.random() * 54)
  let takenCard = deck.cards.splice(index, 1)
  return takenCard[0]
}

// VALIDATION FUNCTIONS
function checkIfNumbersInHand(numbers, hand) {
  //check if numbers in hand
  for (let i = 0; i < numbers.length; i++) {
    if (!hand.includes(numbers[i])) {
      return false
    }
    //check if each number is used the appropriate number of times
    else if (
      !countInstance(numbers[i], hand) === countInstance(numbers[i], numbers)
    ) {
      return false
    }
  }
}
function countInstance(number, hand) {
  let count = 0
  hand.forEach((num) => {
    if (number === num) {
      count++
    }
  })
  return count
}

//EVALUATION FUNCTIONS

function checkResult(expression, target) {
  let result = evaluateExpression(expression)
  return target === result
}
