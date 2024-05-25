// import AStar from './AStar.js';

// export default function drawConnectionLine(ctx, pacman, enemy, tileMap) {
//     ctx.beginPath();
//     ctx.strokeStyle = 'pink';
//     ctx.lineWidth = 3;

//     const startX = Math.floor(enemy.x / enemy.tileSize);
//     const startY = Math.floor(enemy.y / enemy.tileSize);
//     const goalX = Math.floor(pacman.x / pacman.tileSize);
//     const goalY = Math.floor(pacman.y / pacman.tileSize);

//     const path = AStar(tileMap, [startX, startY], [goalX, goalY]);

//     if (path.length > 0) {
//         ctx.moveTo(enemy.x + enemy.tileSize / 2, enemy.y + enemy.tileSize / 2);

//         for (const [x, y] of path) {
//             ctx.lineTo(x * enemy.tileSize + enemy.tileSize / 2, y * enemy.tileSize + enemy.tileSize / 2);
//         }
//     }

//     ctx.stroke();
// }
