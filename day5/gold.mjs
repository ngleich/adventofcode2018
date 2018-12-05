import { readFileSync } from 'fs'
const polymer = readFileSync('./data', {encoding: 'utf8'}).trim()

const upperLetters = [...Array(26)].map((_,i) => String.fromCharCode(65+i))

const regexp = new RegExp( 
  upperLetters
    .map(upper => `${upper}${upper.toLocaleLowerCase()}`)
    .concat(upperLetters.map(upper => `${upper.toLocaleLowerCase()}${upper}`))
    .join("|"), "g")

const reactToPolymer = polymerToReact => {
  while(regexp.test(polymerToReact)) {
    polymerToReact = polymerToReact.replace(regexp, "")
  }
  return polymerToReact.length
}

const reactions = upperLetters.map(letter => reactToPolymer(polymer.replace(new RegExp(letter, "gi"), "")))

console.log(Math.min(...reactions))
