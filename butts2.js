// function validPalindrome(s) {
//   //base case
//   if (isPalindrome(s)) return true

//   return validPalindrome(s)
// }

// function isPalindrome(s) {
//   for (let i = 0; i < s.length; i++) {
//     if (s[i] !== s[s.length - 1 - i]) return false
//   }
//   return true
// }

function isPalindrome(str) {
  console.log(str)
  // base case
  if (str.length === 1) return true

  if (str.length === 2) return str[0] === str[1]

  if (str[0] === str[str.length - 1]) {
    //if the ends equal each other, slice them off
    return isPalindrome(str.slice(1, -1))
  }
  return false
}

function validPalindrome(s) {
  let low = 0,
    high = s.length - 1
  while (low < high) {
    if (s[low] !== s[high]) {
      return isPalindrome(s, low + 1, high) || isPalindrome(s, low, high - 1)
    }
    low++, high--
  }
  return true
}
function isPalindrome(str, low, high) {
  while (low < high) {
    if (str[low] !== str[high]) return false
    low++, high--
  }
  return true
}

console.log(isPalindrome("ABBA"))
