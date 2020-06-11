<template>
  <temp-content :tempInfo="homeList" titleUrl="/crush_golden_eggs/up_bg.png">
    <div class="crush_golden_eggs_box">
      <div class="crush_eggs_upper"></div>
      <div class="crush_joined">已有xxx人参与活动</div>
      <div class="eggs_ope_box">
        <img class="bammer" :src="`${imgBaseUrl}/crush_golden_eggs/hammer.png`" style="left: 0" />
        <div class="eggs_box">
          <img
            :src="`${imgBaseUrl}/crush_golden_eggs/${showOkEgg? 'egg.png':'broken_egg.png'}`"
            :class="['egg', !showOkEgg ? 'broken_egg' : '']"
          />
        </div>
        <div @click="eggClickHandler" class="crush_start">立刻开始</div>
      </div>
      <div class="crush_left_box">
        您今天还有
        <span class="crush_left_num">xxx</span> 次获奖机会
      </div>
    </div>
  </temp-content>
</template> 

<script>
import util from "@/utils";
import tempCommon from "@/mixins/tempCommon";
export default {
  mixins: [tempCommon],
  components: {},
  props: {},
  data() {
    return {
      showOkEgg: true
    };
  },
  created() {},
  mounted() {
  },
  computed: {},
  methods: {
    init() {
      let bammer_dom = document.querySelector(".bammer")
      bammer_dom.classList.remove("bammer_crush");
      bammer_dom.style.left = '0px'
      this.showOkEgg = true
    },
    eggClickHandler() {
      // if (this.validateState()) {
        // 当前点击金蛋二维
        const cur_dimension = util.computeDom(".egg");
        // 锤子二维
        const bammer_cur_dimension = util.computeDom(".bammer");
        let bammer_dom = document.querySelector(".bammer");
        const translate_x = cur_dimension.left - bammer_cur_dimension.left;
        // debugger
        util.animateDom(translate_x, bammer_dom, "left", 0.5);
        setTimeout(() => {
          bammer_dom.classList.add("bammer_crush");
          setTimeout(() => {
            this.showOkEgg = false;
            this.getBonus();
          }, 100);
        }, 200);
      // }
    }
  },
  watch: {
     "$flatSheet.instance.show"(v) {
       if(!v) this.init()
     }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../assets/styles/common.styl'
.temp_container
  /deep/ .temp_title_url
    width 480px
    height 18.7vh
    top 180px
    left 135px
  /deep/.juhe-ads
    width 100%
    position absolute
    bottom 15px
    color #ffffff
    
    text-align center
    font-size 24px
  /deep/.temp_gift
    position absolute
    width 144px
    height 144px
    background url($img_base_url + '/crush_golden_eggs/gift.png') no-repeat center / 100% 100%
    right 0
    bottom 65px
  /deep/ .temp_left_times
    display none
  /deep/ .temp_joined
    display none
.crush_golden_eggs_box
  position relative
  set_bg('/crush_golden_eggs/bg.png')
  .crush_eggs_upper
    width 480px
    height 18.7vh
    // background url($img_base_url + '/crush_golden_eggs/up_bg.png') no-repeat center / contain
    margin 180px auto 15px auto
  .crush_joined
    font-size 28px
    color #fff
  .eggs_ope_box
    // width 705px
    height 38.3vh
    background url($img_base_url + '/crush_golden_eggs/desk.png') no-repeat center / contain
    position relative
    .bammer
      width 258px
      position absolute
      top -90px
      z-index 1
    .bammer_crush
      transform rotate(30deg) translateY(50%)
      transition all 0.2s linear
    .eggs_box
      width 600px
      margin 90px auto
      .egg
        position absolute
        left 50%
        top -60px
        // width 345px
        height 31.38vh
        transform translateX(-50%)
      .broken_egg
        height 20.39vh
        top 95px
    .crush_start
      font-weight bold
      font-size 36px
      text-align center
      color #9d1a00
      width 362px
      height 9vh
      line-height 9vh
      background url($img_base_url + '/crush_golden_eggs/start.png') no-repeat center / contain
      position absolute
      bottom -30px
      left 50%
      transform translateX(-50%)
      z-index 2
  .crush_left_box
    font-size 24px
    color #fff
    margin-top 50px
    .crush_left_num
      width 63px
      line-height 33px
      background-color #f5b43c
      border-radius 16.5px
      display inline-block


</style>