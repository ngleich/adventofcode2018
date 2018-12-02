import { readFileSync } from 'fs'
const file = readFileSync('./data', {encoding: 'utf8'})

// get all ids
const ids = file.trim().split("\n")

// Generate a frequency dictionary by letter for each id
const letterHistogramById = ids.map(
  // The ( , ) operator return the last expresion, very usefull on reduce with dict
  (id) => id.trim().split("").reduce((dict, letter) => (dict[letter] = (dict[letter]||0) + 1, dict), {})
)

// Return the qty of ids that have at least one letter with exactly qty appearances
const filterWithQty = (qty) => letterHistogramById.filter((data) => Object.keys(data).some((letter) => data[letter] == qty))

let qty2 = filterWithQty(2) 
let qty3 = filterWithQty(3)

console.log(qty2.length * qty3.length)

