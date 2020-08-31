<template>
  <div class="flat_sheet_container" v-show="show">
    <div class="flat_sheet_main_box">
      <div :class="['flat_sheet_head_bg', `head_bg_${sheetInfo.tipId}`, `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}head_bg_${sheetInfo.tipId}${sheetInfo.random? '_'+Math.round(Math.random()*3 + 1) : ''}`]"></div>
      <div v-if="sheetInfo.tipId == 1">
        <div :class="['flat_sheet_title', 'flat_sheet_title_zhong', `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_title`]">恭喜你，中奖啦</div>
        <div class="flat_sheet_title_fu flat_sheet_title_fu_zhong">{{sheetInfo.msg}}</div>
        <div :class="['flat_sheet_btn', 'flat_sheet_btn_detail', `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_btn_detail`]" @click="okHandler">领取奖品</div>
        <div :class="['flat_sheet_btn', 'flat_sheet_btn_zhong',  `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_btn`]" @click="bonusAgain" >继续抽奖</div>
      </div>
      <div v-else-if="sheetInfo.tipId == 2 || sheetInfo.tipId == 4">
        <div :class="['flat_sheet_title', 'flat_sheet_title_zhong', `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_title`]">下次再来吧</div>
        <div class="flat_sheet_title_fu">{{sheetInfo.tipId == 2? '您的抽奖机会已用完' : '奖品已发完'}}</div>
        <div :class="['flat_sheet_btn', `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_btn`]" @click="hide">确定</div>
      </div>
      <div v-else-if="sheetInfo.tipId == 3">
        <div :class="['flat_sheet_title', `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_title`]">很遗憾</div>
        <div class="flat_sheet_title_fu">您未中奖哦，再接再厉吧</div>
        <div class="over_layout_btn">
          <div :class="['flat_sheet_btn', , `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_btn`]" @click="bonusAgain">继续抽奖</div>
          <div :class="['flat_sheet_btn', `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_btn`]" @click="playAgain">再玩一次</div>
        </div>
      </div>
      <div v-else-if="sheetInfo.tipId == 6">
        <div :class="['flat_sheet_title', 'flat_sheet_title_zhong', `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_title`]">签到成功</div>
        <div class="flat_sheet_title_fu flat_sheet_title_fu_zhong">签到成功，获得{{msg}}金币</div>
        <div :class="['flat_sheet_btn', `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_btn`]" @click="hide">确定</div>
      </div>
      <div v-else-if="sheetInfo.tipId == 7">
       <div :class="['flat_sheet_title', `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_title`]">很遗憾</div>
        <div class="flat_sheet_title_fu">抽奖金币不足</div>
        <div :class="['flat_sheet_btn', `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_btn`]" @click="hide">确定</div>
      </div>
      <div v-else-if="sheetInfo.tipId == 8">
       <div :class="['flat_sheet_title', `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_title`]">下次再来吧</div>
        <div class="flat_sheet_title_fu">您已经签到过了</div>
        <div :class="['flat_sheet_btn', `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_btn`]" @click="hide">确定</div>
      </div>
      <div v-else-if="sheetInfo.tipId == 9">
        <div :class="['flat_sheet_title', 'flat_sheet_title_zhong', `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_title`, 'nine_flat_sheet_title']">挑战成功</div>
        <div class="flat_sheet_score">您的成绩为：{{sheetInfo.score}}分</div> 
        <div class="flat_sheet_defeat">成功击败全国{{sheetInfo.feat_per}}的玩家</div>
        <div class="flat_sheet_best_score">最佳成绩为：{{sheetInfo.best_points}}分</div>
        <div class="flat_sheet_best_order">最佳排名为：NO.{{sheetInfo.best_rank}}</div>
        <div :class="['flat_sheet_btn', 'flat_sheet_btn_detail', `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_btn_detail`]" @click="getBonus">赶紧去抽奖</div>
        <div class="over_layout_btn">
          <div :class="['flat_sheet_btn', , `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_btn`]" @click="playAgain">再玩一次</div>
          <div :class="['flat_sheet_btn', , `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_btn`]" @click="$flatDialog.open({title: '排行榜', temName: sheetInfo.temName})">排行榜</div>
        </div>
      </div>
      <div v-else-if="sheetInfo.tipId == 10">
        <div :class="['flat_sheet_title', 'flat_sheet_title_zhong', `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_title`, 'nine_flat_sheet_title']">挑战失败</div>
        <div class="flat_sheet_score">您的成绩为：{{sheetInfo.score}}分</div> 
        <div class="flat_sheet_defeat">您的成绩必须达到{{sheetInfo.draw_limit}}分才能抽奖</div>
        <div class="flat_sheet_best_score">最佳成绩为：{{sheetInfo.best_points}}分</div>
        <div class="flat_sheet_best_order">最佳排名为：NO.{{sheetInfo.best_rank}}</div>
        <div class="over_layout_btn">
          <div :class="['flat_sheet_btn', , `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_btn`]" @click="playAgain">再玩一次</div>
          <div :class="['flat_sheet_btn', , `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_btn`]" @click="$flatDialog.open({title: '排行榜', temName: sheetInfo.temName})">排行榜</div>
        </div>
        <div class="flat_sheet_back" @click="backToIndex">返回首页</div>
      </div>
      <div v-else>
        <div class="flat_sheet_title_fu flat_sheet_title_fu_area">当前区域暂不支持</div>
        <div :class="['flat_sheet_btn', `${sheetInfo.temName ? sheetInfo.temName+'_' : ''}flat_sheet_btn`]" @click="hide">确定</div>
      </div>
      <div class="flat_sheet_close" @click="hide"></div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import { bonusDetail } from "../../../api/api.js";
