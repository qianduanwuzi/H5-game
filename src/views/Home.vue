<template>
  <div class="home">
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
// @ is an alias to /src
import pathMap from "@/config/pathMap";
export default {
  name: "home",
  components: {},
  data() {
    return { pathMap };
  },
  computed: {
    currentComponent() {
      return () =>
        import(
          `./${
            this.pathMap.find(c => c.temp_id == (this.$route.query.tpl_id || 2))
              .file_path
          }/index.vue`
        );
    }
  }
};
</script>
