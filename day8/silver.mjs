import { readFileSync } from 'fs'
// data as array
const data = readFileSync('./data', {encoding: 'utf8'}).trim().split(" ").map(Number)
// recursive fn
// return the index that the current child ends and the children metadata
const addNode = (index) => {
  let children = data[index]
  let metadata = data[index+1]
  let totalMetadata = 0
  while(children > 0) {
    const childData = addNode(index+2)
    index = childData.newIndex
    totalMetadata += childData.totalMetadata
    children--
  }
  for(let i = 0; i < metadata ; i++) {
    totalMetadata += data[index + i + 2]
  }
  return {newIndex: index + metadata, totalMetadata}
}

console.log(addNode(0).totalMetadata)
