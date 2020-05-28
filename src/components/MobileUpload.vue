<template>
  <div class="mobile-uploader-container">
    <upload-input
      @change="handleFileChange">
    </upload-input>
  </div>
</template>

<script>
import UploadInput from './UploadInput'
import { get, post, postFile } from '../assets/ajax'
import { blobSlice } from '../util/fileUtil'
export default {
  name: 'MobileUpload',
  inject: ['config', 'statusMap', '$Events'],
  components: {
    UploadInput
  },
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    // 处理文件选择变化
    handleFileChange (files) {
      files.forEach(item => {
        item.loaded = 0
        item.status = this.statusMap.progress
        this.handleRepeatFile(item)
      })
      this.show = true
      // 触发获取完md5的文件列表
      this.$Events.$emit('md5', files)
    },
    // 处理重复文件上传
    handleRepeatFile (file) {
      let isExclude = false
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].md5 === file.md5) {
          isExclude = true
          break
        }
      }
      if (!isExclude) {
        this.fileList.push(file)
        this.handleUploadStart(file, this.fileList.length - 1)
      }
    },
    // 处理开始上传
    handleUploadStart (file, index) {
      // 计算要发送到后端的分支数，用于后端计算
      const chunks = Math.ceil(file.size / this.config.chunkSize)
      // 如果文件上传过但未完全上传，则需要把contextId发送给后端
      const getUploaderInfo = this.getUploaderInfo(file.md5)
      const params = {
        filename: file.name,
        md5: file.md5,
        chunks: chunks,
        contextId: getUploaderInfo ? getUploaderInfo.lastContextId : '',
        getDetail: this.config.getDetail
      }
      // 发送预上传请求
      post(this.config.path, params, file.md5).then(prepareInfo => {
        if (prepareInfo && prepareInfo.data) {
          switch (prepareInfo.data.code) {
            case 100:
              this.fileList[index].loaded = 100
              this.$set(this.fileList, index, this.fileList[index])
              this.handlerGetDetail(prepareInfo, index)
              break
            case 101:
              this.uploadChunks(file, prepareInfo, index)
              break
            case 102:
              this.uploadChunks(file, prepareInfo, index, true)
              break
          }
        }
      }).catch(e => {
        // this.updateStatus(this.statusMap.pause, index)
        console.log(e)
      })
    },
    // 分片上传接口 isHalf：是否上传一半
    async uploadChunks (file, prepareInfo, index, isHalf) {
      const chunkTokens = prepareInfo.data.chunkTokens
      let lastChunkNo = 0
      for (const chunkItem of chunkTokens) {
        try {
          // 如果是文件没完全上传成功
          if (isHalf) {
            const getUploaderInfo = this.getUploaderInfo(file.md5)
            lastChunkNo = getUploaderInfo ? getUploaderInfo.lastChunkNo : 0
          }
          const start = lastChunkNo * this.config.chunkSize
          let end = start + this.config.chunkSize
          if (end > file.size) {
            end = file.size
          }
          // 上传前记录
          this.recordUploadInfo(file.md5, {
            lastChunkNo: lastChunkNo,
            lastContextId: chunkItem.params.contextId
          })
          const currentBlob = blobSlice(file, start, end)
          const params = {
            ...chunkItem.params,
            file: currentBlob
          }
          const formData = new FormData()
          for (const key in params) {
            formData.append(key, params[key])
          }
          const res = await postFile(chunkItem.url, formData, file.md5)
          lastChunkNo++
          // 上传成功后记录
          this.recordUploadInfo(file.md5, {
            lastChunkNo: lastChunkNo,
            lastContextId: chunkItem.params.contextId
          })
          // 计算分片的上传进度
          this.calcProgress(end, file.size, res, index)
          // 如果最后一片上传完毕,调用合并文件接口
          if (end === file.size) {
            this.handleUploadComplete(prepareInfo, file, index)
            this.handlerGetDetail(prepareInfo, index)
            // 上传完该文件的最后一片，将记录清除
            this.recordUploadInfo(file.md5, null, true)
            break
          }
        } catch (e) {
          console.log('分片上传过程出错!', e)
          this.updateStatus(this.statusMap.pause, index)
          break
        }
      }
    },
    // 处理上传完成，调用接口合并文件
    handleUploadComplete (prepareInfo, file, index) {
      const completeToken = prepareInfo.data.completeToken
      post(completeToken.url, completeToken.params, file.md5).then(res => {
        if (res) {
          // this.updateStatus(this.statusMap.success, index)
          // 合并文件完成，文件上传成功
          this.$Events.$emit('success', file, res, index)
        }
      })
    },
    // 记录/删除 当前上传信息
    recordUploadInfo (md5, chunkItem, isDelete = false) {
      const uploadInfo = JSON.parse(localStorage.getItem('uploadInfo')) || {}
      if (isDelete) {
        delete uploadInfo[`${md5}`]
      } else {
        uploadInfo[`${md5}`] = {
          lastChunkNo: chunkItem.lastChunkNo,
          lastContextId: chunkItem.lastContextId
        }
      }
      localStorage.setItem('uploadInfo', JSON.stringify(uploadInfo))
    },
    // 根据md5值，获取缓存的上传信息
    getUploaderInfo (md5) {
      const uploadInfo = JSON.parse(localStorage.getItem('uploadInfo')) || {}
      return uploadInfo[md5]
    },
    // 处理获取文件详细信息
    handlerGetDetail (prepareInfo, index) {
      if (this.config.getDetail && prepareInfo.data.detailToken) {
        const detailToken = prepareInfo.data.detailToken
        get(detailToken.url, detailToken.params).then(res => {
          this.$Events.$emit('detail', res, index)
        })
      }
    },
    // 计算上传进度
    calcProgress (end, fileSize, res, index) {
      const item = this.fileList[index]
      item.loaded = parseFloat((end / fileSize * 100).toFixed(2))
      // this.$set(this.fileList, index, item)
      this.$Events.$emit('progress', item.loaded, item, res, index)
    }
  }
}
</script>

<style lang="scss" scoped>
  .mobile-uploader-container{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
</style>
