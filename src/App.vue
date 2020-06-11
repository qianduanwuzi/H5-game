<template>
  <div id="app">
    <template>
      <router-view/>
    </template>
    <!-- <template v-if="!isWeixin">
      <p style="font-size:20px;margin-top:300px">请在微信浏览器里打开</p>
    </template> -->
  </div>
</template>

<script>

export default {
  name: 'App',
   components: {
  },
  data () {
    return {
    }
  },
  computed: {
    // isWeixin () {
    //   return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
    // },
  
  },
  watch: {
  
  },
  created () {
   
  },
  methods: {
  
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  -webkit-overflow-scrolling: touch;
}
</style>
