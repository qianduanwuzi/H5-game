<template>
  <div class="dumpling_box">
    <temp-content
      :tempInfo="homeList"
      titleUrl="/dumpling23/default_title.png"
      ref="tempContent"
    >
      <div class="play" @click="showGame"></div>
    </temp-content>
    <!-- load按需加载 -->
    <template v-if="load">
      <game-container
        :tempInfo="homeList"
        :show.sync="show"
        :score="score"
        ref="gameContainer"
        @timeover="stop = true"
      >
        <canvas id="zebra_cross"></canvas>
      </game-container>
    </template>
  </div>
</template>

<script>
import tempCommon from "@/mixins/tempCommon";
import zebra_cross from "@/assets/images/23/zebra_cross.png";
import player from "@/assets/images/23/player.png";
import enemy_car_1 from "@/assets/images/23/enemy_car_1.png";
import enemy_car_2 from "@/assets/images/23/enemy_car_2.png";
import bonus_1 from "@/assets/images/23/bonus_1.png";
import bonus_2 from "@/assets/images/23/bonus_2.png";
import left_green_fence from "@/assets/images/23/left_green_fence.png";
import right_green_fence from "@/assets/images/23/right_green_fence.png";
import { postGameResult } from "@/api/api.js";
export default {
  mixins: [tempCommon],
  components: {
    GameContainer: () => import("../../components/business/game/Index")
  },
  props: {},
  data() {
    return {
      show: false,
      load: false,
      imgArr: {
        player,
        enemy_car_1,
        enemy_car_2,
        bonus_1,
        bonus_2,
        left_green_fence,
        right_green_fence,
        zebra_cross
      },
      images: {},
      canvas: null,
      ctx: null,
      clientWidth: 0,
      enemyCar: [],
      dumplingBonus: [],
      playerCarXY: [], //玩家车二维坐标
      moveStartXY: [], //移动点起始二维坐标
      enemyCarTimer: null,
      dumplingTimer: null,
      runningTimer: null,
      stop: false,
      score: 0,
      tempGameId: null
    };
  },

  created() {},
  mounted() {
    // this.$flatDialog.open({title: '排行榜'})
    //  this.$flatSheet.open({tipId: 10})
    // console.log('38', this.imgArr.player)
  },
  computed: {},
  methods: {
    // 初始化
    init() {
      this.score = 0;
      this.playerCarXY = [];
      this.moveStartXY = [];
      this.enemyCar = [];
      this.dumplingBonus = [];
      this.stop = false;
      this.clientWidth = document.documentElement.clientWidth;
      this.clientHeight = document.documentElement.clientHeight;
      var findTimer = setInterval(() => {
        if (document.getElementById("zebra_cross")) {
          this.canvas = document.getElementById("zebra_cross");
          this.canvas.width = this.clientWidth - 20;
          this.canvas.height = this.clientHeight;
          // 绑定处理
          this.canvas.addEventListener("touchstart", this.moveStartFunc, false);
          this.canvas.addEventListener("touchmove", this.moveFunc, false);
          this.canvas.addEventListener("touchend", this.endFunc, false);
          this.ctx = this.canvas.getContext("2d");
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.loading();
          this.paintCross();
          clearInterval(findTimer);
        }
      }, 10);
      // this.canvas.width= this.clientWidth - 20;
      // this.canvas.height = this.clientHeight;
      // // 绑定处理
      // this.canvas.addEventListener("touchstart", this.moveStartFunc, false);
      // this.canvas.addEventListener("touchmove", this.moveFunc, false);
      // this.canvas.addEventListener("touchend", this.endFunc, false);
      // this.ctx = this.canvas.getContext('2d');
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // this.loading()
      // this.paintCross()
    },
    // 加载所需图片
    loading() {
      const _this = this;
      const imgSrcs = Object.entries(this.imgArr);
      let time = 0;
      for (let [k, v] of imgSrcs) {
        this.images[k] = new Image();
        this.images[k].src = v;
        this.images[k].onload = function() {
          time++;
          if (time == imgSrcs.length) {
            // 资源加载ok
            _this.$refs.gameContainer.countDown();
            _this.paintGreenFence();
            _this.paintCar();
            _this.paintEnemyCar();
          }
        };
      }
    },
    // 绘制玩家操作的车
    paintCar() {
      // 初始位置
      if (!this.playerCarXY.length)
        this.playerCarXY = [
          this.canvas.width / 2 - 32.5,
          this.canvas.height - 200
        ];
      this.isCrashEnemyCar();
      this.ctx.drawImage(
        this.images.player,
        this.playerCarXY[0],
        this.playerCarXY[1],
        65,
        128
      );
    },
    moveStartFunc(e) {
      let t = e.touches[0];
      this.moveStartXY = [t.clientX, t.clientY];
      if (
        this.playerCarXY[0] + 25 <= t.clientX &&
        t.clientX <= this.playerCarXY[0] + 65 + 25 &&
        this.playerCarXY[1] <= t.clientY &&
        t.clientY <= this.playerCarXY[1] + 128
      ) {
        // 起始点在player车内方可拖拽
        this.canMove = true;
      } else this.canMove = false;
      // console.log('start', this.moveStartXY)
    },
    moveFunc(e) {
      var touch = e.touches[0];
      if (this.canMove) this.isInArea(touch);
      // console.log('移动到', touch.clientX, touch.clientY)
    },
    endFunc() {
      this.canMove = false;
      // console.log('拖拽点', this.moveStartXY)
      // console.log('断层点', e.touches[0].clientX, e.touches[0].clientY)
      //  console.log('结束了')
    },
    // 判断移动点在玩家车区域内
    isInArea(t) {
      // console.log(this.playerCarXY, t.clientX, t.clientY)
      // if(this.playerCarXY[0] + 25 <= t.clientX &&
      //   t.clientX <= (this.playerCarXY[0] + 65 + 25) &&
      //   this.playerCarXY[1] <= t.clientY &&
      //   t.clientY <= (this.playerCarXY[1] + 128)
      //   ){
      // console.log('在')
      // console.log('player', this.playerCarXY[0], this.playerCarXY[1])
      // console.log('移动', t.clientX, t.clientY)
      this.playerCarXY = [
        this.playerCarXY[0] - (this.moveStartXY[0] - t.clientX),
        this.playerCarXY[1] - (this.moveStartXY[1] - t.clientY)
      ];
      // this.isPickDumpligs()
      // 边界情况处理
      let has = false;
      if (this.playerCarXY[0] <= 15) {
        has = true;
        this.$set(this.playerCarXY, 0, 15);
        this.$set(this.moveStartXY, 1, t.clientY);
      }
      // console.log(this.canvas.width)
      if (this.playerCarXY[0] >= this.clientWidth - 100) {
        has = true;
        this.$set(this.playerCarXY, 0, this.clientWidth - 100);
        this.$set(this.moveStartXY, 1, t.clientY);
      }
      if (this.playerCarXY[1] <= 0) {
        has = true;
        this.$set(this.playerCarXY, 1, 0);
        this.$set(this.moveStartXY, 0, t.clientX);
      }
      if (this.playerCarXY[1] >= this.clientHeight - 128) {
        has = true;
        this.$set(this.playerCarXY, 1, this.clientHeight - 128);
        this.$set(this.moveStartXY, 0, t.clientX);
      }
      if (!has) this.moveStartXY = [t.clientX, t.clientY];
      // console.log('120', this.moveStartXY)
      // return true
      // }
      // else return false
    },
    // 判断撞敌车
    isCrashEnemyCar() {
      for (let i in this.enemyCar) {
        if (
          (this.playerCarXY[0] + 65 >= this.enemyCar[i][1] &&
            this.playerCarXY[0] + 65 <= this.enemyCar[i][1] + 65) ||
          (this.playerCarXY[0] >= this.enemyCar[i][1] &&
            this.playerCarXY[0] <= this.enemyCar[i][1] + 65)
        ) {
          // 考虑车的图片尾部尾气可忽略部分撞击，所以减去10
          if (
            (this.playerCarXY[1] + 128 - 10 >= this.enemyCar[i][2] &&
              this.playerCarXY[1] + 128 <= this.enemyCar[i][2] + 128) ||
            (this.playerCarXY[1] >= this.enemyCar[i][2] &&
              this.playerCarXY[1] <= this.enemyCar[i][2] + 128 - 10)
          ) {
            this.$refs.gameContainer.clearTimer();
            this.stop = true;
            break;
          }
        }
      }
    },
    // 挑战成功/失败
    gameFinish() {
      // 保存此次挑战结果
      postGameResult({
        points: this.score,
        aid: localStorage.getItem("aid")
      }).then(res => {
        if (this.score >= this.homeList.draw_limit) {
          this.$flatSheet.open({
            tipId: 9,
            score: this.score,
            ...res.data,
            playAgainCb: () => {
              this.init();
            },
            bonusCb: () => {
              this.tempGameId = res.data.game_id;
              if (this.validateState("", true))
                this.getBonus("", false, res.data.game_id);
            },
            callback: () => {
              this.show = false;
              this.load = false;
            }
          });
        } else {
          this.$flatSheet.open({
            tipId: 10,
            score: this.score,
            ...res.data,
            draw_limit: this.homeList.draw_limit,
            playAgainCb: () => {
              this.init();
            },
            backToIndexCb: () => {
              this.show = false;
              this.load = false;
            },
            callback: () => {
              this.show = false;
              this.load = false;
            }
          });
        }
      });
    },
    // 直接再次抽奖
    bonusAgain() {
      if (this.validateState("", true))
        this.getBonus("", false, this.tempGameId);
    },
    // 判断捡粽子
    isPickDumpligs() {
      // dumplingBonus
      let inds = [];
      for (let i in this.dumplingBonus) {
        if (
          (this.playerCarXY[0] + 65 >= this.dumplingBonus[i][1] &&
            this.playerCarXY[0] + 65 <= this.dumplingBonus[i][1] + 66) ||
          (this.playerCarXY[0] >= this.dumplingBonus[i][1] &&
            this.playerCarXY[0] <= this.dumplingBonus[i][1] + 66)
        ) {
          // console.log('x轴相交了', this.playerCarXY[1], this.dumplingBonus[i][2])
          if (
            (this.playerCarXY[1] + 128 >= this.dumplingBonus[i][2] &&
              this.playerCarXY[1] + 128 <= this.dumplingBonus[i][2] + 68) ||
            (this.playerCarXY[1] >= this.dumplingBonus[i][2] &&
              this.playerCarXY[1] <= this.dumplingBonus[i][2] + 68) ||
            (this.dumplingBonus[i][2] >= this.playerCarXY[1] &&
              this.dumplingBonus[i][2] + 68 <= this.playerCarXY[1] + 128)
          ) {
            // console.log('粽子')
            this.score = this.score + 10;
            inds.push(i);
            // break
          }
        }
      }
      let time = 0;
      // 删除已过界的敌车
      inds.forEach(c => {
        this.dumplingBonus.splice(c - time, 1);
        time++;
      });
    },
    // 绘制敌车
    paintEnemyCar() {
      // 3跑道
      let lefts = [
        (this.canvas.width - 30) / 6 - 32.5,
        this.canvas.width / 2 - 32.5,
        ((this.canvas.width - 30) / 3) * 2 + 32.5
      ];
      // 随机选择敌车
      this.enemyCar.push([
        this.images["enemy_car_" + Math.round(Math.random() + 1)],
        lefts[Math.round(Math.random() * 2)],
        -128
      ]);
      setTimeout(() => {
        this.dumplingBonus.push([
          this.images["bonus_" + Math.round(Math.random() + 1)],
          lefts[Math.round(Math.random() * 2)],
          -68
        ]);
      }, 600);
      this.enemyCarTimer = setInterval(() => {
        this.enemyCar.push([
          this.images["enemy_car_" + Math.round(Math.random() + 1)],
          lefts[Math.round(Math.random() * 2)],
          -128
        ]);
        // 延时600ms错开粽子均匀分布
        this.dumplingTimer = setTimeout(() => {
          this.dumplingBonus.push([
            this.images["bonus_" + Math.round(Math.random() + 1)],
            lefts[Math.round(Math.random() * 2)],
            -68
          ]);
        }, 600);
      }, 1200);
    },
    // 移动敌车
    moveEmemyCar() {
      let inds = [];
      for (let i = 0; i < this.enemyCar.length; i++) {
        this.enemyCar[i][2] += 5;
        this.ctx.drawImage(
          this.enemyCar[i][0],
          this.enemyCar[i][1],
          this.enemyCar[i][2],
          65,
          128
        );
        if (this.enemyCar[i][2] >= this.canvas.height) inds.push(i);
      }
      let time = 0;
      // 删除已过界的敌车
      inds.forEach(c => {
        this.enemyCar.splice(c - time, 1);
        time++;
      });
    },
    // 绘制粽子
    paintDumpling() {
      // 3跑道
      let lefts = [
        (this.canvas.width - 30) / 6 - 32.5,
        this.canvas.width / 2 - 32.5,
        ((this.canvas.width - 30) / 3) * 2 + 32.5
      ];
      // .5s后开始下落，以便和敌车错开
      setTimeout(() => {
        // 随机出现
        this.dumplingBonus.push([
          this.images["bonus_" + Math.round(Math.random() + 1)],
          lefts[Math.round(Math.random() * 2)],
          -68
        ]);
        this.dumplingTimer = setInterval(() => {
          this.dumplingBonus.push([
            this.images["bonus_" + Math.round(Math.random() + 1)],
            lefts[Math.round(Math.random() * 2)],
            -68
          ]);
        }, 1000);
      }, 600);
    },
    // 移动粽子
    moveDumpling() {
      let inds = [];
      for (let i = 0; i < this.dumplingBonus.length; i++) {
        this.dumplingBonus[i][2] += 5;
        this.ctx.drawImage(
          this.dumplingBonus[i][0],
          this.dumplingBonus[i][1],
          this.dumplingBonus[i][2],
          66,
          68
        );
        if (this.dumplingBonus[i][2] >= this.canvas.height) inds.push(i);
      }
      let time = 0;
      // 删除已过界的粽子
      inds.forEach(c => {
        this.dumplingBonus.splice(c - time, 1);
        time++;
      });
      this.isPickDumpligs();
    },
    // 绘制绿化带
    paintGreenFence() {
      // 距离背景两侧各10 绿化带宽度15
      this.ctx.drawImage(
        this.images.left_green_fence,
        0,
        0,
        15,
        this.canvas.height
      );
      this.ctx.drawImage(
        this.images.right_green_fence,
        this.canvas.width - 15,
        0,
        15,
        this.canvas.height
      );
    },
    // 绘制路线
    paintCross() {
      var y = -600;
      const _this = this;
      requestAnimationFrame(function test() {
        if (_this.stop) {
          clearInterval(_this.enemyCarTimer);
          clearInterval(_this.dumplingTimer);
          return;
        }
        _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
        y += 10;
        _this.paintGreenFence();
        // 绘制路线
        _this.ctx.drawImage(
          _this.images.zebra_cross,
          15,
          y,
          _this.canvas.width - 30,
          2000
        );
        _this.paintCar();
        if (y == 0) y = -600;
        _this.moveEmemyCar();
        _this.moveDumpling();
        _this.runningTimer = requestAnimationFrame(test);
        //  cancelAnimationFrame(200);
      });
    },
    showGame() {
      if (this.validateState("", true)) {
        this.load = true;
        this.show = true;
      }
    }
  },
  watch: {
    show(v) {
      if (v) {
        // 这边$nextTick暂无法完全解决dom异步更新问题，奇怪
        this.$nextTick(() => this.init());
        // setTimeout(() => {
        //   this.init()
        // }, 500)
      }
    },
    stop(v) {
      if (v) {
        this.gameFinish();
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../assets/styles/common.styl'
 /deep/ .temp_container
  .temp_rule
    background #169a4c
  .juhe-ads
    position absolute
    bottom .5vh
    color #fff
    font-size 28px
    left 50%
    transform translateX(-50%)
  .temp_gift
    bottom 3.5vh
    width 108px
    height 108px
    left 81%
    background url($img_base_url + '/dumpling23/gift.png') no-repeat center / 100%
  .temp_title_url
    width 644px
    height 174px
    top 13vh
    left 60.5px
  .temp_joined
    color #169a4c
    font-size 28px
    top 24vh
    right 0
    left 0
  .temp_left_times
    color #169a4c
    bottom 14vh
    font-size 28px
    right 0
    left 0
    .temp_left_num
      background #1fa043
      color #fff
/deep/ .game_box
  background url($img_base_url + '/dumpling23/game_bg.png') no-repeat center / 100% 100%
/deep/ .game_box.game_box .game_header .game_user .game_score
  color #3a935d
/deep/ .game_box.game_box .game_header .game_timer
  color #666

.dumpling_box
  position relative
  set_bg('/dumpling23/bg.png')
  .play
    position absolute
    left 50%
    transform translateX(-50%)
    bottom 25.4vh
    width 285px
    height 100px
    background url($img_base_url + '/dumpling23/play_btn.png') no-repeat center/100%
</style>
