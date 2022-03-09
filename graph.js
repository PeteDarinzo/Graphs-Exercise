class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    this.nodes.forEach(v => {
      if (v.adjacent.has(vertex)) {
        v.adjacent.delete(vertex);
      }
    });
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let toVisitStack = [start];
    let visited = [];
    let seen = new Set(start.value);
    let currentVertex;
    while (toVisitStack.length) {
      currentVertex = toVisitStack.pop();
      visited.push(currentVertex.value);
      for (let v of currentVertex.adjacent) {
        if (!seen.has(v.value)) {
          toVisitStack.push(v);
          seen.add(v.value);
        }
      }
    }
    return visited;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let visited = [];
    let seen = new Set(start.value);
    let currentVertex;
    while (toVisitQueue.length) {
      currentVertex = toVisitQueue.shift();
      visited.push(currentVertex.value);
      for (let v of currentVertex.adjacent) {
        if (!seen.has(v.value)) {
          toVisitQueue.push(v);
          seen.add(v.value);
        }
      }
    }
    return visited;
  }
}

module.exports = { Graph, Node }