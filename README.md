# Minion Rush Game
![Landing page game](assets/image.png)

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/nhhongan/pacman/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/nhhongan/pacman/pulls)

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🍌 About <a name="about"></a>
This project merges the nostalgic charm of the classic arcade game Pac-Man with the beloved Minions from the Despicable Me franchise. Players assume the role of a Minion navigating through dynamic mazes, collecting bananas, and evading enemies. This game aims to deliver an entertaining experience that appeals to both fans of traditional arcade games and enthusiasts of modern animated characters. Developed using HTML, CSS, and JavaScript, the project showcases innovative game design while offering a delightful adventure filled with strategy, reflexes, and humor, suitable for players of all ages.

## 📁 File Structure
- 📁 **src/**
  - 📄 **AStar.js**: Implements the A* algorithm for pathfinding.
  - 📄 **Config.js**: Configuration settings for the game.
  - 📄 **Enemy.js**: Defines the behavior and rendering of enemy characters.
  - 📄 **Pacman.js**: Manages Pacman's behavior, movement, and interaction with game elements.
  - 📄 **Game.js**: Controls the main game loop, initialization, and game over/win conditions.
  - 📄 **Main.js**: Entry point of the application.
  - 📄 **MovingDirection.js**: Enumerates possible movement directions.
  - 📄 **Navigator.js**: Handles navigation between game screens (landing page and game page).
  - 📄 **ScoreBoard.js**: Displays and updates the game score.
  - 📄 **ScoreSubject.js**: Implements the observer pattern for score updates.
  - 📄 **TileMap.js**: Renders the game map and manages game elements placement.
 

## 🏁 Getting Started <a name="getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
1. **Clone the Repository:**
```
git clone https://github.com/nhhongan/pacman
```
```
cd pacman
```
2. **Run the Application:**
- Open `index.html` in your preferred web browser.

3. **Game Controls:**
- Use arrow keys to navigate Minion.
- Collect dots and avoid enemies to score points.
- Reach the goal to win the game.

4. **Additional Notes:**
- Ensure JavaScript is enabled in your web browser.
- Compatible with modern web browsers (Chrome, Firefox, Edge, Safari).

## 🎮 How to Play <a name="usage"></a>
### Gameplay Instructions
- **Controls:**
  - Use the arrow keys to navigate the Minion character through the maze.
  - 🠕 arrow: Move Up
  - 🠗 arrow: Move Down
  - 🠔 arrow: Move Left
  - 🠖 arrow: Move Right
- **Objective:**
  - Collect all bananas and power dots scattered throughout the maze to win the game.
- **Avoid Enemies:**
    - Steer clear of enemies moving through the maze; colliding with them ends the game.

### Game Features
- **Scoreboard:**
  - 🏆 The score increases each time a banana or power dot is collected by the Minion.
  - 📊 The scoreboard is displayed prominently on the game screen.

- **Levels:**
  - 🎮 Progress through multiple levels, each with increasing difficulty and unique maze layouts.

## ⛏️ Built Using <a name = "built_using"></a>

The game is built using the following technologies and tools:

- ![HTML](https://img.icons8.com/color/24/000000/html-5.png) **HTML**: Provides the structure and markup for the game interface.
- ![CSS](https://img.icons8.com/color/24/000000/css3.png) **CSS**: Styles the game elements, ensuring a visually appealing presentation.
- ![JavaScript](https://img.icons8.com/color/24/000000/javascript.png) **Javascript**: Implements the game logic and interactions, making the game dynamic and interactive.

## ✍️ Authors <a name = "authors"></a>
- [@nhhongan](https://github.com/nhhongan)
## 🎉 Acknowledgements <a name = "acknowledgement"></a>
- Inspiration: ![Pacman](https://img.icons8.com/ios/24/000000/pacman.png) Pac-man arcade game
- References: [A* Pathfinding Algorithm](https://www.youtube.com/watch?v=aKYlikFAV4k)

