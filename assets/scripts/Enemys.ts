import {
  _decorator,
  CCInteger,
  Collider2D,
  Component,
  Contact2DType,
  Node,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Enemy")
export class Enemy extends Component {
  @property(CCInteger)
  speedTime = 3;
  @property(CCInteger)
  HP = 2; // 需要打几下
  _deadCallBack: () => void;
  _target: any;

  start() {}
  protected onEnable(): void {
    // 组件启用，节点激活
    let collider = this.node.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }
  protected onDisable(): void {
    // 组件禁用，节点无效
    let collider = this.node.getComponent(Collider2D);
    if (collider) {
      collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }
  update(deltaTime: number) {
    // 敌机飞出屏幕销毁
    if (this.node.position.y < -250) {
      console.log("敌机越级销毁");

      this.node.destroy();
    }
  }
  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    // console.log("开始碰撞");
    console.log(otherCollider);
    if (otherCollider.group === 4) {
      console.log("子弹碰到敌机");
      this.HP--;
      // 销毁子弹
      otherCollider.node.destroy();
      if (this.HP <= 0) {
        // 计算得分
        this._deadCallBack.call(this._target);
        // 敌机
        this.node.destroy();
      }
    }
    if (otherCollider.group === 8) {
      console.log("飞机碰到敌机");
      this.node.destroy();
    }
  }
  // game.ts的回调函数
  // 思路：敌机在game.ts创建后调用onDeadCallBack，onDeadCallBack注册函数，在敌机销毁时，吧game.ts传过来的函数执行
  onDeadCallBack(callBack: () => void, target) {
    this._deadCallBack = callBack;
    this._target = target;
  }
}
