import { GameField, IGameField } from "./GameField";
import { GameView, IGameView } from "./GameView";
import { Cell } from "./types/Cell";

export class Game  {

  gameField: IGameField;

  gameView: IGameView;

  stepDurationMs: number;

  state: Cell[][] | undefined;

  timer: number | undefined;

  speed: number;

  isRunning: boolean;


  constructor(gameField: GameField, gameView: GameView, stepDurationMs = 1000) {
    this.gameView = gameView;
    this.gameField = gameField;
    this.stepDurationMs = stepDurationMs;
    this.speed = 1000;
    this.isRunning = false;
    this.initialize();
  }

  protected initialize() : void {
    this.state = this.gameField.getState();
    this.gameView.updateGameField(this.state);
    this.gameView.updateGameState({
      isRunning: false,
      width: this.state[0].length,
      height: this.state.length
    });
    this.gameView.onSpeedChange(this.onSpeedChange.bind(this));
    this.gameView.onCellClick(this.onCellClick.bind(this));
    this.gameView.onFieldSizeChange(this.onFieldSizeChange.bind(this)); // не уверен, что привязка контекста таким образом правильно
    this.gameView.onGameStateChange(this.onGameStateChange.bind(this));
  }

  onCellClick(x: number, y: number) :void {
    this.gameField.toggleCellState(x, y);
    this.state = this.gameField.getState();
    this.gameView.updateGameField(this.state);
  }

  onFieldSizeChange(width: number, height: number) : void {
    this.gameField.setSize(width, height);
    this.state = this.gameField.getState();
    this.gameView.updateGameField(this.state);
    this.gameView.updateGameState({width, height});
  }

  runGame() : void {
    if (this.isRunning) {
      this.timer = window.setInterval(() => {
        this.gameField.nextGeneration();
        this.state = this.gameField.getState();
        this.gameView.updateGameField(this.state);
        if(!this.gameField.isAnyoneAlive()) {
          this.gameView.updateGameState({isRunning: false});
          this.isRunning = false;
          setTimeout(() => {window.alert("No cells left!")}, 10);
          window.clearInterval(this.timer);
        }
      }, this.speed);
    }
  }

  onSpeedChange(speed: number) : void {
    this.speed = speed;
    window.clearInterval(this.timer);
    this.runGame();
  }


  onGameStateChange(isRunning: boolean) : void {
    this.gameView.updateGameState({isRunning});
    if (isRunning) {
      this.isRunning = true
      this.runGame();
      } else {
        this.gameView.updateGameState({isRunning: false});
        this.isRunning = false;
        window.clearInterval(this.timer);
      }
    }
}
