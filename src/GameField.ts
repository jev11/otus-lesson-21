import { Cell } from "./types/Cell";

export interface IGameField {
  getState(): Cell[][];
  toggleCellState(x: number, y: number): void;
  nextGeneration() : void;
  setSize(width: number, height: number): void;
  isAnyoneAlive() : boolean;
}

export class GameField  implements IGameField {
  field: Cell[][];

  width: number;

  height: number;

  constructor(width = 0, height = 1) {
    this.width = width;
    this.height = height;
    this.field = this.getState();
  }

  getState(): Cell[][] {
    if (this.field === undefined) {
      this.field = Array.from<number>({ length: this.height }).map(() =>
      Array.from<number>({ length: this.width }).fill(0));
    }
    return this.field;
  }

  private getCellState(field: number[][], x: number, y: number) : number{
    const row = this.field[y];
    if (row === undefined) {
      return 0;
    }
    const cell = row[x];
    if (cell === undefined) {
      return 0;
    }
    return cell;
  }

   private getNumOfAliveNeighbours(column: number, row: number, field: number[][]) {
    let neighbours = 0;
    for (let j = column - 1; j <= column + 1; j += 1) {
      neighbours += Number(this.getCellState(field, j, row - 1));
    }

    for (let j = column - 1; j <= column + 1; j += 1) {
      neighbours += Number(this.getCellState(field, j, row + 1));
    }

    neighbours += Number(this.getCellState(field, column - 1, row));
    neighbours += Number(this.getCellState(field, column + 1, row));

    return neighbours;
  }

  // eslint-disable-next-line class-methods-use-this
  private getNewCellState(currentCellState: number, numOfAliveNeighbours: number) : number{
    if (numOfAliveNeighbours === 3) {
      return 1;
    }
    if (numOfAliveNeighbours > 3 || numOfAliveNeighbours < 2) {
      return 0;
    }
    if (numOfAliveNeighbours === 2 && currentCellState === 1) {
      return 1;
    }
    return 0;
  }

  isAnyoneAlive() : boolean {
    for (let i = 0; i < this.field.length; i += 1) {
      const row = this.field[i];
      for (let j = 0; j < row.length; j += 1) {
        const cell = row[j];
        if (cell) {
          return true;
        }
      }
    }
    return false;
  }

  toggleCellState(x: number, y: number)  :void{
    this.field[y][x] = this.field[y][x] === 0 ? 1 : 0;
    }

  nextGeneration() : void{
    const newState = this.field.map((row, rowIndex) =>
    row.map((cell, cellIndex) => {
      const an = this.getNumOfAliveNeighbours(cellIndex, rowIndex, this.field);
      const currentState = this.getCellState(this.field, cellIndex, rowIndex);
      const state = this.getNewCellState(currentState, an);
      return state;
    }));
    this.field = newState;
    // return newState;
  }

  setSize(width: number, height: number) : Cell[][]{
    const originalHeight = this.field.length;
    const originalWeight = this.field[0].length;

    if (height < originalHeight) {
      this.field.splice(height, originalHeight);
    } else {
      for (let r = originalHeight; r < height; r += 1) {
        this.field.splice(height, 0, Array(width).fill(0));
      }
    }
    if (width < originalWeight) {
      this.field.forEach((r) => {
        r.splice(width, originalWeight);
      });
    } else {
      this.field.forEach((r) => {
        for (let i = originalWeight; i < width; i += 1) {
          r.push(0);
        }
        r.splice(width);
      });
    }
    return this.field;
  }
}
