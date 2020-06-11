<template>
  <div class="game_box" v-show="show">
     <div class="game_header ignore">
        <div class="game_user"><img :src="headUrl" alt=""><span class="game_score">{{score}}</span></div>
        <div class="game_timer" v-if="startTime != '0'">时间：<span class="game_countdowm">{{downTime}}</span></div>
        <!-- <div :class="['game_music', musicPlay? 'game_music_animate' : '']" @click="playHandler" v-if="tempInfo.back_music"></div> -->
      </div>
    <slot></slot>  
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    },
    score: {
      type: Number,
      default: 0
    },
    startTime: {
      type: String,
      default: '30.00'
    },
    tempInfo: Object
  },
  data() {
    return {
      headUrl: '', //头像
      timer: 0,
      downTime: 0,
      musicPlay: true 
    };
  },
  created() {
  },
  mounted() {
  },
  computed: {},
  methods: {
    playHandler() {
      // this.musicPlay = !this.musicPlay
      // if(!this.musicPlay) {
      //   // 首页停止音乐播放
      //   // console.log(this.$parent.$refs.tempContent)
      //   this.$parent.$refs.tempContent.pause()
      // }else this.$parent.$refs.tempContent.play()
    },
    countDown() {
      if(this.startTime != '0') {
        this.downTime = this.startTime
        let time = 99
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this.downTime = String(time == 99? parseInt(this.downTime)-1 : parseInt(this.downTime)) + '.'+ (time < 10? '0'+time: time)
          time--;
          if(time == 0) time = 99
          if(this.downTime == '0.01') {
            this.downTime = '0.00'
            clearInterval(this.timer)
            this.$emit('timeover')
          }
        },10)
      } 
    },
    clearTimer() {
      clearInterval(this.timer)
    },
  },
  watch: {},
};
</script>
<style lang="stylus" scoped>
@import '../../../assets/styles/common.styl'
.game_box
  position fixed
  width 100vw
  height 100vh
  left 0
  top 0
  z-index 9
  .game_header
    position absolute
    top 2vh
    display flex
    align-items center
    // justify-content space-between
    .game_user
      display flex
      align-items center
      img 
        width 70px
        border-radius 50%
      .game_score
        margin-left 8px
        color #fff
        font-size 34px
    .game_timer
      position absolute
      left 165px
      display flex
      align-items center
      font-weight bold
      font-size 36px
      color #fff
      .game_countdowm
        font-size 60px
    .game_music
      position absolute
      right 0
      width 58px
      height 58px
      background url('https://juheimg.oss-cn-hangzhou.aliyuncs.com/wx_h5/sudoku2/musicOff.png') no-repeat center/100%
      &.game_music_animate
        background url('https://juheimg.oss-cn-hangzhou.aliyuncs.com/wx_h5/sudoku2/musicOn.png') no-repeat center/100%
        animation rotate 3s linear infinite
    @keyframes rotate
      from
        transform rotate(0)
      to
        transform rotate(360deg)
  .ignore
    width calc(100% - 80px)
    left 40px
</style>