class Node {
  constructor(value) {
    this.value = value
    this.left = this
    this.right = this
  }
}

// Double Circular Linked List
export default class LinkedList {
  constructor() {
    this.currentNode = null
  }

  addClockwise(value) {
    let newNode = new Node(value)
    let current = this.currentNode
    if(this.currentNode != null) {
      let right = current.right
      right.left = newNode
      newNode.right = right
      current.right = newNode
      newNode.left = current
    }
    this.currentNode = newNode
  }

  goClockwise(times = 1) {
    for(let i=0; i < times; i++ ) {
      this.currentNode = this.currentNode.right
    }
  }

  goCounterClockwise(times = 1) {
    for(let i=0; i < times; i++) {
      this.currentNode = this.currentNode.left
    }
  }

  removeCurrent() {
    let left = this.currentNode.left
    let right = this.currentNode.right
    left.right = right
    right.left = left
    this.currentNode = right
  }

  getCurrentValue() {
    return this.currentNode.value
  }
}

