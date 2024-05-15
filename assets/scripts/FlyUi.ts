import {
  _decorator,
  Component,
  Node,
  Input,
  EventTouch,
  Collider2D,
  Contact2DType,
  director,
  game,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("FlyUi")
export class FlyUi extends Component {
  @property(Node)
  fly: Node;

  @property(Node)
  uiFail: Node;
  start() {}

  update(deltaTime: number) {}
  protected onEnable(): void {
    console.log("flyui激活");
    this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    let collider = this.fly.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }
  protected onDestroy(): void {
    console.log("flyui销毁");

    this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
  }
  protected onDisable(): void {
    console.log("flyui禁用");

    let collider = this.fly.getComponent(Collider2D);
    if (collider) {
      collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }
  // 飞机移动
  onTouchMove(event: EventTouch) {
    // 获取距离上次偏移量
    let offset = event.getUIDelta();
    let oldP = this.fly.position;
    this.fly.setPosition(oldP.x + offset.x, oldP.y + offset.y);
  }
  // 飞机相撞
  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    if (otherCollider.group === 2) {
      console.log("飞机相撞");
      // 暂停
      director.pause();
      // 显示出失败画面
      this.uiFail.active = true;
    }
  }
}
