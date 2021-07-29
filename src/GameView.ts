import { Cell } from "./types/Cell";

export interface IGameView {
  updateGameField(field: Cell[][]) : void;
  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  }) : void;
  onCellClick(cb: (x: number, y: number) => void) : void;
  onGameStateChange(cb: (newState: boolean) => void) : void;
  onFieldSizeChange(cb: (width: number, height: number) => void) : void;
  onSpeedChange(cb: (speed: number) => void) : void;
}

export class GameView implements IGameView {
  el: HTMLElement;


  // width = 10;

  // height = 10;

  // isRunning: boolean;

  constructor(element: HTMLElement) {
    this.el = element;
    // this.isRunning = false;
    this.el.innerHTML = `
      <div class="gameField"></div>
      <div class="gameControls">
      <div class="field-size">
        <label>Width:</label>
        <input type='number' class="field-size field-size--width" name="width" value=10><br>
        <label>Height:</label>
        <input type='number' class="field-size field-size--height" name="height" value=10><br>
      </div>
        <div class="speedRange">
          <span>Faster</span>
          <input type="range" min="100" max="2000" step="100" value="1000" class="slider">
          <span>Slower</span>
        </div>
        <div class="run-button">
        <button class="run-button run-button--stopped">Play</button>
        </div>
      </div>
      `;
  }

  updateGameField(field: Cell[][]) : void {
    const rowIterator = (row: number[], rowIndex: number) => `<tr>${row
        .map((cell, columnIndex) => {
          if (cell === 1) {
            return `<td
          data-x=${columnIndex}
          data-y=${rowIndex}
          class="cell cell--alive"></td>`;
          }
          return `<td
        data-x=${columnIndex}
        data-y=${rowIndex}
        class="cell cell--dead"></td>`;
        })
        .join("")}</tr>`;

    const table = `<table border=1">${field.map(rowIterator).join("")}</table>`;
    const gameField = <HTMLElement>this.el.querySelector(".gameField");
    gameField.innerHTML = table;
  }

  updateGameState(state: { width: number | undefined; height?: number | undefined; isRunning?: boolean | undefined; }) : void {
    if (state.width !== undefined && state.height !== undefined) {
    const fieldSizeEl = <HTMLElement>this.el.querySelector(".field-size");
      fieldSizeEl.innerHTML = `
      <label>Width:</label>
      <input type="number" class="field-size field-size--width" name="width" value=${state.width}><br>
      <label>Height:</label>
      <input type="number" class="field-size field-size--height" name="height" value=${state.height}><br>
      `
    }

    if (state.isRunning !== undefined) {
      const runButtonEl = <HTMLElement>this.el.querySelector(".run-button");
      if (state.isRunning) {
        runButtonEl.innerHTML=`
          <button class="run-button run-button--runned">Stop</button>
        `
      } else {
        runButtonEl.innerHTML = `
          <button class="run-button run-button--stopped">Play</button>
      `
      }
    }
  }

  onCellClick(cb: (x: number, y: number) => void) : void {
    const table = <HTMLElement>this.el.querySelector(".gameField");
    table.addEventListener("click", (ev) => {
      const clickedElement = ev.target;
      // @ts-ignore
      const x = clickedElement.getAttribute("data-x");
      // @ts-ignore
      const y = clickedElement.getAttribute("data-y");
      if (x >= 0 && y >= 0) {
        cb(Number(x), Number(y));
      }
    });
  }

  onSpeedChange(cb: (speed: number) => void) : void {
    const range = <HTMLInputElement>this.el.querySelector(".slider");
    // console.log(range);
    range.addEventListener("input", () => {
      cb(Number(range.value));

    })

  }

  onGameStateChange(cb: (newState: boolean) => void) : void {
    const buttonEl = <HTMLElement>this.el.querySelector(".run-button");
    buttonEl.addEventListener("click", (ev) => {
      // @ts-ignore
      const newState = ev.target.innerHTML === 'Play';
      cb(newState);
    });
  }

  onFieldSizeChange(cb: (width: number, height: number) => void) : void {
    const inputEl = <HTMLElement>this.el.querySelector(".field-size");
    inputEl.addEventListener("change", () => {
      const width = (this.el.querySelector("input[type='number'].field-size.field-size--width") as HTMLInputElement).value;
      const height = (this.el.querySelector("input[type='number'].field-size.field-size--height")as HTMLInputElement).value;
      cb(Number(width), Number(height));
    });
  }
}