<template>
  <transition name="slide">
    <div class="desc-content" v-if="des.detailMovie && show" ref="desccontent">
      <div>
        <span class="back" @click="back"><img src="../commom/icon/back.png"></span>
        <div class="header">
          <span class="title">{{des.detailMovie.nm}}</span>
        </div>
        <div class="movie-detail">
          <div class="bg"><img :src="des.detailMovie.img.replace('/w.h', '')"></div>
          <div class="img-box">
            <img :src="des.detailMovie.img.replace('/w.h', '')">
          </div>
          <div class="movie-des">
            <span class="name">{{des.detailMovie.nm}}</span>
            <span class="sc" ref="sc">
          <span class="img" v-for="star in sendStar" v-if="des.detailMovie.sc != 0"
                :class="{on: star == 'on',half: star == 'half',off: star == 'off'}"></span>
          <span class="sc-num" v-if="des.detailMovie.sc != 0">{{des.detailMovie.sc}}</span>
          <span class="wish" v-if="des.detailMovie.sc == 0">{{des.detailMovie.wish}}人想看</span>
        </span>
            <span class="snum">({{des.detailMovie.snum}}人评分)</span>
            <span class="cat">{{des.detailMovie.cat}}</span>
            <div class="ver" v-if="des.detailMovie.ver.match(/3D\/IMAX/)">
              <span class="three">3D</span><span class="imax">IMAX</span>
            </div>
            <div class="ver" v-if="des.detailMovie.ver.match(/3D/) && !des.detailMovie.ver.match(/3D\/IMAX/)">
              <span class="just-three">3D</span>
            </div>
            <span class="time">{{des.detailMovie.src}}/{{des.detailMovie.dur}}分钟</span>
            <span class="rt">{{des.detailMovie.rt}}</span>
          </div>
        </div>
        <div class="summary">
          <div class="ticket">
            <span class="buy">立即购票</span>
          </div>
          <div class="dra-box" ref="drabox">
            <div v-html="des.detailMovie.dra" class="dra"></div>
          </div>
          <div class="down" @click="view">
            <img class="icon" src="../commom/icon/down.png">
          </div>
          <div class="space"></div>
          <div class="tips">
            <span class="title">观影小贴士</span>
            <span class="content">有2个彩蛋，在黑白字幕前面和后面</span>
            <div class="egg">
              <img src="../commom/icon/coloregg.png">
            </div>
          </div>
          <div class="space"></div>
        </div>
        <div class="ratings">
          <div class="head">短评</div>
          <div class="rat-list">
            <ul>
              <li v-for="(item,index) in hcmts" v-if="index < 3">
                <p class="stars">
                <span class="star" v-for="star in sendRatStar[index]"
                      :class="{'on':star === 'on',half:star==='half',off:star ==='off'}"></span><span
                  class="date">{{item.time}}</span>
                </p>
                <p class="content">{{item.content}}</p>
                <div class="avatar">
                  <img class="icon" :src="item.avatarurl">
                  <span class="name">{{item.nickName}}</span>
                  <div class="good">
                    <img class="fabulous" src="../commom/icon/Fabulous1.png">
                    <span class="approve">{{item.approve}}</span>
                    <img class="reply" src="../commom/icon/reply.png">
                    <span class="replys">{{item.reply}}</span>
                  </div>
                </div>
              </li>
              <div class="allRatings">
                <a class="a" href="http://m.maoyan.com/movie/249894/comments?_v_=yes">查看全部{{detailMovie.total}}条短评</a>
              </div>
            </ul>
          </div>
        </div>
        <div class="bottom">
          <div class="download">
            <span class="buy">下载猫眼电影，查看更多电影信息</span>
          </div>
          <div class="menu">
            <span class="film">电影<span class="border"></span></span>
            <span class="cinema">影院<span class="border"></span></span>
            <span class="mine">我的<span class="border"></span></span>
            <span class="apk">客户端下载</span>
          </div>
          <div class="log">
            <span class="login">登录</span>
            <span class="register">注册</span>
          </div>
          <div class="foot">
            <p class="link">友情链接: <a href="http://piaofang.maoyan.com/dashboard">猫眼专业版</a><a
              href="http://i.meituan.com/?utm_source=mmaoyan">美团网</a></p>
            <p class="tel">© 猫眼电影 客服电话: <span class="num">1010-5335</span></p>
            <p class="unknown"><a href="http://www.beian.gov.cn/portal/index">京ICP备16022486号-1 京公网安备11010502030881号</a>
            </p>
            <p class="name">北京猫眼文化传媒有限公司</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import IScroll from 'iscroll/build/iscroll-probe'

  export default {
    props: {
      des: {
        type: Object
      }
    },
    data () {
      return {
        detailMovie: {},
        viewNum: 1,
        show: true,
        hcmts: {}
      }
    },
    created () {
      setTimeout(() => {
        console.log(this.des.detailMovie)
        let self = this
        this.$axios.get('/api/comment', {
          params: {
            id: this.des.detailMovie.id
          }
        })
          .then((res) => {
            self.hcmts = res.data.hcmts
            this.ratStar()
          })
          .catch((err) => {
            console.log(err)
          })
        this.getStar(this.$refs.sc)
        this.detailMovie = this.des.detailMovie
      }, 500)
      this.$nextTick(() => {
        setTimeout(() => {
          if (!this.descScroll) {
            this.descScroll = new IScroll(this.$refs.desccontent, {
              click: true
            })
          } else {
            this.descScroll.refresh()
          }
        }, 1000)
      })
    },
    computed: {
      ...mapGetters(['sendStar', 'sendRatStar'])
    },
    methods: {
      ...mapMutations(['SEND_SC', 'SEND_RATSTAR']),
      getStar (el) {
        let des = this.des
        this.SEND_SC({el, des})
      },
      ratStar () {
        this.SEND_RATSTAR(this.hcmts)
      },
      view () {
        let draBox = this.$refs.drabox
        this.viewNum++
        if (this.viewNum % 2 === 0) {
          draBox.style.height = 'auto'
        }
        if (this.viewNum % 2 === 1) {
          draBox.style.height = 54 + 'px'
        }
        this.descScroll.refresh()
      },
      back () {
        this.$router.push({path: '/Movies'})
        this.show = !this.show
      }
    }
  }
