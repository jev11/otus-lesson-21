import { Game } from "../src/Game";
import { GameField } from "../src/GameField";
import { GameView } from "../src/GameView";

const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));

describe("Game", () => {
  let game: Game;
  let gameView: GameView;
  let gameField: GameField;
  let stepDurationMs: number;

  const clickEvent = new Event("click", {
    bubbles: true
  });
  const changeEvent = new Event("change", {
    bubbles: true
  });
  const inputEvent = new Event("input", {
    bubbles: true
  });

  document.body.innerHTML = '<div id="app"></div>';
  const el = document.getElementById("app") as HTMLElement;

  beforeEach(() => {
    gameView = new GameView(el);
    gameField = new GameField(3, 3);
    game =  new Game(gameField, gameView, stepDurationMs);
    stepDurationMs = 1000;
  })

  it("Game is a class", () => {
    expect(Game).toBeInstanceOf(Function);
    expect(game).toBeInstanceOf(Game);
  });

  it("GameField is a class", () => {
    expect(GameField).toBeInstanceOf(Function);
    expect(gameField).toBeInstanceOf(GameField);
  });

  it("GameView is a class", () => {
    expect(GameView).toBeInstanceOf(Function);
    expect(gameView).toBeInstanceOf(GameView);
  });

  it("inititializes the game with empty field", () => {
    expect(gameField.getState()).toStrictEqual(
      [[0,0,0],
      [0,0,0],
      [0,0,0]]
    )
  });

  it("renders field", () => {
    expect(el.querySelectorAll(".gameField")).not.toBeNull();
    expect(el.querySelectorAll(".cell").length).toBe(9);
    expect(el.querySelectorAll(".cell.cell--alive").length).toBe(0);
    expect(el.querySelectorAll(".cell--dead").length).toBe(9);
  });

  it("renders control elements", () => {
    expect(el.querySelectorAll(".gameControls")).not.toBeNull();
    expect(el.querySelectorAll(".field-size")).not.toBeNull();
    expect(el.querySelectorAll(".speedRange")).not.toBeNull();
    expect(el.querySelectorAll(".run-button")).not.toBeNull();
    expect(el.querySelectorAll(".cell").length).toBe(9);
    expect(el.querySelectorAll(".cell.cell--alive").length).toBe(0);
    expect(el.querySelectorAll(".cell--dead").length).toBe(9);
  });


  it("Changes state on click and calculates next state", () => {
    (el.querySelector('table') as HTMLTableElement).rows[0].cells[0].dispatchEvent(clickEvent);
    (el.querySelector('table') as HTMLTableElement).rows[0].cells[1].dispatchEvent(clickEvent);
    (el.querySelector('table') as HTMLTableElement).rows[1].cells[0].dispatchEvent(clickEvent);
    expect(gameField.getState()).toStrictEqual(
      [[1,1,0],
      [1,0,0],
      [0,0,0]]);
    gameField.nextGeneration();
    expect(gameField.getState()).toStrictEqual(
      [[1,1,0],
      [1,1,0],
      [0,0,0]]);
  });

  it("Changes field size on Height and Width change", () => {
    const height = el.querySelector("input[type='number'].field-size.field-size--height") as HTMLInputElement;
    height.value = "5";
    height.dispatchEvent(changeEvent);
    expect(gameField.getState()).toStrictEqual(
      [[0,0,0],
      [0,0,0],
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ]);
    const width = el.querySelector("input[type='number'].field-size.field-size--width") as HTMLInputElement;
    width.value = "5";
    width.dispatchEvent(changeEvent);
    expect(gameField.getState()).toStrictEqual(
      [[0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ]);
  })

  it("toggles game state when clicked on Run button", () => {
    let button = el.querySelector('.run-button.run-button--stopped') as HTMLButtonElement;
    button.dispatchEvent(clickEvent);
    expect(game.isRunning).toBeTruthy();
    button = el.querySelector('.run-button.run-button--runned') as HTMLButtonElement;
    button.dispatchEvent(clickEvent);
    expect(game.isRunning).toBeFalsy();
  });

  it("changes game speed when slider is moved", () => {
    const range = <HTMLInputElement>el.querySelector(".slider");
    range.value = "1500";
    range.dispatchEvent(inputEvent);
    expect(game.speed).toBe(1500);
  });

  it("Stops when no cells left alive", async () => {
    window.alert = jest.fn();
    (el.querySelector('table') as HTMLTableElement).rows[0].cells[0].dispatchEvent(clickEvent);
    (el.querySelector('.run-button.run-button--stopped') as HTMLButtonElement).dispatchEvent(clickEvent);
    expect(game.isRunning).toBeTruthy();
    await sleep(stepDurationMs);
    expect(gameField.getState()).toStrictEqual(
      [[0,0,0],
      [0,0,0],
      [0,0,0]]
      );
    expect(game.isRunning).toBeFalsy();
  });
});
