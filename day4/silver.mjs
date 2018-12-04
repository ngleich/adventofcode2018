import { readFileSync } from 'fs'
const file = readFileSync('./data', {encoding: 'utf8'})

let entriesInOrder = file.trim().split("\n")
// order all the entries to parse them in a more easy way
entriesInOrder.sort()

//THIS DAY PROBABLY COULD BE REFACTOR
//OR BE SOLVED ON A SMALLER BIG-O

// a dictionary that given a guard return an array for the
// minutes aspleep in a minute, where the minute is the index position of the array
let timesByGuard = {}
let entry = entriesInOrder.shift()
while(entry) { 
  const guard = /#(\d+)/i.exec(entry)[1]
  timesByGuard[guard] = timesByGuard[guard] || [...Array(60)].map((_,i) => 0)
  while( (entry = entriesInOrder.shift(), entry && entry.includes("falls")) ) {
    const start = Number(/:(\d+)/i.exec(entry)[1])
    entry = entriesInOrder.shift()
    const end = Number(/:(\d+)/i.exec(entry)[1])
    for(let i = start; i < end; i++) {
      timesByGuard[guard][i] += 1
    }
  }
}

let guardForMax
let maxSlept = 0
// for each guard get the total amount of minutes slept and return the gurad who slept the most
Object.keys(timesByGuard).forEach(guard => {
  const minutesSleptByGuard = timesByGuard[guard].reduce(
    (totalMinutesSlept, timesSleptInThisMinute) => totalMinutesSlept + timesSleptInThisMinute, 
    0
  )
  if(maxSlept < minutesSleptByGuard) {
    maxSlept = minutesSleptByGuard
    guardForMax = guard
  }
})

const guardHours = timesByGuard[guardForMax]
// the minute more slept by the guard who slept the most
console.log(guardHours.indexOf(Math.max(...guardHours)) * guardForMax)
