import { readFileSync } from 'fs'
const file = readFileSync('./data', {encoding: 'utf8'})

// get all the claims, the claims id is the array index + 1
let claims = file.trim().split("\n").map(claim =>  {
  const [_, left, top, width, height] = /#\d+\ @\ (\d+),(\d+):\ (\d+)x(\d+)/ig.exec(claim).map(Number)
  return {left, top, width, height}
})

// Check if 2 claims overlap
const hasOverlap = (c1, c2) => {
  return ( c1.left <= c2.left + c2.width ) &&
         ( c2.left <= c1.left + c1.width ) &&
         ( c1.top <= c2.top + c2.height ) &&
         ( c2.top <= c1.top + c1.height )
}

// this set contains all the claims that we still not sure if overlaps with other
// the real claim id is one more that the value
let potentialGoodClaims = new Set([...Array(claims.length)].map((_,i) => i))

// then we check for all the pairs of claims if they overlap
// if they do, we delete them from the set
for(let i = 0; i < claims.length -1; i++) {
  for(let j = i + 1; j < claims.length; j++) {
    if(hasOverlap(claims[i], claims[j])) {
      potentialGoodClaims.delete(i)
      potentialGoodClaims.delete(j)
    }
  }
}
/**
Observations
We could just make a double for loop for all the claims both time 
and just return the one that doesn't overlap without having the set
This could be faster if the solution is on the first claims, but if
the solution is at the end of the claims, the qty of checks is much bigger that way.
In both cases the algorithm magnitud is O(n^2) but, this one however is faster
*/

// we know there is only one correct answerd and the claim id is the index+1
console.log([...potentialGoodClaims][0]+1)
