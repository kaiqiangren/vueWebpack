<template>
  <div class="overflow-container">
    <transition name="fade">
      <div class="overflow-info" v-show="showTooltip">
        {{content}}
      </div>
    </transition>
    <div class="overflow-context" :style="{'maxWidth':width + 'px'}"
         @mouseenter="handleEnter"
         @mouseleave="handleLeave"
    >
      {{content}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overflow',
  props: {
    width: {
      type: [Number, String],
      default: 250
    },
    content: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showTooltip: false
    }
  },
  methods: {
    handleEnter (e) {
      if (e.target.scrollWidth > e.target.offsetWidth) {
        this.showTooltip = true
      }
    },
    handleLeave (e) {
      if (e.target.scrollWidth > e.target.offsetWidth) {
        this.showTooltip = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/var";
  .overflow-container {
    width:100%;
    position: relative;
    .overflow-info {
      position: absolute;
      bottom: -2.5em;
      z-index: 2020;
      left: 0;
      background: $--background-color-dark;
      border-radius: 5px;
      color: #fff;
      padding: 6px 12px;
      font-size: 14px;
      &::before{
        content: "";
        width: 0;
        height: 0;
        border-bottom: 6px solid $--background-color-dark;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        position: absolute;
        left: 50%;
        top: -6px;
      }
    }
    .overflow-context {
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
