<template>
  <main-container :bread-crumb="breadCrumb">
    <div class="work-order-add">
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addForm"
        label-width="100px"
        class="demo-addForm"
      >
        <el-form-item label="工单标题：" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="咨询模块：" prop="typeId" >
          <el-select
            v-model="addForm.typeId"
            placeholder="请选择类型"
            style="width: 100%"
            v-loading="loading"
          >
            <el-option :label="category.name" :value="category.id" v-for="category in adviceModule" :key="category.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题描述：" prop="des">
          <el-input
            type="textarea"
            placeholder="请填写问题描述"
            v-model="addForm.des"
            :rows="10"
            maxlength="300"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="紧急状态：" prop="status">
          <el-radio-group v-model="addForm.status">
            <el-radio :label="3">非常紧急</el-radio>
            <el-radio :label="6">重要</el-radio>
            <el-radio :label="9">一般</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="手机号码：" prop="mobile">
          <el-input
            v-model="addForm.mobile"
            placeholder="请填写正确手机号码"
          ></el-input>
          <div class="mobile-tip">
            紧急情况时，聚合数据工程师会与您电话联系，请填写正确手机号
          </div>
        </el-form-item>
        <el-form-item label="上传附件：" prop="name">
          <el-upload
            :on-change="fileChange"
            :before-upload="beforeUpload"
            :http-request="httpRequest"
            :on-exceed="fileExceed"
            :multiple="true"
            :show-file-list="false"
            class="upload-demo"
            action="#"
            accept="image/gif, image/jpeg, image/png"
            :limit="5"
          >
            <el-button size="small" icon="el-icon-link">选择附件</el-button>
            <div slot="tip" class="el-upload__tip">
              <span v-if="!uploadResult">可上传5个附件</span>
              <span v-else class="isAbove"><i class="el-icon-warning"></i>{{uploadResult}}</span>
              <div>
                每个附件大小不得超过2M。附件支持的格式有:'jpg', 'jpeg',
                'png','gif'
              </div>
            </div>
          </el-upload>
          <!-- <el-input v-model="addForm.name"></el-input> -->
        </el-form-item>
        <div v-for="(one,index) in showFileList" :key="one.name" class="file-item">
          <img :src="one.img" alt="">
          <div class="flex">{{one.name}} <i class="el-icon-close" @click="deleteFileHandler(index)"></i></div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm()" :loading="submitLoading" class="commit-btn"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </main-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { postAnOrder } from '@/api/work-order'
import debounce from 'lodash.debounce'
import { regMobile } from '@/config/index'
export default {
  components: {},
  props: {},
  data () {
    var validatePhone = (rule, value, callback) => {
      if (!value || !regMobile.test(value)) {
        callback(new Error('请填写正确手机号码'))
      } else callback()
    }
    return {
      breadCrumb: [
        { name: '返回', path: '/workOrder/list' },
        { name: '创建新工单' }
      ],
      addForm: { title: '', typeId: '', des: '', mobile: '' },
      rules: {
        title: [
          { required: true, message: '请输入工单标题', trigger: 'blur' },
          { max: 30, message: '填写30字以内的标题', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '请选择咨询模块类型', trigger: 'change' }
        ],
        des: [{ required: true, message: '请填写问题描述', trigger: 'blur' }],
        // status: [{ required: true }],
        mobile: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ]
      },
      fileList: [],
      isAbove: false,
      submitLoading: false,
      uploadResult: '',
      msgResult: '',
      loading: true
    }
  },
  created () {},
  mounted () {
    this.$store.dispatch('getAdviceModule')
  },
  computed: {
    showFileList () {
      return this.fileList.map(file => { return { img: URL.createObjectURL(file.raw), ...file } })
    },
    ...mapGetters({
      adviceModule: 'adviceModule'
    })
  },
  methods: {
    async submitForm () {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          const formData = new FormData()
          for (const key in this.addForm) {
            formData.append(key, this.addForm[key])
          }
          if (this.showFileList.length) {
            this.showFileList.forEach(file => {
              formData.append('appendix[]', file.raw)
            })
          }
          const res = await postAnOrder(formData)
          this.submitLoading = false
          if (res.code === 0) {
            this.$message.success('创建成功！')
            this.$router.push('/workOrder/list')
          }
        } else {
          return false
        }
      })
    },
    httpRequest () {
      // 必有，不然fileExceed不起作用
    },
    // auto-upload为true beforeUpload才起作用
    beforeUpload (file) {
      const type = ['image/png', 'image/jpeg', 'image/gif']
      const isExcel = type.indexOf(file.type) > -1
      const isLt2M = file.size / 1024 / 1024 < 2
      if (isExcel && isLt2M) {
        // this.fileList.push(file)
      } else {
        this.uploadResult = '上传有误'
        if (!isExcel) this.msgResult = this.msgResult + file.name + '文件类型错误，'
        else if (!isLt2M) this.msgResult = this.msgResult + file.name + '文件大小过大，'
      }
      return isExcel && isLt2M
    },
    // beforeUpload过滤掉不符合条件，filechange的filelist为符合条件的
    fileChange (file, fileList) {
      // 手动删除情况下一并删除原fileList，才能对fileExceed有作用
      this.fileList = fileList
    },
    fileExceed (file, fileList) {
      this.uploadResult = '您最多可上传5个附件'
      this.$message.error('您最多可上传5个附件！')
    },
    deleteFileHandler (ind) {
      this.fileList.splice(ind, 1)
    }
  },
  watch: {
    adviceModule: {
      deep: true,
      handler (v) {
        if (this.$route.query.category) {
          if (v.some(category => category.id === Number(this.$route.query.category))) {
            this.addForm.typeId = Number(this.$route.query.category)
          } else this.addForm.typeId = v[0].id
        } else this.addForm.typeId = v[0].id
        this.loading = false
      }
    },
    // 提交的时候做提示
    msgResult: debounce(function () {
      if (this.msgResult) {
        this.$message({
          message: this.msgResult.slice(0, this.msgResult.length - 1),
          type: 'error',
          duration: 5000
        })
        // 清空以便下次正常操作
        this.msgResult = ''
      }
    }, 300)
  }
}
</script>
<style lang="stylus" scoped>
/deep/.el-form-item--mini
  width 500px
/deep/.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item
        margin-bottom 24px
/deep/.upload-demo
        padding-bottom 8px
        .el-upload__tip
          position relative
          margin-top 0
          span
            position absolute
            left 117px
            top -29px
            color #8C8C8C
          .isAbove
            color #FF5441
            font-size 14px
          div
            position absolute
            color #BFBFBF
            width 605px
.work-order-add
  padding-top 40px
  padding-left 45px
  .demo-addForm
    width 500px
  .mobile-tip
    font-size 12px
    color #8C8C8C
  .commit-btn
      width 88px
      margin-top 24px
  .file-item
    margin-left 100px
    width 400px
    height 80px
    background #F5F5F5
    border-radius 2px
    padding 10px
    font-size 12px
    color #595959
    margin-bottom 10px
    img
      width 40px
      height 40px
      margin-bottom 6px
    div
      justify-content space-between
      i
        font-size 14px
        cursor pointer
</style>
