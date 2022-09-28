export abstract class GameNode
{
  children: Array<GameNode> = [];
  id: string = "";
  isActive: boolean = true;
  parent: GameNode | undefined = undefined;
  startTime: number = 0;
  abstract start(): any;
  abstract update(): any;
}
