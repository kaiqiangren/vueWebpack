import SparkMD5 from 'spark-md5'

/**
 * 获取文件的md5唯一值，以确认文件上传的是同一个
 * @param file
 */
export function getFileMd5 (file: File | Blob) {
  return new Promise((resolve, reject) => {
    let chunkSize = 1024 * 1024 * 2
    let chunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 0
    let spark = new SparkMD5.ArrayBuffer()
    let fileReader = new FileReader()
    function loadNext () {
      let start = currentChunk * chunkSize
      let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
      fileReader.readAsArrayBuffer(blobSlice(file, start, end))
    }
    loadNext()
    fileReader.onload = (e: Event | any) => {
      if (e.target) {
        spark.append(e.target.result)
      }
      currentChunk++
      if (currentChunk < chunks) {
        loadNext()
      } else {
        resolve(spark.end())
      }
    }
    fileReader.onerror = () => {
      reject()
    }
  })
}

export function blobSlice (blob: Blob, startByte: number, endByte: number) {
  if (blob.slice) {
    return blob.slice(startByte, endByte)
  }
  return blob
}
