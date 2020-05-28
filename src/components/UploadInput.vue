<template>
  <input
    class="normal-input"
    ref="uploadInput"
    type="file"
    :accept="config.accept"
    :multiple="config.multiple"
    @change="handleFileChange"
  />
</template>

<script>
import { getFileMd5 } from '../util/fileUtil'
export default {
  name: 'UploadInput',
  inject: ['config'],
  methods: {
    // 选择文件
    async handleFileChange (e) {
      const files = Array.prototype.slice.call(e.target.files)
      let index = 0
      for (const file of files) {
        await getFileMd5(file).then(md5 => {
          file.md5 = md5
          file.loaded = 0
        })
        index++
        // 减少获取md5的遍历次数，提高程序运行效率
        if (index === this.config.limit) {
          break
        }
      }
      this.$refs.uploadInput.value = ''
      // 限制最大上传数量
      files.splice(this.config.limit)
      this.$emit('change', files)
    }
  }
}
</script>

<style scoped>
  .normal-input {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
  }
</style>
