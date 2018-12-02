import { readFileSync } from 'fs'
const file = readFileSync('./data', {encoding: 'utf8'})

/**
Parse all number and sum them
*/
const result = file.trim().split("\n").map(Number).reduce((acc, num) => acc += num, 0)
console.log(result);
