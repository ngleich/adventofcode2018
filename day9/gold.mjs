import { readFileSync } from 'fs'
import LinkedList from './linkedList'
const input = "458 players; last marble is worth 72019 points"

const {0: totalPlayers, 6: maxPoints} = input.split(" ").map(Number)
const players = [...Array(totalPlayers)].fill(0)
let list = new LinkedList()
list.addClockwise(0)

for(let i=1; i < maxPoints * 100; i++) {
  let currentPlayer = i % totalPlayers
  if(i%23 > 0) {
    list.goClockwise(1)
    list.addClockwise(i)
  } else {
    list.goCounterClockwise(7)
    players[currentPlayer] += (i + list.getCurrentValue())
    list.removeCurrent()
  }
}

console.log(Math.max(...players))
