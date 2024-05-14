import { _decorator, Component, Node, Input, EventTouch } from "cc";
const { ccclass, property } = _decorator;

@ccclass("FlyUi")
export class FlyUi extends Component {
  @property(Node)
  fly: Node;
  start() {
    this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
  }
  protected onDestroy(): void {
    this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
  }
  update(deltaTime: number) {}
  // 飞机移动
  onTouchMove(event: EventTouch) {
    // 获取距离上次偏移量
    let offset = event.getUIDelta();
    let oldP = this.fly.position;
    this.fly.setPosition(oldP.x + offset.x, oldP.y + offset.y);
  }
}
