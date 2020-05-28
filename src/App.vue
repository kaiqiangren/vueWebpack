<template>
  <div class="lzx-uploader">
    <pc-upload
      v-if="config.env === 'pc'"
    >
    </pc-upload>
    <mobile-upload
      v-if="config.env === 'mobile'"
    >
    </mobile-upload>
  </div>
</template>

<script>
import PcUpload from './components/PcUpload'
import MobileUpload from './components/MobileUpload'

export default {
  components: {
    MobileUpload,
    PcUpload
  },
  name: 'App',
  inject: ['config']
}
</script>

<style>
  .lzx-uploader{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
</style>
