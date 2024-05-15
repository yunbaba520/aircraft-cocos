import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Fly")
export class Fly extends Component {
  HP = 3;
  start() {}

  update(deltaTime: number) {}
}
