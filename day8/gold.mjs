import { readFileSync } from 'fs'

const data = readFileSync('./data', {encoding: 'utf8'}).trim().split(" ").map(Number)
// recursive fn
// return the child index, metadata qty, and the metadata for the childs
const addNode = (index) => {
  const realIndex = index
  let children = data[index]
  let metadata = data[index+1]
  let totalMetadata = 0
  let childrenMetadata = []
  if(children > 0) {
    for(let i = 0; i < children; i++) {
      const childData = addNode(index+2)
      index = childData.newIndex
      childrenMetadata[i] = childData.totalMetadata
    }
    for(let i = 0; i < metadata ; i++) {
      const childMetadataToGet = data[index + i + 2] - 1
      totalMetadata += (childrenMetadata[childMetadataToGet]||0)
    }
  } else {
    for(let i = 0; i < metadata ; i++) {
      totalMetadata += data[index + i + 2]
    }
  }
  return {newIndex: index + metadata, totalMetadata, childrenMetadata}
}

console.log(addNode(0).totalMetadata)
