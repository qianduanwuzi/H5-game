/** 
   * 活动首页抽出部分公共逻辑，后续继续优化
   * author chennan
   * data 9/10
  */
import { imgBaseUrl } from "@/config";
// import pathMap from "@/config/pathMap"
var tempCommon = {
  props:{
    homeList: {
      type: Object
    },
    gifts: {
      type: Array
    },
    surplus_day: {
      type: Number
    }
  },
  data() { // 如果解构较多数据，请保证字段名统一
      return {
        sheetInfo: { tipId: 1, giftTitle: "", msgText: "" }, // 未抽出来前的水墨版刮刮乐逻辑（后续忽略）
        imgBaseUrl,
      }
  },
  computed: {
     
  },
  watch: {
   
  },
  created(){
  
  },
  mounted() {

  },
  methods: {
    /**
     * 正常动画完即走接口
     */
    getBonus() {
      alert('自己写逻辑吧')
    },
    
  }
}

export default tempCommon