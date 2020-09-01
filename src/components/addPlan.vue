<template>
  <main-container :bread-crumb="breadCrumb" class="sms-tpl-apply">
    <div class="top flex" v-loading="loading">
      <div class="phone-bg">
        <div class="sms-content color-black">{{ tplContent.tpl_sign? ('【' + tplContent.tpl_sign + '】' + tplContent.tpl_content) : ''}}</div>
      </div>
      <div class="top-right">
        <div class="header-tip">
          <div class="flex align-center">
            <i class="el-icon-warning-outline"></i><span>重要提示</span>
          </div>
          <div>
            <div>
              1、为了预防您号码上传错误或者其他原因，此处选择模板提交号码后，并没有真正发送，在
              <span class="color-blue pointer text-underline" @click="$router.push('/application/sms/index')">
                发送计划列表页面
              </span>
              点击 确认发送。
            </div>
            <div>
              2、请注意短信的类别，再进行相关的操作
            </div>
          </div>
        </div>
        <div class="form">
          <el-form
            :model="planForm"
            ref="planForm"
            label-width="170px"
            class="demo-planForm"
            :validate-on-rule-change="false"
          >
            <el-form-item label="模板类型：" prop="smsType" class="sms-type-item">
              <div class="flex tpl-type">
                <template v-if="isDetail">
                  <div class="tpl-type-active">
                    <!-- smsType -->
                  </div>
                </template>
                <template v-else>
                  <div
                    v-for="one in smsType"
                    :key="one.value"
                    :class="{
                      'tpl-type-active': planForm.smsType === one.value
                    }"
                    @click="planForm.smsType = one.value"
                  >
                    {{ one.label }}
                  </div>
                </template>
              </div>
            </el-form-item>
            <div v-loading="tplLoading">

              <el-form-item label="剩余次数：" prop="tpl_last" class="tpl-last">
                剩余{{baseInfo.surplus || 0}}次，<span class="color-blue pointer" @click="goBuy(baseInfo)">去购买></span>
              </el-form-item>
              <el-form-item label="模板名称："  class="tpl-choose" required>
                <el-select
                  style="width: 470px"
                  v-model="planForm.tplId"
                  v-if="baseInfo.tpl.length"
                  placeholder="请选择短信文本模板"
                  @change="tplChangeHandler"
                >
                  <el-option
                    v-for="item in baseInfo.tpl"
                    :key="item.id"
                    :label="item.tpl_name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <div v-else class="no-tpl">
                  暂无已通过审核的短信模板
                </div>
                <div class="apply-tpl">
                  还未创建/无合适的模板？<span
                    class="color-blue pointer"
                    @click="$router.push('/application/sms/tplApply')"
                  >
                    申请新模板
                  </span>
                </div>
              </el-form-item>

            </div>

            <el-form-item label="号码上传："  required>
              <el-radio v-model="planForm.importType" :label="1"
                >手动输入</el-radio
              >
              <el-radio v-model="planForm.importType" :label="2"
                >批量上传</el-radio
              >
              <div v-show="planForm.importType === 1">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="每行支持一个号码，多个手机号码请按回车换行"
                  v-model="mobiles"
                >
                </el-input>
                <div class="color-red" style="font-size: 12px">
                  注：单次上传最多支持20个号码，超过20个号码请选择批量上传
                </div>
              </div>
              <div v-show="planForm.importType === 2">
                <div class="upload-need">选择文件（5MB），.csv .txt    </div>
                <el-upload
                  :show-file-list="false"
                  :before-upload="beforeImageUpload"
                  :http-request="httpRequest"
                  class="upload-demo"
                  action="#"
                  accept=".csv, text/plain"
                >
                  <el-button size="small">上传文件</el-button>
                </el-upload>
                <div class="upload-file-show" v-show="uploadFile.name">{{uploadFile.name}}</div>
                <div class="color-red upload-max-tip">注：模板单次上传最大数量为{{baseInfo.limit && baseInfo.limit.mobile_max}}个</div>
                <div class="upload-demo-nav">上传模板下载：</div>
                <div class="upload-demo-download">
                  <a :href="`${$store.getters.baseUrl}/upload/example/csv`">CSV模板下载</a>
                   <span>【<span class="color-red">注：</span>表格请删除多余空白列】</span>
                </div>
                <div class="upload-demo-download">
                  <a :href="`${$store.getters.baseUrl}/upload/example/txt`">TXT模板下载</a>
                   <span style="padding-left: 2px">【<span class="color-red">注：</span>文本请以回车分割号码】</span>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="发送时间：" v-if="baseInfo.sendTime">
              <el-date-picker
                v-model="planForm.sendTime"
                :picker-options="startDateOpt"
                type="datetime"
                placeholder="选择发送时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="savePlan" :loading="saveLoading"
                >保存计划</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </main-container>
</template>

