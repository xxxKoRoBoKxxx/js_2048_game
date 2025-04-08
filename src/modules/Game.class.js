/* eslint-disable no-shadow */
'use strict';

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */
class Game {
  /**
   * Creates a new game instance.
   *
   * @param {number[][]} initialState
   * The initial state of the board.er
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */
  constructor(initialState) {
    // eslint-disable-next-line no-console
    console.log(initialState);
    this.cells = [...document.querySelectorAll('.field-cell')];
    this.emptyCells = this.cells;
    this.score = 0;
    this.status = 'idle';
    this.state = initialState;
    this.button = document.querySelector('button');
    this.messageLose = document.querySelector('[data-message-lose]');
    this.messageWin = document.querySelector('[data-message-win]');
    this.messageStart = document.querySelector('[data-message-start]');
  }

  moveLeft() {
    // console.log('left');
    this.spawnBlock();
  }

  moveRight() {
    // console.log('right');
    this.spawnBlock();
  }

  moveUp() {
    // console.log('Up');
    this.spawnBlock();
  }

  moveDown() {
    // console.log('Down');
    this.spawnBlock();
  }

  /**
   * @returns {number}
   */
  getScore() {
    return this.score;
  }

  /**
   * @returns {number[][]}
   */
  getState() {
    return this.state;
  }

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */
  getStatus() {
    return this.status;
  }

  /**
   * Starts the game.
   */
  start() {
    const button = this.button;

    button.setAttribute('tabindex', '-1');
    button.classList.replace('start', 'restart');
    button.innerText = 'Restart';

    this.messageStart.classList.add('hidden');
    this.status = 'playing';
    this.spawnBlock();
  }

  /**
   * Resets the game.
   */
  restart() {
    const button = this.button;

    button.removeAttribute('tabindex');
    button.classList.replace('restart', 'start');
    button.innerText = 'Start';

    this.messageStart.classList.remove('hidden');
    this.messageLose.classList.add('hidden');
    this.messageWin.classList.add('hidden');
    this.status = 'idle';

    this.state = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    this.cells.forEach((cell) => {
      cell.innerText = '';
      cell.className = 'field-cell';
    });
    this.emptyCells = this.cells;
  }

  buttonClick() {
    const button = this.button;

    if (button.classList.contains('start')) {
      this.start();
    } else if (button.classList.contains('restart')) {
      this.restart();
    }
  }

  gameLose() {
    console.log(this.messageLose);
    this.status = 'lose';
    this.messageLose.classList.remove('hidden');
  }

  spawnBlock() {
    // If less than 10% - returns 4, otherwise - 2
    const blockValue = Math.random() * 100 > 10 ? 2 : 4;
    const randBlockIndex = Math.floor(
      Math.random() * (this.emptyCells.length - 1),
    );
    const randBlock = this.emptyCells[randBlockIndex];

    randBlock.innerText = blockValue;
    randBlock.classList.add('field-cell--' + blockValue);

    this.emptyCells = this.emptyCells.filter((cell) => cell !== randBlock);
    console.log(this.emptyCells);

    if (this.emptyCells.length === 0) {
      this.gameLose();
    }
  }
}

module.exports = Game;
