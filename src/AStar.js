/* Name: Nguyen Hoang Hong An
   Student code: ITDSIU22151
   Purpose: This module implements the A* pathfinding algorithm. It is used to calculate the shortest path
            between points on the game board, enabling enemy characters to intelligently navigate the maze
            and pursue the Pacman character. The A* algorithm balances optimality and performance, making it
            well-suited for real-time applications such as this game.
*/


class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.g = 0; //distance from the node to the start node
        this.h = 0;  //distance from the node to the target node
        this.f = 0; //f =g +h
        this.parent = null;
    }
}

export default function AStar(map, start, end) {
    let openList = [];// list of node with start to search
    let closedList = [];// list of node already process
    let width = map[0].length;
    let height = map.length;

    let startNode = new Node(start[0], start[1]);
    let endNode = new Node(end[0], end[1]);

    openList.push(startNode);

    while (openList.length > 0) {
        let currentNode = openList[0];
        let currentIndex = 0;

        for (let i = 1; i < openList.length; i++) {
            if (openList[i].f < currentNode.f) {
                currentNode = openList[i];
                currentIndex = i;
            }
        }

        openList.splice(currentIndex, 1);
        closedList.push(currentNode);

        if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
            let path = [];
            let current = currentNode;
            while (current !== null) {
                path.push([current.x, current.y]);
                current = current.parent;
            }
            return path.reverse();
        }

        let neighbors = [];

        // map[y][x] !== 1
        // map optimizer, make 2, 3, 6 to 2
        // else 1
        const possibleOption = [2, 3, 4, 5, 6];

        // left
        if (currentNode.x - 1 >= 0 && possibleOption.includes(map[currentNode.y][currentNode.x - 1])) {
            neighbors.push(new Node(currentNode.x - 1, currentNode.y));
        }

        // right
        if (currentNode.x + 1 < width && possibleOption.includes(map[currentNode.y][currentNode.x + 1])) {
            neighbors.push(new Node(currentNode.x + 1, currentNode.y));
        }

        // up
        if (currentNode.y - 1 >= 0 && possibleOption.includes(map[currentNode.y - 1][currentNode.x])) {
            neighbors.push(new Node(currentNode.x, currentNode.y - 1));
        }

        // down
        if (currentNode.y + 1 < height && possibleOption.includes(map[currentNode.y + 1][currentNode.x])) {
            neighbors.push(new Node(currentNode.x, currentNode.y + 1));
        }

        for (let neighbor of neighbors) {
            if (closedList.find(node => node.x === neighbor.x && node.y === neighbor.y)) {
                continue;
            }

            neighbor.g = currentNode.g + 1;
            neighbor.h = Math.abs(neighbor.x - endNode.x) + Math.abs(neighbor.y - endNode.y);
            neighbor.f = neighbor.g + neighbor.h;

            if (openList.find(node => node.x === neighbor.x && node.y === neighbor.y && neighbor.g >= node.g)) {
                continue;
            }

            neighbor.parent = currentNode;
            openList.push(neighbor);
        }
    }

    return [];
}

// let start = [12, 9]; // Enemy start position
// let end = [1, 4]; // Pacman position

// const map = [
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 2, 2, 2, 4, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
//     [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
//     [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
//     [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
//     [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
//     [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 3, 2, 2, 1, 2, 2, 2, 2, 2, 1],
//     [1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 1, 2, 2, 1],
//     [1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 2, 1],
//     [1, 2, 2, 3, 2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 3, 1, 1],
//     [1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
//     [1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 1, 1],
//     [1, 2, 2, 1, 1, 2, 1, 2, 1, 5, 1, 1, 1, 2, 1, 2, 2, 1, 1, 2, 1],
//     [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
//     [1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1],
//     [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
//     [1, 2, 1, 1, 1, 2, 1, 1, 1, 3, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1],
//     [1, 2, 2, 2, 1, 5, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
//     [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
//     [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
//     [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
//     [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 5, 2, 2, 2, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// ];

// let path = AStar(map, start, end);
// console.log(path);