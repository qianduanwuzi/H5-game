<template>
  <transition name="fade">
    <div :class="['actionsheet',  `${temName? temName+'-' : ''}actionsheet`]" v-show="show">
      <div class="actionsheet-close" @click="hide">
        <span class="actionsheet-close-icon"></span>
      </div>
      <div class="actionsheet-content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ActionSheet',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    temName: String
  },
  data () {
    return {
      mask: null
    };
  },
  beforeDestroy () {
    if (this.mask) {
      this.mask.$emit('close');
    }
  },
  watch: {
    show: function (value) {
      if (value) {
        this.mask = this.$mask();
        this.mask.$on('close', () => {
          this.hide();
        });
      } else {
        this.mask.$emit('close');
      }
    }
  },
  methods: {
    hide () {
      this.$emit('hide');
    }
  }
};
</script>

<style lang="stylus" scoped>
// .actionsheet
//   width 466px
//   height 426px
//   background: url('../assets/images/lottery1/layerbg.png') no-repeat
//   background-size contain
//   position fixed
//   top 50%
//   left 50%
//   margin-left -233px
//   margin-top -213px
//   z-index 9

// .actionsheet-close
//   height 60px
//   position relative

// .actionsheet-close-icon
//   position absolute
//   right 24px
//   top 22px
//   width 32px
//   height 32px
//   background url('../assets/images/lottery1/closeBtn.png') no-repeat
//   background-size contain

.fade-enter-active
.fade-leave-active
  transition: all .2s ease-in-out;

.fade-enter
  transform translateY(-100%)
  opacity 0
.fade-leave-to
  opacity 0
</style>
