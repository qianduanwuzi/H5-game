<template>
  <div class="temp_container">
    <slot name="temp_header">
      <!-- <img v-if="tempInfo.logo" :src="tempInfo.logo" class="temp_logo" :style="tempInfo.setting.logo" alt /> -->
      <!-- <div class="temp_rule" :style="tempInfo.setting.rule" @click="$flatDialog.open({title: '活动规则', temName: temName})">活动规则</div> -->
      <!-- <div v-if="tempInfo.back_music">
        <img
        :src="`${imgBaseUrl}${musicImgUrl}`"
        :class="['temp_music', playing? 'temp_music_animate' : '']"
        :style="tempInfo.setting.music"
        @click="pause"
        v-show="playing"
        />
        <img
          :src="`${imgBaseUrl}${musicForbidImgUrl}`"
          class="temp_music"
          :style="tempInfo.setting.music"
          @click="play"
          v-show="!playing"
        />
        <audio class="audio" ref="music" :src="tempInfo.back_music" autoplay loop></audio>
      </div> -->
      <!-- 后台新上传 -->
      <!-- <img class="temp_title_url" :src="tempInfo.title" :style="tempInfo.setting.title" v-if="tempInfo && tempInfo.title" /> -->
      <!-- 无上传，默认处理，父组件自行修改css -->
      <!-- <img class="temp_title_url" :src="`${imgBaseUrl}${titleUrl}`" v-if="titleUrl && tempInfo && !tempInfo.title"/> -->
      <!-- 开发用 -->
       <!-- <img class="temp_title_url" :src="`${imgBaseUrl}${titleUrl}`" v-if="titleUrl && tempInfo"/> -->
      <!-- 父组件自行修改css -->
      <!-- <div class="temp_joined" v-if="true || tempInfo.virtual_num">已有 <span class="temp_joined_num"> {{tempInfo.join_people}} </span> 人参与{{joinedTxt}}</div> -->
      <!-- 父组件自行修改css -->
      <div class="temp_left_times">您今天还有 <span class="temp_left_num">xxx</span>  次抽奖机会</div>
    </slot>
    <slot></slot>
    <div class="juhe-ads">页面技术由 xxxx 提供</div>
    <!-- <p class="temp_gift" @click="$flatDialog.open({title: '我的奖品', temName: temName})"></p> -->
  </div>
</template>

<script>
import { imgBaseUrl } from "@/config";
export default {
  components: {},
  props: {
   
  },
  data() {
    return {
      imgBaseUrl,
      playing: true
    };
  },
  created() {},
  mounted() {
  
  },
  computed: {},
  methods: {
 
  },
  watch: {}
};
</script>
<style lang="stylus" scoped>
.temp_container
  width 100%
  min-height 100vh
  position relative
  .temp_logo
    position absolute
    top 1.5vh
    left 35px
    width 200px
    height 80px
    z-index 2
  .temp_rule
    color #fff
    background rgb(234, 88, 78)
    background-image: -webkit-linear-gradient( 90deg, rgb(232,62,59) 0%, rgb(236,107,91) 100%);
    box-shadow: 1.5px 2.598px 10px 0px rgba(151, 30, 35, 0.5);
    line-height 50px
    width 150px
    text-align center
    border-radius 30px
    font-size 24px
    position absolute
    top 2.99vh
    right 20px
    z-index 2

  .temp_music
    position absolute
    top 8.96vh
    left 35px
    z-index 3
    width 58px
    height 58px
  .temp_music_animate
    animation rotate 3s linear infinite
  .juhe-ads
    position absolute
    bottom 0
    left 0
    right 0
    height 70px
    line-height 70px
    color #531000
    text-align center
    font-size 24px
    z-index 2
  @keyframes rotate
    from
      transform rotate(0)
    to
      transform rotate(360deg)
  .temp_gift
    position absolute
    bottom 30px
    right 13px
    width 140px
    height 140px
    background url('https://juheimg.oss-cn-hangzhou.aliyuncs.com/wx_h5/clawGame7/giftbg.png') center no-repeat / contain
  .temp_title_url
    position absolute
    z-index 1
    animation-name title
    animation-duration 1.3s
    animation-timing-function ease-in-out
  .temp_joined
    position absolute
    left 0
    color #fff
    z-index 1
    font-size 28px
    text-align center
    left 0
  .temp_left_times
    position absolute
    z-index 1
    left 0
    width 100%
    text-align center
    color #fff
    font-size 28px
    font-weight bold
    left 0
    .temp_left_num
      margin 0 10px
      background #f5b43c
      padding 4px 15px
      border-radius 20px

@keyframes title {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }
  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}      
</style>