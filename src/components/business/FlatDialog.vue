<template>
  <Dialog class="flat_dialog_container" :title="title" :show.sync="show" :temName="temName">
    <div v-if="!$loading.instance.show">
      <div class="flat_dialog_content_box" v-if="title == '活动规则'">
        <div class="flat_dialog_tab flat_dialog_tab_bonus" @click="title = '我的奖品'">我的奖品</div>
        <div class="flat_dialog_main_content">
          <div class="flat_dialog_main_ins">
            <label for>活动时间：</label>
            <span>{{ruleData.start_date}}-{{ruleData.end_date}}</span>
          </div>
          <div>
            <label for>主办单位：</label>
            <span>{{ruleData.company}}</span>
          </div>
          <div>
            <label for>客服电话：</label>
            <span>{{ruleData.telephone}}</span>
          </div>
          <div class="flat_dialog_main_ins">
            <label for>活动说明：</label>
            <span v-html="$breakLine(ruleData.description || '')"></span>
          </div>
        </div>
        <div class="flat_dialog_rule_law">页面由聚合数据提供，技术支持仅供页面技术，不承担由活动引起的相关法律责任。</div>
      </div>
      <div class="flat_dialog_content_box flat_dialog_content_bonus" v-else-if="title == '我的奖品'">
        <div class="flat_dialog_tab flat_dialog_tab_bonus" @click="title = '活动规则'">活动规则</div>
        <div class="flat_dialog_main_content flat_dialog_main_bonus" v-if="giftList.length">
          <div
            class="flat_dialog_item"
            v-for="one in giftList"
            :key="one.id"
            @click="goToGet(one)"
          >
            <div class="flat_dialog_item_img"></div>
            <div class="flat_dialog_item_ins">
              <div class="flat_dialog_item_name">{{one.gift_name}}</div>
              <div class="flat_dialog_item_date">{{one.end_time}} 过期</div>
            </div>
            <div class="flat_dialog_item_guide">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="flat_dialog_item_status">
              <!-- 已过期 -->
              <img
                :src="`${imgBaseUrl}/rewrite_dialog/${temName? temName+'_' : ''}outofdate.png`"
                alt
                v-if="one.status == 2"
              />
              <!-- 已领取 -->
               <!-- <img
                :src="`${imgBaseUrl}/rewrite_dialog/${temName? temName+'_' : ''}getted.png`"
                alt
                v-else-if="one.gift_status == 1"
              /> -->
              <!-- 待领取 -->
              <!-- one.contact_type_set -->
              <img
                :src="`${imgBaseUrl}/rewrite_dialog/${temName? temName+'_' : ''}getting.png`"
                alt
                v-else-if="one.gift_status == 0"
              />
              <!-- 常态 -->

            </div>
          </div>
        </div>
        <div class="flat_dialog_not_bonus" v-else>
          <img
            class="lat_dialog_nobonus_img"
            :src="`${imgBaseUrl}/rewrite_dialog/no_bonus.png`"
            alt
          />
          <div class="flat_dialog_nobonus_major">暂无中奖记录</div>
          <div class="flat_dialog_nobonus_cmajor">您还没有奖品，快去抽奖吧～</div>
        </div>
      </div>
      <div class="flat_dialog_content_box flat_dialog_rank" v-else>
        <div class="flat_dialog_rank_tabs">
          <div class="flat_dialog_tab" @click="title = '我的奖品'">我的奖品</div>
          <div class="flat_dialog_tab" @click="title = '活动规则'">活动规则</div>
        </div>
        <div class="flat_dialog_main_content flat_dialog_main_rank">
          <div class="flat_dialog_rank_order">当前排名No.{{rankLast}}（只显示前20名）</div>
          <div class="flat_dialog_rank_list">
            <div class="flat_dialog_ranklist_head">
              <label>排行</label>
              <label>头像</label>
              <label>昵称</label>
              <label>成绩</label>
            </div>
            <div class="flat_dialog_ranklist_content">
              <div v-for="(one, index) in rankList" :key="index" class="flat_dialog_ranklist_item">
                <!-- https://juheimg.oss-cn-hangzhou.aliyuncs.com/wx_h5/rewrite_dialog/rank_1.png -->
                <span >
                  <img :src="`${imgBaseUrl}/rewrite_dialog/rank_${index+1}.png`" alt="" v-if="index <= 2">
                  <span v-else>{{index+1}}</span>
                </span>
                <span><img :src="one.headimgurl" alt=""></span>
                <span>{{one.nickname}}</span>
                <span>{{one.points}}分</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
