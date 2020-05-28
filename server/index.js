const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  // intercept OPTIONS method
  if (req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})


// 预上传
app.post('/backend/storage/upload/prepare', function (req, res) {
  const params = req.body
  const chunks = parseInt(params.chunks)
  const chunkTokens =[]
  for (let i =0; i < chunks; i++) {
    let obj = {
      url:'/backend/storage/upload/chunk',
      chunkNo:i,
      method:'POST',
      params: {
        appKey:'',
        expires:'',
        contextId:i,
        token:''
      }
    }
    chunkTokens.push(obj)
  }
  res.send({
    success:true,
    data:{
      code:102,
      chunkTokens:chunkTokens,
      completeToken:{
        url:'/backend/storage/upload/complete',
        method:'POST',
        params:{
          md5:'',
          filename:'',
          expires:'',
          appKey:'',
          token:'',
          contextId:''
        }
      },
      downloadUrl:'',
      detailToken:{
        url:'/backend/storage/upload/getDetail',
        method:'POST',
        params:{
          appKey:'',
          token:'',
          expires:''
        }
      },
      message:'请求成功'
    }
  })
})
// 合并成功
app.post('/backend/storage/upload/complete', function (req, res) {
  res.send({
    success:true,
    message:'合并成功!'
  })
})
// 分支上传
app.post('/backend/storage/upload/chunk', function (req, res) {
  const params = req.body
  res.send({
    success:true,
    contextId:params.contextId,
    message:'分支上传成功!'
  })
})
// app.use(express.static(path.resolve(__dirname, 'static')))
// 获取文件详情
app.get('/backend/storage/upload/getDetail', function (req, res) {
  res.send({
    filename:'文件详情.jpg',
    message:'文件详情获取成功!'
  })
})


app.listen(8000, function () {
  console.log('serve listen on port 8000')
})
