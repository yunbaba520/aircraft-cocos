import { _decorator, Component, director, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Home")
export class Home extends Component {
  start() {}

  update(deltaTime: number) {}
  onPlayBtnClick() {
    console.log("按钮点击");

    director.loadScene("Main");
  }
}
