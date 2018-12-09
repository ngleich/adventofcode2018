import { readFileSync } from 'fs'

// all points
const points = []
let maxX = 0
let maxY = 0
readFileSync('./data', {encoding: 'utf8'}).trim().split("\n").forEach((point) => {
  const [x,y] = point.split(", ")
  maxX = Math.max(maxX, x)
  maxY = Math.max(maxY, y)
  points.push({x, y})
})

// Manhattan distance
const distance = (p1,p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)

let totalCells = 0
for(let x=0; x <= maxX; x++) {
  for(let y=0; y <= maxY; y++) {
    const totalDistance = points.reduce((acc, p) => acc + distance(p, {x,y}), 0)
    if(totalDistance < 10000) {
      totalCells++
    }
  }
}
console.log(totalCells)
