import Vue from 'vue'
import App from './App.vue'
import uploadConfig from './interfaces/uploadConfig'
import './assets/iconfont/iconfont'
import statusMap from './statusMap'
import Events from './util/Events'
import { validateConfig } from './util/validate'

export class Uploader {
  private $Events: Events;
  constructor(config: uploadConfig) {
    this.$Events = new Events()
    const target = document.createElement('div')
    config.el.style.position = 'relative'
    config.el.appendChild(target)
    new Vue({
      el: target,
      render: h => h(App),
      // 使用provide&inject向APP组件内传递外部参数
      provide: {
        config: validateConfig(config),
        statusMap,
        $Events:this.$Events
      }
    })
  }
  // 内部使用EventBus方式对外进行事件数据传输
  $on (key: string, callback: Function) {
    this.$Events.$on(key, callback)
  }
}
