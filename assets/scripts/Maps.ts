import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Maps")
export class Maps extends Component {
  speed = 1;
  start() {}

  update(deltaTime: number) {
    // 修改位置
    for (let i = 0; i < this.node.children.length; i++) {
      const map = this.node.children[i];
      if (map.position.y - this.speed <= -480) {
        map.setPosition(map.position.x, 480);
      }
      map.setPosition(map.position.x, map.position.y - this.speed);
    }
  }
}
