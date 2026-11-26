import express = require('express');
import bodyParser = require('body-parser');

const PORT: number = 8080;
const PUBLIC_DIR = 'client'

import { QuoridorGame, createNewGame, newTurn } from "./game";
import { movePawnToPosition } from "./pawn-movement";
import { Player } from "./pawn";
import { Position } from "./position";
import { placeFenceAtPositions } from './fence-placement';

class HttpServer {
  game: QuoridorGame;
  port: number;
  app = express();
  currentPlayer: Player;
  state: GameState = GameState.Create;

  constructor(port: number) {
    this.port = port;
  }

  public onStart(): void {

    const app: express.Application = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(PUBLIC_DIR));
    app.set('view engine', 'ejs')

    app.listen(this.port, () => {
      console.log("Application lancée à l'adresse http://localhost:" + this.port);
    });

    app.get('/', (req: express.Request, res: express.Response) => {
      res.render('index', { error: null });
    })

    app.get("/status.js", (req: express.Request, res: express.Response) => {
      res.end("var gameJSON = " + JSON.stringify(this.game) + ";\n" +
              "var state = " + JSON.stringify(this.state) + ";"
      );
    });

    app.post("/endTour", (req: express.Request, res: express.Response) => {
      this.endTour();
      res.render('index', { error: '' });
    });

    app.post("/move", (req: express.Request, res: express.Response) => {
      const unparsedMove: string = req.body.move;
      console.log('moving to: ' + unparsedMove);
      const didPerform: boolean = this.processMove(unparsedMove);
      if (didPerform) {
        this.state = GameState.Place;
      }
      const message: string = didPerform ? "" : "Invalid movement!"
      res.render('index', { error: message });
    });

    app.post("/place", (req: express.Request, res: express.Response) => {
      const unparsedFrom: string = req.body.from;
      const unparsedTo: string = req.body.to;
      console.log('Place fence from: ' + unparsedFrom + ' to: ' + unparsedTo);
      const didPerform: boolean = this.processFence(unparsedFrom, unparsedTo);
      if (didPerform) {
        this.currentPlayer.nbFencesAvailable--;
        this.endTour();
      }

      const message: string = didPerform ? "" : "Invalid fence placement!"
      res.render('index', { error: message });
    });

    app.post("/create", (req: express.Request, res: express.Response) => {
      let playersCount: number = parseInt(req.body.players);
      if (playersCount < 2 || playersCount > 4) {
        playersCount = 2;
      }
      console.log("Creating a game for " + playersCount + " players");
      this.game = createNewGame(playersCount);
      this.currentPlayer = newTurn(this.game);
      this.state = GameState.Move;

      res.render('index', { error: '' });
    });
  }

  public processMove(unparsedMove: string): boolean {
    const nextPosition: Position | undefined = parsePosition(unparsedMove);
    if (nextPosition == undefined) return false;

    return movePawnToPosition(this.game.gameBoard, this.currentPlayer.pawn, nextPosition);
  }

  public processFence(unparsedFrom: string, unparsedTo: string): boolean {
    const fromPosition: Position | undefined = parsePosition(unparsedFrom);
    const toPosition: Position | undefined = parsePosition(unparsedTo);
    if (fromPosition == undefined || toPosition == undefined) return false;

    return placeFenceAtPositions(this.game.gameBoard, fromPosition, toPosition);
  }

  private endTour(): void {
    this.currentPlayer = newTurn(this.game);
    this.state = GameState.Move;
  }

}

function parsePosition(unparsedPosition: string): Position | undefined {
  const coordinates = unparsedPosition.split(',');
  if (coordinates.length != 2) return undefined;
  const rank: number = parseInt(coordinates[0]);
  const file: number = parseInt(coordinates[1]);
  if (isNaN(rank) || isNaN(file)) return undefined;

  return {rank: rank, file: file};
}

enum GameState {
  Create,
  Move,
  Place
}


const server: HttpServer = new HttpServer(PORT)
server.onStart();