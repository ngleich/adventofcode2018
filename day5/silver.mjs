import { readFileSync } from 'fs'
const polymer = readFileSync('./data', {encoding: 'utf8'}).trim()

// A-Z
const upperLetters = [...Array(26)].map((_,i) => String.fromCharCode(65+i))

// A RegExp of the form Aa|...|Zz|aA|...|zZ
const regexp = new RegExp( 
  upperLetters
    .map(upper => `${upper}${upper.toLocaleLowerCase()}`)
    .concat(upperLetters.map(upper => `${upper.toLocaleLowerCase()}${upper}`))
    .join("|"), "g")

// while there is a match for the regexp replace all and retry. returns the legnth
const reactToPolymer = polymerToReact => {
  while(regexp.test(polymerToReact)) {
    polymerToReact = polymerToReact.replace(regexp, "")
  }
  return polymerToReact.length
}

console.log(reactToPolymer(polymer))

