<template>
  <div class="content" >
      <component :is="currentComponent"></component>
  </div>
</template>
<script>
import pathMap from '@/config/pathMap';
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
     pathMap,
    };                            
  },
  computed: {
    currentComponent () {
      return () => import(`./${this.pathMap.find(c => c.temp_id == (this.$route.query.tplId || 9)).file_path}/Index.vue`);
    },
  
  },
  watch: {
  
  },
  created () {
   
  },
  mounted() {
  },  
  methods: {
  }  
};
</script>

<style lang="stylus" scoped>

</style>
