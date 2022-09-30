import Phaser from 'phaser';
import { InputController } from '../controllers/input-controller';
import { BoxNode } from '../nodes/box-node';
import { GameMessageService } from '../playtime.core/services/game-message-service';

export default class Demo extends Phaser.Scene {

  boxNode: BoxNode | undefined;
  gameMessageService: GameMessageService | undefined;
  inputController: InputController | undefined;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('box1', '../assets/images/box1.png');
  }

  create() {
    this.gameMessageService = new GameMessageService();
    this.inputController = new InputController(this, this.gameMessageService);
    this.boxNode = new BoxNode(this, this.gameMessageService);
  }

  update(time: number, delta: number): void {
    this.inputController?.update();
    this.gameMessageService?.update();
    this.boxNode?.update();
  }
}
