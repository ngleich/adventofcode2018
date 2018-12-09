import { readFileSync } from 'fs'
// todo: implement own structure
import structures from './kdTree.js'
const kdTree = structures.kdTree

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

const tree = new kdTree(points, distance, ["x", "y"])

const areas = new Map()
const edges = new Set()

for(let i=0; i <= maxX; i++) {
  for(let j=0; j <= maxY; j++) {
    let [[p1, d1],[p2, d2]] = tree.nearest({x: i, y: j}, 2)
    if(d2 < d1) p1 = p2
    if(d1 != d2) {
      if(i == 0 || i == maxX || j == 0 || j == maxY) {
        edges.add(p1)
      }
      areas.set(p1, (areas.get(p1)||0) + 1)
    }
  }
}

console.log(Math.max(...Array.from(areas.entries())
  .map(([point, qty]) => edges.has(point) ? 0 : qty)
))


