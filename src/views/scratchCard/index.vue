<template>
  <div class="scratch_card_box">
    刮刮乐
    <div id="div1">恭喜您中奖了</div>
    <canvas id="mycanvas" width="300" height="80"></canvas>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
    // 预先填充
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, 300, 80);
    // 绑定处理
    canvas.addEventListener("touchmove", this.moveFunc, false);
    canvas.addEventListener("touchend", this.endFunc, false);
  },
  computed: {},
  methods: {
    moveFunc(e) {
      var canvas = document.getElementById("mycanvas"),
        ctx = canvas.getContext("2d"),
        l = canvas.offsetLeft,
        t = canvas.offsetTop;
      var touch = e.touches[0],
        posX = touch.clientX - l,
        posY = touch.clientY - t;
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "#eee"; //触笔的颜色 随便  因为它终究变成透明
      ctx.lineWidth = 30; // 拖动时开始画线的线宽
      ctx.lineCap = "round"; //画笔变成圆形
      ctx.beginPath();
      ctx.arc(posX, posY, 15, 0, Math.PI * 2, 0);
      ctx.fill();
    },
    endFunc() {
      var canvas = document.getElementById("mycanvas"),
        ctx = canvas.getContext("2d"),
        w = canvas.width,
        h = canvas.height,
        area = w * h;
      var data = ctx.getImageData(0, 0, w, h).data, // 获取每一个像素
        scrapeNum = 0;
      for (var i = 3, len = data.length; i < len; i += 4) {
        if (data[i] === 0) {
          scrapeNum++;
        }
      }
      if (scrapeNum > area * 0.7) {
        // 大于70%则全放开
        ctx.clearRect(0, 0, w, h);
        canvas.removeEventListener("touchmove", this.moveFunc, false);
        canvas.removeEventListener("touchend", this.endFunc, false);
      }
    }
  },
  watch: {}
};
</script>
<style lang="stylus" scoped>
.scratch_card_box
  font-size 20px
  #div1
    width 120px
    height 40px
    color red
    position absolute
    text-align center
    line-height 40px
    font-size 18px
    font-weight bold
  #mycanvas
    position absolute
    left 0
</style>
