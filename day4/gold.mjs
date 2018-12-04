import { readFileSync } from 'fs'
const file = readFileSync('./data', {encoding: 'utf8'})

let entriesInOrder = file.trim().split("\n")
// order all the entries to parse them in a more easy way
entriesInOrder.sort()

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

let guardForMax, minuteForMax
let maxSlept = 0
// Return the guard that has slept the most on any particular minute
Object.keys(timesByGuard).forEach(guard => {
  const maxSleptByGuard = Math.max(...timesByGuard[guard])
  const minute = timesByGuard[guard].indexOf(maxSleptByGuard)

  if(maxSlept < maxSleptByGuard) {
    maxSlept = maxSleptByGuard
    minuteForMax = minute
    guardForMax = guard
  }
})

console.log(minuteForMax * guardForMax)
