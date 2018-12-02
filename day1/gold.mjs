import { readFileSync } from 'fs'
const file = readFileSync('./data', {encoding: 'utf8'})

// Parse all input as int
const frequencies = file.trim().split("\n").map(Number)

/*
Cycle function
Return a function that each time is call cyles the given list
*/
const cycle = (list, start = 0, end = list.length) => () => list[start++%end]
const nextFrec = cycle(frequencies)

/*
Use Set object  to keep track of frequencies values
When a frequency has benn use, it ends
*/
const usedFrec = new Set();
let current = 0
for(current = nextFrec(); !usedFrec.has(current); current += nextFrec()) {
    usedFrec.add(current)
}
console.log(current)