</script>

<style lang="less" scoped>
  .slide-enter-active, .slide-leave-active {
    transition: all .5s
  }
  .slide-enter, .slide-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(100%);
  }

  .desc-content {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: white;
    overflow: hidden;
    .back {
      position: absolute;
      height: 55px;
      width: 55px;
      img {
        margin: 10% 0;
        width: 80%;
      }
    }
    .header {
      width: 100%;
      height: 55px;
      background: #e54847;
      border-bottom: 1px solid white;
      text-align: center;
      .title {
        display: inline-block;
        width: 70%;
        height: 55px;
        line-height: 55px;
        text-align: center;
        font-size: 20px;
        color: white;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .movie-detail {
      display: flex;
      .bg {
        position: absolute;
        z-index: -1;
        width: 100%;
        overflow: hidden;
        img {
          width: 100%;
          filter: blur(50px);
        }
      }
      .img-box {
        flex: 0 0 40%;
        /*background: #cccccc;*/
        img {
          margin: 10%;
          width: 80%;
          border: 1px solid white;
        }
      }
      .movie-des {
        flex: 1;
        padding: 3% 0;
        /*background: #404040;*/
        .name, .sc, .snum, .time, .rt {
          margin-top: 10px;
          display: block;
        }
        .name {
          font-size: 18px;
          color: white;
        }
        .sc {
          .sc-num {
            position: absolute;
            margin-left: 5px;
            display: inline-block;
            color: #ffc600;
            height: 24px;
            line-height: 24px;
          }
          .img {
            display: inline-block;
            &.on {
              width: 20px;
              height: 20px;
              background-size: 18px 18px;
              background: url("../commom/icon/star_on.png") no-repeat;
              background-position: -5px -5px;
              overflow: hidden;
            }
            &.half {
              width: 20px;
              height: 20px;
              background-size: 18px 18px;
              background: url("../commom/icon/star_half.png") no-repeat;
              background-position: -5px -5px;
              overflow: hidden;
            }
            &.off {
              width: 20px;
              height: 20px;
              background-size: 18px 18px;
              background: url("../commom/icon/star_off.png") no-repeat;
              background-position: -5px -5px;
              overflow: hidden;
            }
          }
          .wish {
            display: inline-block;
            color: #ffc600;
            height: 24px;
            line-height: 24px;
          }
        }
        .snum, .cat, .time, .rt {
          font-size: 12px;
          color: #c9cbc8;
        }
        .cat {
          margin-top: 10px;
          display: inline-block;
        }
        .ver {
          /*position: absolute;*/
          display: inline-block;
          padding-left: 5px;
          .three, .imax, .just-three {
            display: inline-block;
            font-size: 0.5em;
          }
          .three {
            background: #c9cbc8;
            height: 14px;
            line-height: 14px;
            color: white;
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
          }
          .imax {
            height: 12px;
            line-height: 12px;
            color: white;
            border: 1px solid #c9cbc8;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
          }
          .just-three {
            background: #c9cbc8;
            height: 14px;
            line-height: 14px;
            color: white;
            border-radius: 2px;
          }
        }
      }
    }
    .summary {
      width: 100%;
      background: white;
      .ticket {
        width: 100%;
        .buy {
          margin: 4%;
          display: inline-block;
          width: 92%;
          border-radius: 5px;
          font-size: 18px;
          height: 40px;
          line-height: 40px;
          color: white;
          text-align: center;
          background: #e54847;
        }
      }
      .dra-box {
        width: 100%;
        height: 54px;
        overflow: hidden;
        .dra {
          margin: 0 4%;
          display: inline-block;
          width: 92%;
          line-height: 18px;
          /*background: #edc214;*/
        }
      }
      .down {
        width: 100%;
        height: 20px;
        text-align: center;
        border-bottom: 1px solid #dadada;
        .icon {
          height: 20px;
          margin: auto;
        }
      }
      .tips {
        width: 100%;
        position: relative;
        .title {
          display: inline-block;
          padding: 4%;
          width: 92%;
          border-top: 1px solid #dadada;
          /*background: #a8bd38;*/
        }
        .content {
          display: inline-block;
          padding: 4% 10%;
          width: 92%;
          font-size: 14px;
          border-bottom: 1px solid #dadada;
          border-top: 1px solid #dadada;
        }
        .egg {
          position: absolute;
          height: 50%;
          bottom: 0;
          img {
            height: 50%;
            padding: 25%;
          }
        }
      }
    }
    .ratings {
      width: 100%;
      background: white;
      .head {
        padding: 4%;
        font-weight: 600;
        color: #2e2e2e;
        background: white;
        border-top: 1px solid #dadada;
        border-bottom: 1px solid #dadada;
      }
      .rat-list {
        width: 92%;
        margin: 0 4%;
        li {
          border-bottom: 1px solid #dadada;
          .stars {
            padding: 10px 0;
            .star {
              display: inline-block;
              width: 20px;
              height: 20px;
              &.on {
                background: url("../commom/icon/star_on.png") no-repeat;
                background-position: -5px;
              }
              &.half {
                background: url("../commom/icon/star_half.png") no-repeat;
                background-position: -5px;
              }
              &.off {
                background: url("../commom/icon/star_off.png") no-repeat;
                background-position: -5px;
              }
            }
            .date {
              position: absolute;
              display: inline-block;
              margin-left: 10px;
              height: 22px;
              line-height: 22px;
              font-size: 14px;
              color: #a8a8a8;
            }
          }
          .content {
            padding-bottom: 10px;
            font-size: 15px;
            line-height: 20px;
          }
          .avatar {
            width: 100%;
            margin-bottom: 10px;
            .icon {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: top;
            }
            .name {
              display: inline-block;
              margin-left: 10px;
              height: 30px;
              line-height: 30px;
              font-size: 14px;
              color: #898989;
            }
            .good {
              display: inline-block;
              height: 30px;
              float: right;
              .fabulous {
                width: 16px;
                height: 16px;
                margin: 7px;
                vertical-align: top;
              }
              .approve {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                color: #3f3f3f;
              }
              .reply {
                width: 16px;
                height: 16px;
                margin: 7px;
                vertical-align: top;
              }
              .replys {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                color: #3f3f3f;
              }
            }
          }
        }
        .allRatings {
          width: 100%;
          height: 45px;
          /*background: #a8bd38;*/
          .a {
            display: inline-block;
            width: 100%;
            height: 100%;
            line-height: 45px;
            text-align: center;
            color: #e54847;
          }
        }
      }
    }
    .bottom {
      width: 100%;
      background: #f4f4f4;
      .download {
        width: 100%;
        .buy {
          margin: 4%;
          display: inline-block;
          width: 92%;
          border-radius: 5px;
          height: 40px;
          line-height: 40px;
          color: white;
          text-align: center;
          background: #e54847;
        }
      }
      .menu {
        display: flex;
        width: 86%;
        margin: 0 7%;
        .film, .cinema, .mine, .apk {
          display: inline-block;
          height: 16px;
          line-height: 16px;
          /*background: #2e2e2e;*/
          text-align: center;
          font-size: 13px;
          color: #2c2c2c;
        }
        .film, .cinema, .mine {
          flex: 1;
          position: relative;
          .border {
            position: absolute;
            right: 0;
            display: inline-block;
            height: 100%;
            border-left: 1px solid #9a9a9a;
          }
        }
        .apk {
          flex: 2;
        }
      }
      .log {
        width: 92%;
        margin: 4%;
        .login, .register {
          display: inline-block;
          margin: 0 3%;
          padding: 8px 20px;
          font-size: 13px;
          border-radius: 5px;
        }
        .login {
          background: #75c60d;
          color: white;
        }
        .register {
          background: white;
        }
      }
      .foot {
        margin-top: 50px;
        width: 100%;
        p {
          margin-bottom: 20px;
        }
        .link {
          height: 100%;
          font-size: 14px;
          /*background: #ffbc1b;*/
          text-align: center;
          a {
            padding: 0 5px;
            color: #e54847;
          }
        }
        .tel {
          height: 100%;
          font-size: 14px;
          /*background: #ffbc1b;*/
          text-align: center;
          .num {
            color: #e54847;
            text-decoration: underline;
          }
        }
        .unknown {
          height: 100%;
          font-size: 13px;
          /*background: #ffbc1b;*/
          text-align: center;
        }
        .name {
          height: 100%;
          font-size: 13px;
          padding-bottom: 20px;
          text-align: center;
          color: #7e8c8d;
        }
      }
    }
    .space {
      width: 100%;
      height: 10px;
      background: #f4f4f4;
    }
  }
</style>
