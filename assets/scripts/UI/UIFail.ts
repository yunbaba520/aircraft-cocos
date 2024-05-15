import { _decorator, Component, director, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("UIFail")
export class UIFail extends Component {
  start() {}

  update(deltaTime: number) {}

  onAgainBtnClick() {
    console.log("again");
    // director.purgeDirector();
    // director.reset();
    if (director.isPaused()) {
      director.resume();
    }
    director.loadScene(director.getScene().name);
    // this.node.active = false;
  }
  onGoHomeBtnClick() {
    this.node.active = false;
    if (director.isPaused()) {
      director.resume();
    }
    director.loadScene("Home");
  }
}
