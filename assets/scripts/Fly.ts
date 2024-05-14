import {
  _decorator,
  Component,
  Node,
  Vec2,
  Input,
  input,
  EventTouch,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Fly")
export class Fly extends Component {
  // 偏移量/速度
  // v = new Vec2(0, 0);
  // 飞机移动速度
  speed = 1;
  start() {
    input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
  }
  protected onDestroy(): void {
    input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
  }
  update(deltaTime: number) {
    // 更新飞机位置
    // this.node.setPosition(
    //   this.node.position.x + this.v.x,
    //   this.node.position.y + this.v.y
    // );
  }
  onTouchMove(event: EventTouch) {
    // 获取距离上次偏移量
    let offset = event.getDelta();
    // 保存下位置
    let p = this.node.position;
    // 设置新位置
    this.node.setPosition(
      p.x + offset.x * this.speed,
      p.y + offset.y * this.speed
    );
  }
}
