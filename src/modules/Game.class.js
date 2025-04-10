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
    this.score = 0;
    this.scoreHTML = document.querySelector('.game-score');
    this.status = 'idle';
    this.state = initialState;
    this.button = document.querySelector('button');
    this.messageLose = document.querySelector('[data-message-lose]');
    this.messageWin = document.querySelector('[data-message-win]');
    this.messageStart = document.querySelector('[data-message-start]');
    this.notMoved = false;
  }

  moveLeft() {
    // console.log('left');
    // this.spawnBlock();
    this.makeMove('left');
  }

  moveRight() {
    // console.log('right');
    // this.spawnBlock();
    this.makeMove('right');
  }

  moveUp() {
    // console.log('Up');
    // this.spawnBlock();
    this.makeMove('up');
  }

  moveDown() {
    // console.log('Down');
    // this.spawnBlock();
    this.makeMove('down');
  }

  /**
   * @returns {number}
   */
  getScore(value) {
    this.score += value;
    this.scoreHTML.innerText = this.score;
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

    // console
    button.setAttribute('tabindex', '-1');
    button.classList.replace('start', 'restart');
    button.innerText = 'Restart';

    this.messageStart.classList.add('hidden');
    this.status = 'playing';

    // this.spawnCell();
    // this.spawnCell();

    this.drowCells();
    this.checkMoves();
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
    this.status = 'lose';
    this.messageLose.classList.remove('hidden');
  }

  makeMove(direction) {
    this.calculateStep(direction);
    this.spawnCell();
    this.drowCells();
    this.checkMoves();
  }

  calculateStep(direction) {
    switch (direction) {
      case 'left':
        for (let row = 0; row < 4; row++) {
          const rowArr = [];

          for (let col = 0; col < 4; col++) {
            rowArr.push(this.state[row][col]);
          }

          const newArr = this.step(rowArr);

          for (let col = 3; col >= 0; col--) {
            this.state[row][col] = newArr[col];
          }
        }
        break;
      case 'right':
        for (let row = 0; row < 4; row++) {
          const rowArr = [];

          for (let col = 3; col >= 0; col--) {
            rowArr.push(this.state[row][col]);
          }

          const newArr = this.step(rowArr).reverse();

          for (let col = 3; col >= 0; col--) {
            this.state[row][col] = newArr[col];
          }
        }
        break;
      case 'up':
        for (let col = 0; col < 4; col++) {
          const colArr = [];

          for (let row = 0; row < 4; row++) {
            colArr.push(this.state[row][col]);
          }

          const newArr = this.step(colArr);

          for (let row = 0; row < 4; row++) {
            this.state[row][col] = newArr[row];
          }
        }
        break;
      case 'down':
        for (let col = 0; col < 4; col++) {
          const colArr = [];

          for (let row = 3; row >= 0; row--) {
            colArr.push(this.state[row][col]);
          }

          const newArr = this.step(colArr).reverse();

          for (let row = 0; row < 4; row++) {
            this.state[row][col] = newArr[row];
          }
        }
        break;
    }
  }

  step(arr) {
    const newArr = [...arr];

    for (let i = 0; i < newArr.length; i++) {
      for (let j = i + 1; j < newArr.length; j++) {
        if (newArr[j] === 0) {
          continue;
        } else if (newArr[i] === 0) {
          newArr[i] = newArr[j];
          newArr[j] = 0;
        } else if (newArr[j] === newArr[i]) {
          newArr[i] *= 2;
          newArr[j] = 0;
          this.getScore(newArr[i]);
          this.notMoved = false;
          break;
        } else if (newArr[j] > newArr[i]) {
          break;
        }
      }
    }

    return newArr;
  }

  spawnCell() {
    const emptyCells = this.state.reduce((newArr, value, row) => {
      value
        .map((cell, i) => ({ value: cell, i }))
        .filter((cell) => !cell.value)
        .map((cell) => cell.i)
        .forEach((i) => newArr.push([i, row]));

      return newArr;
    }, []);

    // If less than 10% - returns 4, otherwise - 2
    const cellValue = Math.random() * 100 > 10 ? 2 : 4;
    const randCellIndex = Math.floor(Math.random() * (emptyCells.length - 1));
    const randEmptyCell = emptyCells[randCellIndex];

    this.state[randEmptyCell[1]][randEmptyCell[0]] = cellValue;
  }

  drowCells() {
    this.cells.forEach((cell, i) => {
      cell.innerText = this.state.flat()[i];

      if (cell.innerText === '0') {
        cell.className = 'field-cell';
      } else {
        cell.className = 'field-cell' + ' field-cell--' + cell.innerText;
      }
    });
  }

  checkMoves() {
    const imposibleToMove = {
      left: true,
      right: true,
      up: true,
      down: true,
      all: this.left + this.right + this.up + this.down,
    };

    for (const direction in imposibleToMove) {
      this.calculateStep(direction);
      imposibleToMove[direction] = this.notMoved;
      this.notMoved = true;
    }

    // console.log(imposibleToMove);

    if (imposibleToMove.all) {
      this.gameLose();
    }
  }
}

module.exports = Game;
