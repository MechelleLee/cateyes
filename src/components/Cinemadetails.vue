<template>
  <div class="cinema-details" ref="cinemadetails">
    <div>
      <span class="back"><img src="../commom/icon/back.png"></span>
      <div class="header">
        <span class="title">{{cinemaDetailModel.nm}}</span>
      </div>
      <div class="message">
        <div class="area">
          <p class="name">{{cinemaDetailModel.nm}}</p>
          <p class="addr">{{cinemaDetailModel.addr}}</p>
        </div>
        <div class="tel">
          <img src="../commom/icon/tel.png">
        </div>
      </div>
      <div class="movie-list">
        <ul ref="ul">
          <li v-for="(movie, index) in getDesData.showData.movies">
            <div class="img-box" @click="setUL(index)" ref="img"
                 :style="
                 'background: url(' + movie.img.replace('/w.h', '') + ') no-repeat;' +
                  'background-size: 100% 100%;'">
            </div>
          </li>
          <div style="clear: both"></div>
        </ul>
        <span class="triangle"></span>
        <div class="movie-name" v-for="(item,index) in getDesData.showData.movies">
          <span class="name" v-if="index == nowIndex">{{item.nm}}</span>
          <span class="sc" v-if="index == nowIndex && item.sc > 0">{{item.sc}}分</span>
          <span class="sc" v-if="index == nowIndex && item.sc == 0">暂无评分</span>
        </div>
      </div>
      <div class="date-show">
        <ul :style="'width: 500px'">
          <li v-for="(item,index) in dateShow.shows" @click="highLight(index)">
            <span class="date" :class="{'highlight': light == index}">{{item.dateShow}}</span>
            <span class="border"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import IScroll from 'iscroll/build/iscroll-probe'

  export default {
    props: {
      cinemaDes: {
        type: Object
      }
    },
    data () {
      return {
        cinemaDetailModel: {},
        movieCount: {},
        cinemaMovieData: [],
        dateShow: {},
        light: '',
        screenWidth: 0,
        screenHeight: 0,
        nowIndex: 0
      }
    },
    computed: {
      ...mapGetters(['getDesData'])
    },
    created () {
      let self = this
      self.screenWidth = window.screen.width
      self.screenHeight = window.screen.height
      setTimeout(() => {
        self.cinemaDetailModel = this.getDesData.cinemaData
        self.movieCount = this.getDesData.movies
        // console.log(this.getDesData)
        this.ulStyle(this.$refs.img, this.$refs.ul)
        this.getNowData()
        this.letLight()
      }, 500)
      this.$nextTick(() => {
        setTimeout(() => {
          this.allScroll()
        }, 500)
      })
    },
    methods: {
      ...mapMutations(['UL_TRANSLATE']),
      allScroll () {
        if (!this.descScroll) {
          this.descScroll = new IScroll(this.$refs.cinemadetails, {
            click: true
          })
        } else {
          this.descScroll.refresh()
        }
      },
      ulStyle (el, ul) {
        for (let i = 0; i < el.length; i++) {
          el[i].style.width = this.screenWidth / 4 + 'px'
          el[i].style.height = this.screenHeight / 5 + 'px'
          el[i].style.marginRight = this.screenWidth * 0.04 + 'px'
        }
        el[0].style.width = this.screenWidth / 3.5 + 'px'
        el[0].style.height = this.screenHeight / 4.5 + 'px'
        el[0].style.border = '2px solid white'
        let elWidth = parseFloat(el[0].style.width)
        ul.style.transform = 'translateX(' + ((this.screenWidth - elWidth) / 2) + 'px)'
      },
      setUL (index) {
        this.UL_TRANSLATE({
          ul: this.$refs.ul,
          el: this.$refs.img,
          width: this.screenWidth,
          height: this.screenHeight,
          index
        })
        this.nowIndex = index
        this.dateShow = this.cinemaMovieData[index]
        console.log(this.dateShow)
        // console.log(this.nowIndex)
        // console.log(this.cinemaMovieData[this.nowIndex])
      },
      getNowData () {
        let cid = this.getDesData.cinemaId
        for (let i = 0; i < this.getDesData.showData.movies.length; i++) {
          let mid = this.getDesData.showData.movies[i].id
          this.$axios.get('/api/cinemaMovie', {
            params: {
              id: [cid, mid]
            }
          })
            .then((res) => {
              // console.log(res.data)
              this.cinemaMovieData = res.data.showData.movies
              this.dateShow = this.cinemaMovieData[0]
            })
            .catch((err) => {
              console.log(err)
            })
        }
      },
      letLight () {
        for (var index in this.dateShow.DateShow) {
          console.log(index)
        }
      },
      highLight (index) {
        this.light = index
      }
    }
  }
</script>

<style lang="less" scoped>
  .cinema-details {
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
    .message {
      display: flex;
      width: 100%;
      .area {
        flex: 1;
        width: 81%;
        /*background: #edc214;*/
        padding: 2%;
        .name {
          height: 24px;
          line-height: 24px;
          font-size: 15px;
        }
        .addr {
          height: 18px;
          line-height: 18px;
          font-size: 14px;
          color: #7e8c8d;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .tel {
        flex: 0 0 7%;
        /*background: gray;*/
        margin: 4% 0;
        padding: 0 4%;
        border-left: 1px solid gray;
        img {
          width: 100%;
        }
      }
    }
    .movie-list {
      position: relative;
      width: 100%;
      padding: 20px 0 0;
      background: gray;
      text-align: center;
      ul {
        width: 10000px;
        transition: all 0.2s;
        transform: translateX(0);
        li {
          float: left;
          vertical-align: bottom;
          .img-box {
            width: 100px;
            height: 250px;
          }
        }
      }
      .triangle {
        display: inline-block;
        border-top: 10px solid rgba(255, 0, 0, 0);
        border-right: 10px solid rgba(255, 255, 0, 0);
        border-bottom: 10px solid white;
        border-left: 10px solid rgba(0, 128, 0, 0);
      }
      .movie-name {
        background: white;
        text-align: left;
        .name {
          display: inline-block;
          height: 50px;
          line-height: 50px;
          font-size: 15px;
          padding-left: 15px;
        }
        .sc {
          display: inline-block;
          padding-left: 5px;
          height: 50px;
          line-height: 50px;
          font-size: 15px;
          color: orange;
        }
      }
    }
    .date-show {
      padding: 0 10px;
      line-height: 50px;
      height: 50px;
      border-bottom: 1px solid #cacaca;
      /*overflow: scroll;*/
      ul {
        li {
          float: left;
          .date {
            display: inline-block;
            padding: 0 5px;
            margin: 0 5px;
            width: auto;
            &.highlight {
              color: #e54847;
            }
          }
        }
      }
    }
  }
</style>
