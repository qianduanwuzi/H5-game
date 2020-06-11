/** 
   * 刮刮乐抽出公共逻辑，后续继续优化
   * author chennan
  */
 import util from "@/utils";
 var scratchCard = {
   props:{
     
   },
   data() { 
       return {
        showOpenTip: true,
        allOpen: false, // 挂后控制弹窗
        tempOffCanvas: false
       }
   },
   computed: {
      
   },
   watch: {
    "$flatSheet.instance.show"(v) {
      if (!v) this.preFill(this.tempOffCanvas);
    }
   },
   created(){
    
   },
   mounted() {
   },
   methods: {
    preFill(offCanvas = false) {
      this.tempOffCanvas = offCanvas
      this.allOpen = false;
      this.sheetInfo = {
        tipId: "",
        giftTitle: ""
      };
      this.time = 0;
      this.showOpenTip = true;
      // 预先填充
      var canvas = document.getElementById("mycanvas");
      canvas.width = document.documentElement.clientWidth * this.xScale;
      canvas.height = util.computeDomHeight(".scratch_box") * this.yScale;
      var ctx = canvas.getContext("2d");
      var image1 = new Image();
      image1.src = this.scratch_card_img;
      if(offCanvas) {
         // 离屏canvas
        var autoImg = document.createElement("canvas");
        var ctx2 = autoImg.getContext('2d');
        ctx2.canvas.width = canvas.width;
        ctx2.canvas.height = canvas.height;
      }
      image1.onload = function() {

        if(offCanvas)  ctx2.drawImage(image1, 0, 0, canvas.width, canvas.height );
        var pattern = ctx.createPattern(offCanvas? autoImg : image1, "repeat");
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };
      // 绑定处理
      canvas.addEventListener("touchstart", this.touchStartHandler, false);
      canvas.addEventListener("touchmove", this.moveFunc, false);
      canvas.addEventListener("touchend", this.endFunc, false);
    },
    touchStartHandler(e) {
      this.moveFunc(e)
    },
    clickBonus() {
      alert('自己写抽中逻辑吧')
      // this.sheetInfo = { tipId: 3, msg: "您未中奖哦，再接再厉吧" };
      // this.$flatSheet.open({ ...this.sheetInfo, temName: this.temName });
    },
    bodyScroll(event) {
      event.preventDefault();
    },
    moveFunc(e) {
      this.showOpenTip = false;
      // if (this.validateState()) {
        // if (!this.time) this.clickBonus();
        this.time++;
        var canvas = document.getElementById("mycanvas"),
          ctx = canvas.getContext("2d"),
          l = canvas.offsetLeft,
          t = canvas.offsetTop,
          top = document.body.scrollTop || document.documentElement.scrollTop;
        var touch = e.touches[0],
          posX = touch.clientX - l,
          posY = touch.clientY + top - t;
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "#eee"; //触笔的颜色 随便  因为它终究变成透明
        ctx.lineWidth = 30; // 拖动时开始画线的线宽
        ctx.lineCap = "round"; //画笔变成圆形
        ctx.beginPath();
        ctx.arc(posX, posY, 15, 0, Math.PI * 2, 0);
        ctx.fill();
        // 划得时候禁止页面滚动
        document.body.addEventListener("touchmove", this.bodyScroll, {
          passive: false
        });
      // }
    },
    scratchArea(per = 0.4) {
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
      if (scrapeNum >= area * per) {
        // 大于per*100%则全放开
        this.allOpen = true;
        ctx.clearRect(0, 0, w, h);
        canvas.removeEventListener("touchmove", this.moveFunc, false);
        canvas.removeEventListener("touchend", this.endFunc, false);
        this.clickBonus()
        // this.time = 0;
        // return await "success";
      }
    },
    endFunc() {
      this.scratchArea();
      // 停止滑动则取消禁止页面滚动
      document.body.removeEventListener("touchmove", this.bodyScroll, {
        passive: false
      });
    }
     
   }
 }
 
 export default scratchCard