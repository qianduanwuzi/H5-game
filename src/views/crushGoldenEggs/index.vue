<template>
  <div class="crush_golden_eggs_box">
    砸金蛋
    <div class="eggs_ope_box">
      <img
        class="bammer"
        src="https://pd-m.zhengyitech.com/static/img/gold-egg/hammer.png"
        style="left: 0"
      />
      <div class="eggs_box">
        <img
          v-for="one in 3"
          :key="one"
          src="https://pd-m.zhengyitech.com/static/img/gold-egg/egg.png"
          @click="eggClickHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/utils";
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    eggClickHandler(e) {
      // 当前点击金蛋二维
      const cur_dimension = e.target.getBoundingClientRect();
      // 锤子二维
      const bammer_cur_dimension = util.computeDom(".bammer");
      let bammer_dom = document.querySelector(".bammer");
      const translate_x = cur_dimension.left - bammer_cur_dimension.left;
      // debugger
      // bammer_dom.style.left = parseInt(bammer_dom.style.left) + translate_x + 'px'
      util.animateDom(translate_x, bammer_dom, "left", 0.5);
      setTimeout(() => {
        bammer_dom.classList.add("bammer_crush");
      }, 200);
    }
  },
  watch: {}
};
</script>
<style lang="stylus" scoped>
.crush_golden_eggs_box
  font-size 20px
  .eggs_ope_box
    position relative
  .bammer
    position absolute
    width 100px
    top -90px
  .bammer_crush
     transform: rotate(30deg) translateY(50%);
     transition: all .2s linear
  .eggs_box
    width 600px
    margin  200px auto

    img
      width 150px
</style>
