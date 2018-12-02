import { readFileSync } from 'fs'
const file = readFileSync('./data', {encoding: 'utf8'})
// Get all ids
const ids = file.trim().split("\n")

// for each pair of words
for(let i = 0; i < ids.length; i++) {
  for(let j = i + 1; j < ids.length; j++) {
    const w1 = ids[i].split("")
    const w2 = ids[j].split("")
    //get the letters in the same position 
    let sameLetters = w1.filter((letter, position) => letter == w2[position])
    // if the difference is just one, thats the pair we want
    if(w1.length - sameLetters.length == 1) {
      console.log(sameLetters.join(""))
      process.exit(0)
    }
  }
}
