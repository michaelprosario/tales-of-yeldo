import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { GameMessageValidator } from '../src/playtime.core/validators/game-message-validator'
import { GameMessage } from '../src/playtime.core/value-objects/game-message';

@suite class GameMessageServiceTests {

  before() {

  }

  @test 'GameMessageValidator should return false'() 
  {
    // arrange
    let validator = new GameMessageValidator();
    let gameMessage = new GameMessage();

    // act
    let response = validator.validate(gameMessage);

    // assert
    _chai.assert(response.getFailures().length >  0, "Has many failures");
  }

  @test 'GameMessageValidator should return true'() 
  {
    // arrange
    let validator = new GameMessageValidator();
    let gameMessage = new GameMessage();
    gameMessage.content = { 'x': 3, 'y': 4 };
    gameMessage.messageType = 1;
    gameMessage.topic = 3;
    gameMessage.source = "yourMomma";
    
    // act
    let response = validator.validate(gameMessage);

    // assert
    _chai.assert(response.getFailures().length === 0, "Has no failures");
  }
  
}