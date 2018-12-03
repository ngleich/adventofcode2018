import { readFileSync } from 'fs'
const file = readFileSync('./data', {encoding: 'utf8'})

// get all the claims, the claims id is the array index + 1
let claims = file.trim().split("\n").map(claim =>  {
  const [_, left, top, width, height] = /#\d+\ @\ (\d+),(\d+):\ (\d+)x(\d+)/ig.exec(claim).map(Number)
  return {left, top, width, height}
})

// for each claim get an array of string for all the coordinates of the claims
// the string is ${x}-${y} position on the grid 
const allCoordinatesByClaim = claims.map(claim => {
  // easy way to get all consecutive numbers from start to start+length 
  const range = (start, length) => [...Array(length)].map((_,i) => start + i)
  const xs = range(claim.left, claim.width)
  const ys = range(claim.top, claim.height) 
  
  // flat map, finally returns an array of all the coordiantes of the claim
  return xs.reduce((acum, x) => [...acum, ...ys.map(y => `${x}-${y}`)], [])
})

// We don't care how many times a coodinate is overlap, we only count as 1
// We walk all the coordiantes of all the claims, if a coordinate is already
// seen, we add it to the overlaps
const coordinates = new Set()
const overlapedCoordinates = new Set()
allCoordinatesByClaim.forEach(coordiantesInClaim => {
  coordiantesInClaim.forEach(coordinate => {
    if(coordinates.has(coordinate)) {
      overlapedCoordinates.add(coordinate)
    }
    coordinates.add(coordinate)
  })
})


console.log(overlapedCoordinates.size)
