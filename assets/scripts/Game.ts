import {
  _decorator,
  Component,
  EventKeyboard,
  EventTouch,
  Input,
  input,
  instantiate,
  KeyCode,
  Label,
  Node,
  Prefab,
  randomRangeInt,
  resources,
  tween,
  Vec3,
} from "cc";
import { Fly } from "./Fly";
import { Enemy } from "./Enemys";
const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
  @property(Node)
  fly: Node;
  @property(Node)
  enemys: Node;
  @property(Node)
  bullets: Node;
  @property(Node)
  scoreLabel: Node;

  _fly: Fly; // 飞机
  _prefabEnemy: Prefab; // 敌机预制体
  _prefabBullet: Prefab; // 子弹预制体
  _score: number = 0; // 得分
  protected onLoad(): void {
    this._fly = this.fly.getComponent(Fly);
  }
  start() {
    // 监听键盘输入
    // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    // input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    // 加载敌机
    this.schedule(() => {
      this.createEnemy();
    }, 1);

    // 飞机发射子弹
    this.schedule(() => {
      this.emitBullet();
    }, 0.5);
  }
  protected onDestroy(): void {
    // input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    // input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
  }
  update(deltaTime: number) {}

  // onKeyDown(event: EventKeyboard) {
  //   console.log("down->>>", event.keyCode);
  //   switch (event.keyCode) {
  //     case KeyCode.KEY_A:
  //       this._fly.v.set(-3, 0);
  //       break;
  //     case KeyCode.KEY_D:
  //       this._fly.v.set(3, 0);

  //       break;
  //     case KeyCode.KEY_W:
  //       this._fly.v.set(0, 3);

  //       break;
  //     case KeyCode.KEY_S:
  //       this._fly.v.set(0, -3);

  //       break;
  //     default:
  //       break;
  //   }
  // }

  // onKeyUp(event: EventKeyboard) {
  //   console.log("up->>>", event.keyCode);
  //   switch (event.keyCode) {
  //     case KeyCode.KEY_A:
  //       this._fly.v.set(0, 0);
  //       break;
  //     case KeyCode.KEY_D:
  //       this._fly.v.set(0, 0);

  //       break;
  //     case KeyCode.KEY_W:
  //       this._fly.v.set(0, 0);

  //       break;
  //     case KeyCode.KEY_S:
  //       this._fly.v.set(0, 0);

  //       break;
  //     default:
  //       break;
  //   }
  // }

  createEnemy() {
    let createOne = () => {
      let enemyNode = instantiate(this._prefabEnemy);
      enemyNode.getComponent(Enemy).onDeadCallBack(this.addScore, this);
      this.enemys.addChild(enemyNode);
      // 飞机起始位置
      enemyNode.setPosition(
        randomRangeInt(-120, 120),
        randomRangeInt(200, 240)
      );
      // 飞机一直向下 -300表示超出画面
      tween(enemyNode)
        .to(3, {
          position: new Vec3(
            randomRangeInt(
              this._fly.node.position.x - 30,
              this._fly.node.position.x + 30
            ),
            -300
          ),
        })
        .start();
    };
    if (this._prefabEnemy) {
      // 资源已加载
      createOne();
    } else {
      resources.load("Enemy01", (err, data) => {
        if (err) {
          console.error("加载敌机预制体失败", err);
          return;
        }
        this._prefabEnemy = data as Prefab;

        createOne();
      });
    }
  }

  // 发射子弹
  emitBullet() {
    let createOne = () => {
      let bulletNode = instantiate(this._prefabBullet);
      this.bullets.addChild(bulletNode);
      bulletNode.setWorldPosition(this._fly.node.worldPosition);
    };
    if (this._prefabBullet) {
      // 资源已加载
      createOne();
    } else {
      resources.load("Bullet", (err, data) => {
        if (err) {
          console.error("加载子弹预制体失败", err);
          return;
        }
        this._prefabBullet = data as Prefab;
        createOne();
      });
    }
  }
  // 加分
  addScore() {
    this._score++;
    this.scoreLabel.getComponent(Label).string = `${this._score}`;
  }
}