export default {
  props: {},
  router,
  data() {
    return {
      show: false,
      giftDetail: {},
      sheetInfo: {}
    };
  },
  created() {},
  mounted() {},
  computed: {
  
  },
  methods: {
    // 针对游戏类继续抽奖调抽奖接口
    bonusAgain() {
      // 游戏类
      this.show = false;
      if(this.sheetInfo.game) {
        if (this.sheetInfo.bonusAgainCb) this.sheetInfo.bonusAgainCb();
      }else {
        if (this.sheetInfo.callback) this.sheetInfo.callback();
      }
    },
    open(options) {
      this.sheetInfo = {...options}
      this.show = true;
      if(options.giftId)  this.getDetail(options.giftId)
    },
    hide () {
      this.show = false;
      if (this.sheetInfo.callback) this.sheetInfo.callback();
    },
    backToIndex() {
      this.show = false;
      if (this.sheetInfo.backToIndexCb) this.sheetInfo.backToIndexCb();
    },
    // 交给父组件处理
    getBonus() {
      this.show = false;
      if(this.sheetInfo.bonusCb) this.sheetInfo.bonusCb();
    },
    // 交给父组件处理
    playAgain() {
      this.show = false;
      if(this.sheetInfo.playAgainCb) this.sheetInfo.playAgainCb();
    },
     getDetail(id) {
      bonusDetail({
        id: id,
        aid: localStorage.getItem("aid")
      })
        .then(res => {
          if (res.code === 200) {
            this.giftDetail = res.data;
          } 
        })
    },
    okHandler() {
      this.show = false;
      // date 9/26 替换成弹窗形式 陈楠
      // cb为当前模板为游戏时需要关闭游戏过程页
      let cb = {}
      if(this.sheetInfo.game) cb = {closeCb: () => this.hide()}
      if (this.sheetInfo.tipId == 1) {
        // 判断跳address or detail
        if(this.giftDetail.contact_type_set) this.$addressDialog.open({id: this.sheetInfo.giftId, temName:  this.sheetInfo.temName, ...cb});
        else this.$detailDialog.open({id: this.sheetInfo.giftId, temName:  this.sheetInfo.temName, ...cb});
      }
    }
  },
  watch: {
    show(v) {
      if(!v) this.$flatSheet.instance.show = false
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../assets/styles/common.styl'
@import '../../../assets/styles/dialogBg.styl'
.flat_sheet_container
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background rgba(0, 0, 0, 0.8)
  display flex
  align-items center
  justify-content center
  z-index 100
  .flat_sheet_main_box
    padding 8px
    position relative
    width 614px
    border-radius 16px
    background #fff
    z-index 101
    height 604px
    text-align center
    .flat_sheet_head_bg
      width 354px
      height 252px
      position absolute
      left 50%
      transform translateX(-50%)
      top -195px
    .over_layout_btn
      width 510px
      margin 30px auto 0 auto
      display flex
      align-items center
      justify-content space-around
      .flat_sheet_btn
        width 240px
    .flat_sheet_back
      margin-top 60px
      color #4952C6
      font-size 28px
      text-decoration underline
    .head_bg_1
      background url($img_base_url+'/rewrite_dialog/icon_prize_1.png') no-repeat center/354px 252px
    .head_bg_2
      background url($img_base_url+'/rewrite_dialog/icon_prize_3.png') no-repeat center/354px 252px
    .head_bg_3
      background url($img_base_url+'/rewrite_dialog/icon_prize_2.png') no-repeat center/354px 252px
    .head_bg_4
      background url($img_base_url+'/rewrite_dialog/icon_prize_3.png') no-repeat center/354px 252px
    .head_bg_5
      background url($img_base_url+'/rewrite_dialog/icon_prize_4.png') no-repeat center/354px 252px
    .head_bg_6
      background url($img_base_url+'/rewrite_dialog/icon_prize_1.png') no-repeat center/354px 252px
    .head_bg_7
      background url($img_base_url+'/rewrite_dialog/icon_prize_2.png') no-repeat center/354px 252px
    .head_bg_8
      background url($img_base_url+'/rewrite_dialog/icon_prize_3.png') no-repeat center/354px 252px  
    .head_bg_9
      background url($img_base_url+'/rewrite_dialog/icon_prize_1.png') no-repeat center/354px 252px  
    .head_bg_10
      background url($img_base_url+'/rewrite_dialog/icon_prize_2.png') no-repeat center/354px 252px
    .flat_sheet_title
      font-size 60px
      font-weight bold
      margin-top 100px
    .flat_sheet_score
      margin-top 40px
      font-size 28px
      font-weight bold
    .flat_sheet_defeat
      margin-top 6px
      font-size 28px
      font-weight bold
    .flat_sheet_best_score
      margin-top 40px
      color #409EFF
      font-size 28px
    .flat_sheet_best_order
      margin-top 6px
      color #409EFF
      font-size 28px
      margin-bottom 40px
    .flat_sheet_title_zhong
      color #409EFF
    .nine_flat_sheet_title
      margin-top 70px
    .flat_sheet_title_fu
      font-size 28px 
      color #333
      margin 100px auto
    .flat_sheet_title_fu_area
      margin 210px auto 150px auto
    .flat_sheet_title_fu_zhong
      margin 80px auto
      font-weight bold
    .flat_sheet_btn
      width 510px
      height 80px
      line-height 80px
      border-radius 40px
      border 1px solid #409EFF
      color #409EFF
      text-align center
      margin auto
      font-size 28px
      font-weight bold
    .flat_sheet_btn_detail
      background linear-gradient(180deg,rgba(64,198,255,1) 0%,rgba(64,158,255,1) 100%)
      color #fff
      border none
    .flat_sheet_btn_zhong
      margin-top 30px
    .flat_sheet_close
      position absolute
      left 50%
      top 101%
      width 64px
      height 128px
      background url($img_base_url+'/rewrite_dialog/close.png') no-repeat center/100%
      transform translateX(-50%)
</style>