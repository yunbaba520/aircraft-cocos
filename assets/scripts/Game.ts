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

  // 4中敌机
  @property(Prefab)
  enemy01Prefab: Prefab;
  @property(Prefab)
  enemy02Prefab: Prefab;
  @property(Prefab)
  enemy03Prefab: Prefab;
  @property(Prefab)
  enemy04Prefab: Prefab;

  _prefabBullet: Prefab; // 子弹预制体
  _score: number = 0; // 得分
  _enemy01Time = 0;
  _enemy02Time = 0;
  _enemy03Time = 0;
  _enemy04Time = 0;
  start() {}
  update(deltaTime: number) {}

  protected onEnable(): void {
    // 加载敌机
    this.schedule(() => {
      this.createEnemy();
    }, 0.2);

    // 飞机发射子弹
    this.schedule(() => {
      this.emitBullet();
    }, 0.5);
  }

  createEnemy() {
    this._enemy01Time++;
    this._enemy02Time++;
    this._enemy03Time++;
    this._enemy04Time++;
    if (this._enemy01Time == 5) {
      this.createEnemyByType("01");
      this._enemy01Time = 0;
    }
    if (this._enemy02Time == 8) {
      this.createEnemyByType("02");
      this._enemy02Time = 0;
    }
    if (this._enemy03Time == 15) {
      this.createEnemyByType("03");
      this._enemy03Time = 0;
    }
    if (this._enemy04Time == 25) {
      this.createEnemyByType("04");
      this._enemy04Time = 0;
    }
  }

  // 发射子弹
  emitBullet() {
    let createOne = () => {
      let bulletNode = instantiate(this._prefabBullet);
      this.bullets.addChild(bulletNode);
      bulletNode.setWorldPosition(this.fly.worldPosition);
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
    this.scoreLabel.getComponent(Label).string = `得分:${this._score}`;
  }
  // 创建一级飞机
  createEnemyByType(type: string) {
    let enemyNode;
    switch (type) {
      case "01":
        enemyNode = instantiate(this.enemy01Prefab);
        break;
      case "02":
        enemyNode = instantiate(this.enemy02Prefab);
        break;
      case "03":
        enemyNode = instantiate(this.enemy03Prefab);
        break;
      case "04":
        enemyNode = instantiate(this.enemy04Prefab);
        break;
      default:
        enemyNode = instantiate(this.enemy01Prefab);

        break;
    }

    enemyNode.getComponent(Enemy).onDeadCallBack(this.addScore, this);
    this.enemys.addChild(enemyNode);
    // 飞机起始位置
    enemyNode.setPosition(randomRangeInt(-120, 120), randomRangeInt(200, 240));
    // 飞机一直向下 -300表示超出画面

    tween(enemyNode)
      .to(enemyNode.getComponent(Enemy).speedTime || 3, {
        position: new Vec3(
          randomRangeInt(this.fly.position.x - 30, this.fly.position.x + 30),
          -300
        ),
      })
      .start();
  }
}