<script>
import { addSendPlan, getUploadBaseInfo } from '@/api/smsSend'
import { smsType } from '@/config/index'
export default {
  components: {},
  props: {},
  data () {
    return {
      smsType,
      breadCrumb: [
        { name: '返回', path: '/application/sms/index' },
        { name: '创建新计划' }
      ],
      planForm: {
        smsType: 54,
        tplId: '',
        importType: 1,
        sendTime: ''
      },
      smsTxtList: [],
      mobiles: '',
      loading: false,
      tplContent: {},
      saveLoading: false,
      uploadFile: '',
      baseInfo: { tpl: [], limit: {} },
      startDateOpt: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime()
        }
      },
      tplLoading: false
    }
  },
  created () {},
  mounted () {
    this.getUploadBaseInfo()
  },
  computed: {
    isDetail () {
      return false
    }
  },
  methods: {
    goBuy (info) {
      if (this.planForm.smsType === 54) {
        if (!this.baseInfo.limit.applyId) {
          window.open('/data/index/apply/54')
        } else window.open(`/data/index/buy/${this.baseInfo.limit.applyId}`)
      } else {
        if (!this.baseInfo.limit.applyId) {
          window.open('/data/index/apply/288')
        } else window.open(`/data/index/buy/${this.baseInfo.limit.applyId}`)
      }
    },
    beforeImageUpload (file) {
      const type = [
        'application/vnd.ms-excel',
        'text/plain',
        'text/csv'
      ]
      const isExcel = type.indexOf(file.type) > -1
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isExcel) {
        this.$message.error('上传文件只能是CSV，TXT格式！')
      } else if (!isLt5M) {
        this.$message.error('上传文件大小不能超过 5MB！')
      }
      return isExcel && isLt5M
    },
    httpRequest (data) {
      this.uploadFile = data.file
    },
    async savePlan () {
      if (!this.planForm.tplId) {
        this.$message.error('请选择短信模板！')
        return
      }
      if (this.planForm.importType === 1 && !this.mobiles) {
        this.$message.error('请填写号码！')
        return
      }
      if (this.planForm.importType === 2 && !this.uploadFile.name) {
        this.$message.error('请上传文件！')
        return
      }
      this.saveLoading = true
      if (this.planForm.importType === 1) {
        this.planForm.mobiles = this.mobiles
      } else {
        var formData = new FormData()
        formData.append('smsType', this.planForm.smsType)
        formData.append('importType', 2)
        formData.append('mobileFile', this.uploadFile)
        formData.append('tplId', this.planForm.tplId)
      }
      const { code } = await addSendPlan(this.planForm.importType === 1 ? { ...this.planForm } : formData)
      this.saveLoading = false
      if (code === 0) {
        this.$message.success('保存计划成功！')
        this.$router.push(`/application/sms/index?smsType=${this.planForm.smsType}`)
      }
    },
    tplChangeHandler (tplId) {
      this.tplContent = this.baseInfo.tpl.find(
        sms => sms.id === tplId
      )
    },
    async getUploadBaseInfo () {
      this.tplLoading = true
      const { result } = await getUploadBaseInfo(this.planForm.smsType)
      this.tplLoading = false
      this.baseInfo = result
      if (!result.sendTime) this.planForm.sendTime = ''
    }
  },
  watch: {
    'planForm.smsType': {
      handler (v) {
        this.planForm.tplId = ''
        this.tplContent = {}
        this.getUploadBaseInfo()
      }
    },
    mobiles (v) {
      if (v) {
        // 去除所有非数字和非换行
        const tV = v.replace(/[^0-9\n]/g, '')
        // 替换
        this.mobiles = tV
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
/deep/.tpl-choose
        input::-webkit-input-placeholder
          color #595959
/deep/.sms-type-item
        .el-form-item__label
          margin-top 6px
@media screen and (max-width: 1499px) {
  .phone-bg {
      display: none
  }
  .top {
    padding: 50px 24px 62px 24px !important;
  }
}
@media screen and (min-width:1500px) and (max-width: 1700px) {
  .top{
    width:  1198px;
    margin: auto;
    padding: 50px 0 62px 0 !important;
  }
}

.sms-tpl-apply
  .top
    padding 50px 24px 62px 170px
    .phone-bg
      width 350px
      height 632px
      background url('../../assets/images/application/smsmass/sms-mock-phone-bg.png') no-repeat center/100%
      position relative
      .sms-content
        background-color #F5F5F5
        border-radius 8px 8px 8px 0px
        width 240px
        font-size 14px
        line-height 22px
        padding 10px
        position absolute
        top 110px
        left 30px
        word-break break-all
        min-height 40px
    .top-right
      margin-left 65px
      padding-top 14px
      .header-tip
        width 798px
        // margin-top 17px
        background rgba(255,250,221,1)
        border-radius 1px
        border 1px solid rgba(255,214,102,1)
        font-size 14px
        padding 18px 26px
        line-height 22px
        >div:first-child
          i
            color #FAAD14
            margin-right 17px
            font-size 20px
          span
            color #262626
            font-weight 600
            font-size 16px
        >div:last-child
            padding-top 8px
            padding-left 37px
            color #595959
            .special-tip
              font-size 12px
              color #8C8C8C
      .form
        margin-top 40px
        .demo-planForm
          width 640px
          .tpl-type
            div
              width 120px
              text-align center
              line-height 40px
              border 1px solid #D9D9D9
              border-radius 2px
              font-size 14px
              color $colorBlack
              margin-right 16px
              cursor pointer
          .tpl-type-active
            border 2px solid $theme_color !important
            color $theme_color !important
            background url('../../assets/images/cost/invest/bank-logo-selected.png') no-repeat bottom right/27px 18px
          .tpl-choose
            position relative

            .no-tpl
              width 470px
              line-height 32px
              height 32px
              background rgba(255,255,255,1)
              border 1px solid rgba(217,217,217,1)
              border-radius 2px
              font-size 14px
              color #BFBFBF
              padding-left 16px
            .apply-tpl
              color #8C8C8C
              font-size 12px
          .upload-need
            color #8C8C8C
            font-size 12px
            height 30px
            margin-top -10px
          .upload-file-show
            width 400px
            padding-left 10px
            height 32px
            line-height 32px
            background rgba(245,245,245,1)
            font-size 12px
            color #595959
            margin 10px 0
          .upload-max-tip
            font-size 12px
            margin-top 10px
            line-height 16px
          .upload-demo-nav
            font-size 14px
            color #262626
            margin-top 10px
          .upload-demo-download
            font-size 14px
            color #262626
            line-height 22px
            a
              color #00BDFF
              text-decoration underline
</style>
