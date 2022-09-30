import { Physics } from "phaser";
import { GameNode } from "../playtime.core/entities/game-node";
import { MessageTopics } from "../playtime.core/enums/message-topics";
import { MessageTypes } from "../playtime.core/enums/message-types";
import { GameMessageService } from "../playtime.core/services/game-message-service";
import { GameMessage } from "../playtime.core/value-objects/game-message";

export class BoxNode extends GameNode
{
    boxSprite: Phaser.GameObjects.Sprite;
    increment: number = 10;
    deltaX: number = 0;
    deltaY: number = 0;

    constructor(
        private scene: Phaser.Scene, 
        private messageService: GameMessageService
        )
    {
        super();

        this.boxSprite = scene.add.sprite(100, 100, 'box1');
        this.boxSprite.x = 100;
        this.boxSprite.y = 100;
        this.messageService.subscribe(this, MessageTopics.UserInput);
    }
    
    start() 
    {
    }

    update() 
    {
        this.boxSprite.x += this.deltaX;
        this.boxSprite.y += this.deltaY;
    }

    receiveMessage(message: GameMessage) 
    {
        if(message.messageType == MessageTypes.KeyDown)
        {
            this.onKeyDown(message); 
        }
        else if(message.messageType == MessageTypes.KeyUp)
        {
            this.deltaY = 0;
            this.deltaX = 0;
        }
    }

    private onKeyDown(message: GameMessage) {
        if (message.content === Phaser.Input.Keyboard.KeyCodes.UP) {
            this.deltaY = this.increment * -1;
            this.deltaX = 0;
        }
        else if (message.content === Phaser.Input.Keyboard.KeyCodes.DOWN) {
            this.deltaY = this.increment;
            this.deltaX = 0;
        }
        else if (message.content === Phaser.Input.Keyboard.KeyCodes.LEFT) {
            this.deltaX = this.increment * -1;
            this.deltaY = 0;
        }
        else if (message.content === Phaser.Input.Keyboard.KeyCodes.RIGHT) {
            this.deltaX = this.increment;
            this.deltaY = 0;
        }
    }
}