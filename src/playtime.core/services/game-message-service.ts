import { GameNode } from "../entities/game-node";
import { AppResponse, ResponseCode } from "../responses/app-response";
import { GameMessageValidator } from "../validators/game-message-validator";
import { GameMessage } from "../value-objects/game-message";

export class GameMessageSubscription{
    constructor(public node: GameNode, public topicId: number){

    }
}

export class GameMessageService
{
    subscriptions: Array<GameMessageSubscription>;
    messageValidator: GameMessageValidator = new GameMessageValidator();
    constructor()
    {
        this.subscriptions = [];
    }

    publish(message: GameMessage)
    {
        let validator = new GameMessageValidator();
        let validationResults = validator.validate(message);
        if(validationResults.isInvalid())
        {
            let errorResponse = new AppResponse();
            errorResponse.code = ResponseCode.BadRequest;
            errorResponse.validationErrors = validationResults.getFailureMessages();
        }
    }

    subscribe(node: GameNode, topicId: number)
    {
        if(topicId === 0)
        {
            throw new Error("topicId is required");
        }

        if(!node)
        {
            throw new Error("Node is required");
        }

        let subscription = new GameMessageSubscription(node, topicId);
        this.subscriptions.push(subscription);
    }
}