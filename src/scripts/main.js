/* eslint-disable no-shadow */
'use strict';

const Game = require('../modules/Game.class');
const game = new Game([
  [2, 0, 2, 0],
  [0, 0, 0, 0],
  [4, 2, 0, 0],
  [2, 0, 0, 0],
]);

game.button.addEventListener('click', () => {
  game.buttonClick();
});

document.addEventListener('keydown', (event) => {
  if (game.status === 'playing') {
    switch (true) {
      case event.key === 'ArrowLeft':
        game.moveLeft();

        return;
      case event.key === 'ArrowRight':
        game.moveRight();

        return;
      case event.key === 'ArrowUp':
        game.moveUp();

        return;
      case event.key === 'ArrowDown':
        game.moveDown();
    }
  }
});
