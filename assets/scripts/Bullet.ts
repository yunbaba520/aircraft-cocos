import { _decorator, Component, Node, Vec2 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Bullet")
export class Bullet extends Component {
  speed: Vec2 = new Vec2(0, 5); // 子弹速度
  isMoveing: boolean = true;
  start() {}

  update(deltaTime: number) {
    if (this.isMoveing) {
      this.node.setPosition(
        this.node.position.x + this.speed.x,
        this.node.position.y + this.speed.y
      );
      if (this.node.position.y > 250) {
        this.node.destroy();
      }
    }
  }
}
