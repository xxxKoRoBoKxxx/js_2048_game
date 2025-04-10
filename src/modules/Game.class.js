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
    this.status = 'idle';
    this.state = initialState;
    this.button = document.querySelector('button');
    this.messageLose = document.querySelector('[data-message-lose]');
    this.messageWin = document.querySelector('[data-message-win]');
    this.messageStart = document.querySelector('[data-message-start]');
  }

  moveLeft() {
    // console.log('left');
    // this.spawnBlock();
    this.calculateStep('left');
  }

  moveRight() {
    // console.log('right');
    // this.spawnBlock();
    this.calculateStep('right');
  }

  moveUp() {
    // console.log('Up');
    // this.spawnBlock();
    this.calculateStep('up');
  }

  moveDown() {
    // console.log('Down');
    // this.spawnBlock();
    this.calculateStep('down');
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

    // console
    button.setAttribute('tabindex', '-1');
    button.classList.replace('start', 'restart');
    button.innerText = 'Restart';

    this.messageStart.classList.add('hidden');
    this.status = 'playing';
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

  calculateStep(direction) {
    switch (direction) {
      case 'left':
        break;
      case 'right':
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

    console.log(this.state);
    this.spawnCell();
  }

  step(arr) {
    const newArr = [...arr];

    for (let i = 0; i < newArr.length; i++) {
      for (let j = i + 1; j < newArr.length; j++) {
        if (newArr[i] === 0) {
          if (newArr[j] === 0) {
            continue;
          }
          newArr[i] = newArr[j];
          newArr[j] = 0;
        } else if (newArr[j] === newArr[i]) {
          newArr[i] *= 2;
          newArr[j] = 0;
          break;
        } else if (newArr[j] > newArr[i] || newArr[j] < newArr[i]) {
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

    this.state[randEmptyCell[0]][randEmptyCell[1]] = cellValue;
  }

  spawnBlock() {
    // const blockValue = Math.random() * 100 > 10 ? 2 : 4;
    // this.state[randBlock.parentElement.rowIndex][randBlock.cellIndex] = blockValue;
    // const randBlock = this.emptyCells[randBlockIndex];

    // randBlock.innerText = blockValue;
    // randBlock.classList.add('field-cell--' + blockValue);

    // this.emptyCells = this.emptyCells.filter((cell) => cell !== randBlock);

    // // eslint-disable-next-line max-len, prettier/prettier
    // console.log(this.state);

    // if (this.emptyCells.length === 0) {
    //   this.gameLose();
    // }
  }


  // moveUpCheck() {
  //   for (let i = 0; i < 4; i++) {

  //   }
  // }
}

module.exports = Game;
