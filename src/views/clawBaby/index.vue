<template>
  <div class="claw_box">
    <div class="claw_title">抓娃娃</div>
    <div class="claw_paw_box">
      <div :class="['claw_paw', playing ? 'paly_box_animate' : '']">
        <div>抓啊</div>
        <div v-show="showLucky">福袋img</div>
      </div>
    </div>
    <div class="img_out_box">
      <ul class="img_in_box">
        <li class="each_img_box animate_first">
          <!-- <img src="" alt=""> -->
          <div class="each_img">福袋img</div>
        </li>
        <li class="each_img_box">
          <div class="each_img">福袋img</div>
        </li>
        <li class="each_img_box">
          <div class="each_img">福袋img</div>
        </li>
      </ul>
    </div>
    <div :class="['play_box']" @click="play">play</div>
  </div>
</template>

<script>
import util from "@/utils";
export default {
  name: "Claw",
  data() {
    return {
      playing: false,
      clawXY: { x: 0, y: 0, right: 0 },
      clawtimer: 0,
      luckyBagTimer: 0,
      clawAnimateTimer: 0,
      clawRecoverAnimateTimer: 0,
      showLucky: false
    };
  },
  mounted() {
    this.luckyAnimate();
  },
  methods: {
    // 福袋动画
    luckyAnimate() {
      // 计算节点的宽度
      let s_width = util.computeDomHeight(".animate_first", false);
      // 福袋动画
      let first_s_dom = document.querySelector(".each_img_box");
      this.luckyBagTimer = setInterval(() => {
        let time = 0;
        var scrolltimer = setInterval(() => {
          let speed = s_width / 100; // 1s
          time++;
          if (first_s_dom.style.marginLeft != 0) {
            first_s_dom.style.marginLeft = -speed * time + "px";
          } else {
            first_s_dom.style.marginLeft = -speed * time + "px";
          }
          if (time >= 100) {
            // 1s
            clearInterval(scrolltimer);
          }
        }, 10);
      }, 1000);
    },
    // 初始状态
    init() {
      this.luckyAnimate();
    },
    play() {
      if (this.playing) return;
      this.playing = true;
      // 抓手动画
      let claw_dom = document.querySelector(".claw_paw");
      let time = 0;
      // 动画时间
      let animate_time = 3; // 1s
      let speed = 200 / (animate_time * 100);
      this.clawAnimateTimer = setInterval(() => {
        time++;
        if (claw_dom.style.top != 0) {
          claw_dom.style.top = speed * time + "px";
        } else {
          claw_dom.style.top = speed * time + "px";
        }
        if (time >= animate_time * 100) {
          clearInterval(this.clawAnimateTimer);
        }
      }, 10);
      // 准备监听抓手的坐标
      this.clawtimer = setInterval(() => {
        this.clawXY = {
          x: util.computeDom(".claw_paw").x,
          y: util.computeDom(".claw_paw").y,
          right: util.computeDom(".claw_paw").right
        };
        // 没抓到清除
        setTimeout(() => {
          clearInterval(this.clawtimer);
        }, animate_time * 1000);
      }, 10);
    },
    // 抓手收回动画
    clawRecoverAnimate() {
      let claw_dom = document.querySelector(".claw_paw");
      let time = 0;
      let speed = parseInt(claw_dom.style.top) / 200; // 1s
      let origin_top = parseInt(claw_dom.style.top);

      this.clawRecoverAnimateTimer = setInterval(() => {
        time++;
        if (parseInt(claw_dom.style.top) > 0) {
          claw_dom.style.top = origin_top - speed * time + "px";
        } else {
          claw_dom.style.top = "0px";
          clearInterval(this.clawRecoverAnimateTimer);
        }
      }, 10);
    }
  },
  watch: {
    clawXY: {
      deep: true,
      handler(v) {
        // 一个福袋的维度
        let lucky_dimension = util.computeDom(".each_img");
        if (
          lucky_dimension.y <= v.y &&
          v.y <= lucky_dimension.y + lucky_dimension.height
        ) {
          // 所有福袋dom的维度
          let all_lucky_dimension = util.computeDom(".each_img", true);
          // 调整福袋被选中区间
          let adjust_dis = 0;
          // 判断有没有选中
          let has = false;
          for (let i = 0; i < all_lucky_dimension.length; i++) {
            let cur_dimense = all_lucky_dimension[i];
            if (
              (cur_dimense.x - adjust_dis <= v.right &&
                v.right <= cur_dimense.right + adjust_dis) ||
              (v.x >= cur_dimense.x - adjust_dis &&
                v.x <= cur_dimense.right + adjust_dis)
            ) {
              alert("选中拉");
              has = true;
              this.showLucky = true;
              // 抓中则清除关联定时器
              clearInterval(this.clawtimer);
              clearInterval(this.clawAnimateTimer);
              this.clawRecoverAnimate();
              break;
              // clearInterval(this.luckyBagTimer)
            }
          }
          if (!has) alert("未选中");
        }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.claw_box
  .claw_title
    font-size 40px
  .claw_paw_box
    font-size 40px
  .img_out_box
    width 620px
    margin 0 auto
    text-align left
    overflow-x hidden
    .img_in_box
      margin-top 200px
      width 1000px
      li
        width 310px
        display inline-block
        img
          width 80px
        div
          font-size 40px
          width 150px
          height 60px
          border 1px solid red
  .play_box
    font-size 60px
    margin-top 20px
  .claw_paw
    width 100px
    margin 50px auto 0 auto
    position absolute
    top 0
    left 50%
    margin-left -50px
    // transition transform 2s linear
  .paly_box_animate
    // transform translateY(300px)
</style>
