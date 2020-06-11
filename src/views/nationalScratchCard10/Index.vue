<template>
  <div class="scratchCard">
    <temp-content :tempInfo="homeList" titleUrl="/nationalver_scratch_card/default_title.png" joinedTxt="抽奖">
      <div class="scratch_card_box">
        <div class="scratch_card_upper">
        </div>
        <div class="scratch_card_downer">
          <div class="scratch_box">
            <canvas id="mycanvas" width="250" height="110"></canvas>
          </div>
        </div>
      </div>
    </temp-content>
  </div>
</template>

<script>
import tempCommon from "@/mixins/tempCommon";
import scratchCard from "@/mixins/scratchCard";
import scratch_card_img from "../../assets/images/10/scratch_card_out.png";
export default {
  mixins: [tempCommon, scratchCard],
  props: {
  },
  data() {
    return {
      scratch_card_img,
      temName: "",
      xScale: 0.6,
      yScale: 0.8828
    };
  },
  created() {},
  mounted() {
     this.preFill(true)
  },
  computed: {},
  methods: {
   
  },
  watch: {
   
  }
};
</script>
<style lang="stylus" scoped>
@import '../../assets/styles/common.styl'
.temp_container
  /deep/.juhe-ads
    position absolute
    bottom 10px
    color #2f1c3b
    font-size 24px
  /deep/.temp_gift
    position absolute
    bottom 14vh
    z-index 3
    width 144px
    left 50%
    transform translateX(-50%)
    background url($img_base_url + '/nationalver_scratch_card/gift.png') no-repeat center / contain 
  /deep/ .temp_title_url
    width 653px
    height 162px
    top 15vh
    left 49px
  /deep/ .temp_joined
    // display flex
    // align-items baseline
    // width 345px
    height 117px
    color #63009d
    font-size 28px
    top 25vh
    line-height 74px
    left 0
    right 0
    background url($img_base_url + '/nationalver_scratch_card/title_fu.png') no-repeat center / contain
  /deep/ .temp_left_times
    padding 33.5px 0 90px 0
    bottom 19vh
    font-size 28px
    right 0
.scratch_card_box
  position relative
  set_bg('/nationalver_scratch_card/bg.jpg')
  .scratch_card_upper
    height 250px
    padding 14.333vh 0 14.667vh 0
    margin auto
    .scratch_joined
      width 242px
      line-height 42px
      margin 142px auto
      color #63009d
      font-size 28px
  .scratch_card_downer
    display flex
    justify-content center
    @media (min-height: 700px) 
      margin-top 50px
    .scratch_box
      display flex
      align-items center
      justify-content center
      width 490px
      height 220px
      background url($img_base_url + '/nationalver_scratch_card/scratch_card_bg.png') no-repeat center / 100% 100%
      // .scratch_box_tip
      //   font-size 30px
      //   width 240px
      //   height  60px
      //   line-height 60px
      //   border-radius 8px
      //   background-color rgb(252, 47, 133)
      //   color #fff
      //   position absolute
      //   z-index 4
      //   -webkit-touch-callout none
      //   -webkit-user-select none
      //   -khtml-user-select none
      //   -moz-user-select none
      //   -ms-user-select none
      //   user-select none
      .scratched_box_tip
        position absolute
        font-size 30px
        z-index 1
        .scratched_box_tip_success
          width 440px
          line-height 40px
      #mycanvas
        z-index 2
   


</style>