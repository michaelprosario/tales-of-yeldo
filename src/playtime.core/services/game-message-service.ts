/*
GameMessageService
publishMessage(gameMessage: GameMessage)
subscribe(node: IGameMessageSubscriber, topicId: number)

IGameMessageSubscriber
receiveMessage(message: GameMessage)
entityId: number

*/

import { GameNode } from "../entities/game-node";

export class GameMessageSubscription{
    constructor(public node: GameNode, public topicId: number){

    }
}

export class GameMessageService
{
    subscriptions: Array<GameMessageSubscription>;
    constructor()
    {
        this.subscriptions = [];
    }

    subscribe(node: GameNode, topicId: number)
    {
        let subscription = new GameMessageSubscription(node, topicId);
        this.subscriptions.push(subscription);
    }
}