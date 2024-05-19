const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
const PORT = process.env.PORT || 8081;

const readFile = (path, options) =>
  new Promise((resolve) => {
    fs.readFile(path, options, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        resolve(data)
      }
    })
  })

const writeFile = (path, data, options) =>
  new Promise((resolve) => {
    fs.writeFile(path, data, options, (err) => {
      if (err) {
        console.log(err)
      } else {
        resolve()
      }
    })
  })

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin'
  )
  next()
})

app.post('/api/add-reply', async (req, res) => {
  const body = req.body
  if (!body || !body.type || !body.reply) {
    res.status(200)
    console.log('空输入！')
    return
  }
  const json = await readReplies()
  json.replies.push(body)
  await writeFile('res/replies.json', JSON.stringify(json), 'utf8')
  res.status(200)
  const newJson = await readReplies()
  res.json(newJson)
  console.log('添加成功')
})

app.post('/api/update-reply', async (req, res) => {
  const json = await readReplies()
  const body = req.body

  const updateOne = json.replies.find((reply) => reply.id === body.id)
  if (updateOne) {
    updateOne.kudoCount = body.kudoCount
  }

  await writeFile('res/replies.json', JSON.stringify(json), 'utf8')
  res.status(200)
  const newJson = await readReplies()
  res.json(newJson)
  console.log('更新成功')
})

app.get('/api/get-replies', async (req, res) => {
  const response = await readReplies()
  res.json(response)
  res.status(200)
  console.log('获取成功')
})

app.post('/api/delete-replies',async (req, res) => {
  // { "replies": [] }
  const response = await readReplies()
  const body = req.body
  if(!body.id){
    res.status(200)
    res.json(response)
    return;
  }
  const { replies } = response
  for(let i = replies.length - 1; i >= 0; i--){
    if(replies[i].id === body.id){
      replies.splice(i, 1);
      await writeFile('res/replies.json', JSON.stringify({ replies }), 'utf8')
    }
  }
  const newJson = await readReplies()
  res.status(200)
  res.json(newJson)
  console.log('删除成功')
})

const readReplies = async () => {
  const data = await readFile('res/replies.json', 'utf8')
  const json = JSON.parse(data)
  return json
}

const server = app.listen(PORT, function () {
  const host = server.address().address
  const port = server.address().port

  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})