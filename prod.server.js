var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var port = process.env.PORT || config.build.port || 3000

var app = express()

var router = express.Router()

router.get('/', function (req, res, next) {
  14
  req.url = '/index.html'
  next()
})
app.use(router)
//异步接口

var apiRouter = express.Router()

app.use('/api', apiRouter)

apiRouter.get('/homepage', (req, res) => {
  axios.get('http://m.maoyan.com/ajax/movieOnInfoList?token=')
    .then((rs) => {
      res.json(rs.data)
    })
    .catch((err) => {
      console.log('no')
    })
})

apiRouter.get('/cinema', (req, res) => {
  axios.post('http://m.maoyan.com/ajax/movie?forceUpdate=' + (new Date()).getTime())
    .then((rs) => {
      res.json(rs.data)
    })
    .catch((err) => {
      console.log('no')
    })
})

apiRouter.get('/description', (req, res) => {
  let id = req.query.id
  axios.get('http://m.maoyan.com/ajax/detailmovie?movieId=' + id)
    .then((rs) => {
      res.json(rs.data)
    })
    .catch((err) => {
      console.log('no')
    })
})

apiRouter.get('/comment', (req, res) => {
  let id = req.query.id
  axios.get('http://m.maoyan.com/mmdb/comments/movie/'+ id +'.json?_v_=yes&offset=15&startTime=2018-08-02%2010%3A55%3A16')
    .then((rs) => {
      res.json(rs.data)
    })
    .catch((err) => {
      console.log('no')
    })
})

apiRouter.get('/details', (req, res) => {
  let id = req.query.id
  console.log(id)
  axios.get('http://m.maoyan.com/ajax/cinemaDetail?cinemaId=' + id + '&movieId=')
    .then((rs) => {
      res.json(rs.data)
    })
    .catch((err) => {
      console.log('no')
    })
})

apiRouter.get('/cinemaMovie', (req, res) => {
  let id = req.query.id
  console.log(id)
  axios.get('http://m.maoyan.com/ajax/cinemaDetail?cinemaId=' + id[0] + '&movieId=' + id[1])
    .then((rs) => {
      res.json(rs.data)
    })
    .catch((err) => {
      console.log('no')
    })
})

//定义express静态目录
app.use(express.static('./dist'))
var autoOpenBrowser = !!config.dev.autoOpenBrowser
var uri = 'http://localhost:' + port
var opn = require('opn')
//启动express
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
