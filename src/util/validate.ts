import uploadConfig from '../interfaces/uploadConfig'

export const validateConfig = (config: uploadConfig): uploadConfig => {
  config.env = config.env || 'pc'
  // 可上传文件类型
  config.accept = config.accept || '*'
  // 是否可多选
  config.multiple = config.multiple || false
  // 最大上传数量
  config.limit = config.limit || 3
  // 上传分片大小
  config.chunkSize = config.chunkSize || 1024 * 1024 *5
  // 是否获取文件详情
  config.getDetail = config.getDetail || false
  // 上传服务地址 (暂时用不到)
  config.path = config.path || '/backend/storage/upload/prepare'
  // 上传过程携带请求头(暂时用不到)
  config.headers = config.headers || null
  return config
}
