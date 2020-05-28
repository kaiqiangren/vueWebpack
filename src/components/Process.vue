<template>
  <div class="progress">
    <overflow class="loaded-show" :content="label"></overflow>
    <div
      class="strip-loaded"
      :style="{
      width:width + '%'
    }"></div>
    <div class="loaded-progress">
      <span>{{currentSize | sizeFilter}} /{{size | sizeFilter}}</span>
      {{width}}%
    </div>
  </div>
</template>

<script>
import Overflow from './Overflow'
export default {
  name: 'Process',
  components: {
    Overflow
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 0
    },
    size: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    currentSize () {
      return this.size * this.width / 100
    }
  },
  filters: {
    sizeFilter (size) {
      const DW = ['B', 'K', 'M', 'G', 'T']
      let d = 0
      while (size > 1024) {
        size = size / 1024
        d++
      }
      // 如果是1位就取一位小数，否则直接四舍五入
      if (size < 10) {
        size = size.toFixed(1)
      } else {
        size = Math.round(size)
      }
      return size + DW[d]
    }
  }
}
</script>

<style lang="scss" scoped>
  .loaded-show {
    color: #606266;
  }
  @keyframes scroll {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 100% 0
    }
  }
  .progress {
    width:100%;
    height:30px;
    line-height:30px;
    position: relative;
    padding: 5px 2px;
  }
  .progress .strip-loaded {
    color:#fff;
    font-size:10px;
    line-height:30px;
    text-align:right;
    background-color:#D9ECFD;
    border-radius:5px;
    transition: width 0.5s;
    position: absolute;
    top: 5px;
    height: 30px;
    z-index: -1;
    animation:scroll 12s linear infinite;
  }
  .loaded-progress{
    position: absolute;
    right: 0;
    top: 5px;
    font-size: 14px;
    color: #E6A23C;
  }
</style>
