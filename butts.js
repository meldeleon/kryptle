const butts = ["+", "-", "*", "/", "^"]

butts.forEach((x) => {
  if (isNaN(parseInt(x))) {
    console.log("YEEHAW")
  } else {
    console.log("NEEHAW")
  }
})

// console.log(typeof NaN)
