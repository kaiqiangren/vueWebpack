<template>
  <transition name="fade">
    <div class="pc-file-list" :style="{'width':collapse? '180px':'500px'}" v-if="show">
      <div class="pc-file-header">
        <div>上传文件</div>
        <div class="file-tools" style="float: right;">
          <icon name="#zuixiaohua" v-if="!collapse" @click="collapse=true"></icon>
          <icon name="#-zuidahua" v-if="collapse" @click="collapse=false"></icon>
          <icon name="#close1" @click="handleClose"></icon>
        </div>
      </div>
      <div class="pc-file-body" v-show="!collapse">
        <div
          class="pc-file-item"
          v-for="(item, index) in fileList" :key="item.md5">
          <div class="inline-block file-item-upload">
            <process
              :label="item.name"
              :width="item.loaded"
              :size="item.size"
            >
            </process>
          </div>
          <div class="inline-block file-item-tool" style="float: right">
            <icon class="inline-block rotate" v-if="item.status === statusMap.progress" name="#loading"
                  size="18px"></icon>
            <icon class="inline-block" v-if="item.status === statusMap.success" name="#success" size="20px"
                  color="#67C23A "></icon>
            <icon class="inline-block" v-if="item.status === statusMap.pause" @click="handleUploadStart(item, index)"
                  name="#play" size="20px"></icon>
            <icon class="inline-block" v-if="item.status === statusMap.progress" @click="handleUploadPause(item, index)"
                  name="#pause" size="16px"></icon>
<!--            <icon class="inline-block" v-if="item.status !== statusMap.success" @click="handleUploadClose(item, index)"-->
<!--                  name="#reeor" size="20px" color="#F56C6C"></icon>-->
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Icon from './Icon'
import Process from './Process'
import { cancelUpload } from '../assets/ajax'

export default {
  name: 'PcFileList',
  components: {
    Process,
    Icon
  },
  inject: ['statusMap', '$Events'],
  data () {
    return {
      collapse: false
    }
  },
  props: {
    show: {
      type: Boolean,
      default: true
    },
    fileList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:show', false)
      this.$emit('close')
      this.fileList.forEach((file, index) => {
        cancelUpload(file.md5)
        this.$Events.$emit('pause', file, index)
      })
    },
    // 开始/继续上传
    handleUploadStart (item, index) {
      this.$parent.handleUploadStart(item, index)
      this.$parent.updateStatus(this.statusMap.progress, index)
    },
    // 暂停上传
    handleUploadPause (item, index) {
      cancelUpload(item.md5)
      this.$parent.updateStatus(this.statusMap.pause, index)
      this.$Events.$emit('pause', item, index)
    }
    // 关闭上传
    // handleUploadClose (item, index) {
    //   cancelUpload(item.md5)
    //   this.$Events.$emit('delete', item, index)
    //   this.fileList.splice(index, 1)
    // }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/var.scss";
  .fade-enter-active, .fade-leave-active {
    transition: transform .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(100%);
  }

  .pc-file-list {
    color:#303133;
    position: fixed;
    box-sizing: border-box;
    padding: 5px 10px;
    z-index: 2020;
    bottom: 10px;
    right: 10px;
    box-shadow:$box-shadow;
    .pc-file-header{
      border-bottom: $border-base;
      padding: 3px 6px;
      &>div {
        @include inline-block(top);
        height: 25px;
      }
      .file-tools {
        & span,svg {
          @include inline-block(middle);
        }
      }
    }
    .pc-file-body{
      height:200px;
      overflow-y: auto;
      overflow-x: hidden;
      .pc-file-item{
        width: 100%;
        padding: 1px 0;
        color: $font-color;
        border-bottom: $border-base;
        .file-item-upload {
          width: calc(100% - 70px);
        }
      }
      .file-item-tool {
        width: 50px;
        border-left: $border-base;
        padding-left: 10px;
        line-height: 37px;
        height: 40px;
        &>svg {
          @include inline-block(middle);
        }
      }
    }
  }
  .upload-button {
    color:$primary-color;
    font-size: 14px;
    cursor: pointer;
  }
  .inline-block {
    @include inline-block(top)
  }
  .rotate {
    animation: rotating 2s linear infinite;
  }

  @keyframes rotating {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
