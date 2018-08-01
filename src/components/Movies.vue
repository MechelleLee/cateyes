<template>
  <div class="movie-list" ref="movielist">
    <!--<router-view></router-view>-->
    <ul>
      <li v-if="flag" v-for="movie in data" @click="getMovieId(movie.id)">
        <router-link to="/description" class="movie-box">
          <div class="img">
            <img :src="movie.img.replace('/w.h', '')">
          </div>

          <div class="movie-title">
            <p class="title">{{movie.nm}}</p>
            <div class="ver" v-if="movie.version.match(/v3d imax/)">
              <span class="three">3D</span><span class="imax">IMAX</span>
            </div>
            <div class="ver" v-if="movie.version.match(/v3d/)">
              <span class="just-three">3D</span>
            </div>
            <div class="ver" v-if="movie.version.match(/v2d imax/)">
              <span class="just-imax">IMAX</span>
            </div>
            <p class="cat">{{movie.cat}}</p>
            <p class="star">主演:{{movie.star}}</p>
            <p class="showinfo">{{movie.showInfo}}</p>
          </div>

          <div class="rating">
            <p class="sc" v-if="movie.sc != 0">{{movie.sc}}<span class="fen">分</span></p>
            <p class="sc" v-if="movie.sc == 0 && movie.wish != 0">{{movie.wish}} <span class="fen">人想看</span></p>
            <p class="none" v-if="movie.sc == 0 && movie.wish == 0">暂无评分</p>
            <span class="shop" v-if="movie.sc != 0">购票</span>
            <span class="order" v-if="movie.sc == 0">预售</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import IScroll from 'iscroll/build/iscroll-probe'

  export default {
    data () {
      return {
        data: {},
        flag: false,
        des: {}
      }
    },
    created () {
      let self = this
      this.$axios.get('/api/homepage')
        .then((res) => {
          self.data = res.data.movieList
        })
        .catch((err) => {
          console.log(err)
        })
      this.flag = true
      this.$nextTick(() => {
        setTimeout(() => {
          this.movieScroll()
        }, 500)
      })
    },
    methods: {
      ...mapMutations(['SEND_DATA']),
      movieScroll () {
        if (!this.movielist) {
          this.movielist = new IScroll(this.$refs.movielist, {
            click: true
          })
        } else {
          this.movielist.refresh()
        }
      },
      getMovieId (id) {
        let self = this
        this.$axios.get('/api/description', {
          params: {
            id: id
          }
        }).then((res) => {
          self.des = res.data
          this.SEND_DATA(self.des)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .movie-list {
    position: absolute;
    top: 105px;
    bottom: 0;
    width: 92%;
    margin: 0 4%;
    overflow: hidden;
    .movie-box {
      position: relative;
      width: 100%;
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid #d2d2d2;
      .img, .movie-title, .rating {
        display: inline-block;
      }
      .img {
        flex: 0 0 20%;
        /*width: 20%;*/
        img {
          width: 100%;
        }
      }
      .movie-title {
        flex: 1;
        margin-left: 3%;
        padding: 10px 0;
        width: 57%;
        /*background: deepskyblue;*/
        .title, .cat, .star {
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .title {
          max-width: 98%;
          display: inline-block;
          height: 18px;
          line-height: 18px;
          font-size: 15px;
          color: #1d1d1d;
        }
        .ver {
          position: absolute;
          display: inline-block;
          padding-left: 5px;
          .three, .imax, .just-three, .just-imax {
            display: inline-block;
            font-size: 0.5em;
          }
          .three {
            padding: 0 3px;
            background: #8bb7ce;
            height: 18px;
            line-height: 18px;
            color: white;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
          }
          .imax {
            padding: 0 2px;
            height: 16px;
            line-height: 16px;
            color: #8bb7ce;
            border: 1px solid #8bb7ce;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          .just-three {
            padding: 0 3px;
            background: #8bb7ce;
            height: 18px;
            line-height: 18px;
            color: white;
            border-radius: 5px;
          }
          .just-imax {
            padding: 0 2px;
            height: 16px;
            line-height: 16px;
            color: #8bb7ce;
            border: 1px solid #8bb7ce;
            border-radius: 5px;
          }
        }
        .cat, .star, .showinfo {
          font-size: 14px;
        }
        .cat, .star {
          color: #707070;
        }
        .showinfo {
          color: #acacac;
        }
      }
      .rating {
        flex: 0 0 17%;
        margin-left: 3%;
        padding-top: 10px;
        width: 17%;
        height: 68%;
        .sc {
          position: relative;
          right: 100%;
          margin-bottom: 68%;
          width: 200%;
          text-align: right;
          font-size: 14px;
          color: #ffbc1b;
          .fen {
            font-size: 12px;
          }
        }
        .none {
          position: relative;
          right: 100%;
          margin-bottom: 68%;
          width: 200%;
          text-align: right;
          font-size: 14px;
          color: #cccccc;
        }
        .shop {
          display: inline-block;
          width: 94%;
          margin: 0 3%;
          border-radius: 5px;
          text-align: center;
          height: 28px;
          line-height: 28px;
          font-size: 14px;
          color: white;
          background: #e54847;
        }
        .order {
          display: inline-block;
          width: 94%;
          margin: 0 3%;
          border-radius: 5px;
          text-align: center;
          height: 28px;
          line-height: 28px;
          font-size: 14px;
          color: white;
          background: #52b0eb;
        }
      }
    }
  }
</style>