// const Dialog = () => import('./Index')
// import Dialog from "./Index";
import { activityRule, getGameRank } from "../../../api/api.js";
import { imgBaseUrl } from "@/config";
export default {
  components: { Dialog: () => import('./Index') },
  props: {},
  data() {
    return {
      show: false,
      imgBaseUrl,
      title: "活动规则", // '活动规则'、'排行榜'、'我的奖品'、
      giftList: [], //
      ruleData: {}, //
      temName: "",
      rankList: [],
      rankLast: null,
    };
  },
  created() {},
  mounted() {
    // this.getBonus();
  },
  computed: {},
  methods: {
    goToGet(d) {
      // 礼品卡抽中默认为已兑换
      if(d.status != 2) {
        if(d.gift_status == 0) { // 未领取跳填写信息弹窗
          this.$addressDialog.open({id: d.id, temName: this.temName})
        }else this.$detailDialog.open({id: d.id, temName: this.temName});
      }
    },
    open(options) {
      this.show = true;
      this.title = (options && options.title) || "活动规则";
      if(this.title == '排行榜') {
        this.rankList = []
        this.$loading.open();
        getGameRank({aid: localStorage.getItem("aid")}).then(res => {
          this.rankLast = res.data.rank_last
          this.rankList = res.data.rank_list
          this.$loading.close();
        })
      }
      this.temName = options && options.temName;
      this.callback = options && options.callback;
    },
    // 获取奖品
    getBonus() {
      this.giftList = [];
      this.$loading.open();
      activityRule({
        aid: localStorage.getItem("aid")
      })
        .then(res => {
          this.$loading.close();
          if (res.code === 200) {
            this.ruleData = res.data.rule;
            this.giftList = res.data.gifts;
          }
        })
        .catch(() => {
          this.$loading.close();
        });
    }
  },
  watch: {
    show(v) {
      if (v) this.getBonus();
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../assets/styles/dialogBg.styl'
.flat_dialog_container
  text-align left
  .flat_dialog_content_box
    .flat_dialog_tab
      padding-top 20px
      font-size 28px
      font-family SourceHanSansCN-Medium, SourceHanSansCN
      font-weight 500
      color rgba(73, 82, 198, 1)
      text-decoration underline
    .flat_dialog_tab_bonus
      margin-right 40px
      text-align right
    .flat_dialog_main_content
      margin-top 40px
      padding 0 32px
      max-height 500px
      overflow-y scroll
      div
        margin-top 20px
        label
          font-size 28px
          font-family SourceHanSansCN-Bold, SourceHanSansCN
          font-weight bold
          color rgba(51, 51, 51, 1)
        span
          width 400px
          color rgba(102, 102, 102, 1)
          font-size 28px
          font-family SourceHanSansCN-Regular, SourceHanSansCN
          display inline-block
          line-height 40px
      .flat_dialog_main_ins
        display flex
        align-items baseline
    .flat_dialog_rule_law
      padding 20px 32px 60px 32px
      font-size 22px
      font-family SourceHanSansCN-Regular, SourceHanSansCN
      font-weight 400
      color rgba(204, 204, 204, 1)
      line-height 34px
  .flat_dialog_content_bonus
    .flat_dialog_main_bonus
      max-height 500px
      overflow-y scroll
      .flat_dialog_item
        margin-top 0
        width 550px
        height 172px
        background rgba(255, 255, 255, 1)
        box-shadow 0px 4px 20px 0px rgba(73, 81, 197, 0.2)
        border-radius 16px
        margin-bottom 40px
        position relative
        display flex
        .flat_dialog_item_img
          width 136px
          height 136px
          box-shadow 0px 4px 20px 0px rgba(73, 81, 197, 0.2)
          border-radius 16px
          margin-left -20px
          background url('https://juheimg.oss-cn-hangzhou.aliyuncs.com/wx_h5/rewrite_dialog/detailgift.png') #fff no-repeat center / 85%
        .flat_dialog_item_ins
          width 360px
          padding-left 20px
          font-family PingFangSC-Semibold, PingFangSC
          .flat_dialog_item_name
            margin-top 25px
            font-size 28px
            font-weight 600
            color rgba(51, 51, 51, 1)
          .flat_dialog_item_date
            font-size 24px
            font-weight 400
            color rgba(153, 153, 153, 1)
            margin-top 25px
        .flat_dialog_item_guide
          width 50px
          height 10px
          transform rotateZ(90deg) translateX(50px)
          margin-top 10px
          span
            width 8px
            height 8px
            background rgba(73, 82, 198, 1)
            margin-right 8px
            border-radius 50%
        .flat_dialog_item_status
          position absolute
          right 0
          bottom 0
          img
            width 84px
    .flat_dialog_not_bonus
      height 500px
      text-align center
      .lat_dialog_nobonus_img
        width 536px
      .flat_dialog_nobonus_major
        font-size 28px
        font-family SourceHanSansCN-Bold, SourceHanSansCN
        font-weight bold
        color rgba(102, 102, 102, 1)
        line-height 40px
      .flat_dialog_nobonus_cmajor
        font-size 24px
        font-family SourceHanSansCN-Regular, SourceHanSansCN
        font-weight 400
        color rgba(153, 153, 153, 1)
        line-height 36px
        margin 18px auto 152px
  .flat_dialog_rank
    .flat_dialog_rank_tabs
      padding 0 40px
      display flex
      justify-content space-between
    .flat_dialog_main_rank
      margin-top 20px
      .flat_dialog_rank_order
        width 388px
        margin auto
        line-height 40px
        background rgba(255, 235, 222, 1)
        border-radius 16px
        font-size 24px
        color rgba(255, 123, 42, 1)
        text-align center
      .flat_dialog_rank_list
        .flat_dialog_ranklist_head
          label
            font-size 28px
            font-family SourceHanSansCN-Bold, SourceHanSansCN
            font-weight bold
            color rgba(51, 51, 51, 1)
            display inline-block
          label:nth-child(1)
            width 150px
            text-align left
          label:nth-child(2)
            width 88px
            text-align center
          label:nth-child(3)
            width 234px
            text-align center
          label:nth-child(4)
            width 90px
            text-align center
        .flat_dialog_ranklist_content
          .flat_dialog_ranklist_item
            margin-top 20px
            span:nth-child(1)
              width 150px
              text-align left
              img 
                width 48px
                height 48px
              span  
                width 48px
                text-align center
                font-size 24px
                font-weight bold
            span:nth-child(2)
              width 88px
              text-align center
              img   
                width 88px
                height 88px
                border-radius 50%
            span:nth-child(3)
              width 234px
              text-align center
            span:nth-child(4)
              width 90px
              text-align center 

</style>
