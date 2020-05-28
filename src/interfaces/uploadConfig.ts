interface uploadConfig {
  env: string,
  el:HTMLElement,
  accept: string,
  multiple: boolean,
  headers?: any,
  limit: number,
  chunkSize: number
  path?: string,
  getDetail: boolean
}
export default uploadConfig
