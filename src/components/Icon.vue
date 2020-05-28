<template>
  <svg class="icon" :style="{
    width:size,
    height:size,
    color:color
  }" aria-hidden="true" @click="handleClick">
    <use :xlink:href="name"></use>
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      default: '#close1'
    },
    size: {
      type: String,
      default: '1em'
    },
    color: {
      type: String,
      default: '#409EFF'
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style scoped>
  .icon {
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    cursor: pointer;
  }
</style>
