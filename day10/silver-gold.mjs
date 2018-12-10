import { readFileSync, writeFileSync } from 'fs'

const Signals = () => {
  let list = []
  let maxX = Number.NEGATIVE_INFINITY
  let minX = Number.POSITIVE_INFINITY
  let maxY = Number.NEGATIVE_INFINITY
  let minY = Number.POSITIVE_INFINITY
  
  const add = ([x,y,vx,vy]) => {
    maxX = Math.max(maxX, x)
    minX = Math.min(minX, x)
    maxY = Math.max(maxY, y)
    minY = Math.min(minY, y)

    list.push({x,y,vx,vy})
  }

  const getCurrentPoints = () => {
    return new Set(list.map(point => `${point.x}-${point.y}`))
  }

  const generateNextPoints = () => {
    maxX = Number.NEGATIVE_INFINITY
    minX = Number.POSITIVE_INFINITY
    maxY = Number.NEGATIVE_INFINITY
    minY = Number.POSITIVE_INFINITY
 
    list = list.map(({x,y,vx,vy}) => {
      const [newX, newY] = [x+vx, y+vy]
      maxX = Math.max(maxX, newX)
      minX = Math.min(minX, newX)
      maxY = Math.max(maxY, newY)
      minY = Math.min(minY, newY)
      
      return {x: newX, y: newY, vx, vy}
    })
  }

  const draw = () => {
    const currentPoints = getCurrentPoints()
    let grid = []
    // I hated this condition. Is there a better way?
    if((maxX - minX > 100) || (maxY - minY > 100)) return "Skip"
    for(let y = minY; y <= maxY; y++) {
      let newLine = []
      for(let x = minX; x <= maxX; x++) {
        newLine.push(currentPoints.has(`${x}-${y}`) ? "X" : ".")
      }
      grid.push(newLine)
    }
    return grid.map(line => line.join("")).join("\n")
  }

  return {add,draw,generateNextPoints}
}
const signals = Signals()
readFileSync('./data', {encoding: 'utf8'}).trim().split("\n")
  .map(signal => signals.add(signal.match(/-?\d+/g).map(Number)))

for(let i=1; i<20000; i++) {
  signals.generateNextPoints()
  const grid = signals.draw()
  if(grid != "Skip") {
    console.log(`Step ${i}`)
    console.log(grid)
    console.log("\n\n\n")
  }
}
