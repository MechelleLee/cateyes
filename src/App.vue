<template>
  <div id="app">
    <div class="header">
      <span class="title">猫眼电影</span>
    </div>
    <div class="classify">
      <div class="movies" @click="borderTranslate(1)">
        <router-link to="/movies">影片</router-link>
      </div>
      <div class="cinema" @click="borderTranslate(2)">
        <router-link to="/cinema">影院</router-link>
      </div>
    </div>
    <div class="border" ref="border"></div>
    <div class="space"></div>
    <router-view :des="this.getData"></router-view>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'app',
    data () {
      return {
        des: {}
      }
    },
    computed: {
      ...mapGetters(['getData'])
    },
    methods: {
      borderTranslate (num) {
        if (num === 1) {
          this.$refs.border.style.left = 0
        }
        if (num === 2) {
          this.$refs.border.style.left = 50 + '%'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  #app {
    font-family: "Microsoft YaHei UI Light";
    .header {
      position: relative;
      width: 100%;
      height: 55px;
      background: #e54847;
      .title {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        display: inline-block;
        padding: 0 20px;
        width: 100px;
        height: 55px;
        line-height: 55px;
        font-size: 24px;
        color: white;
      }
    }
    .classify {
      height: 40px;
      display: flex;
      .movies, .cinema {
        flex: 1;
        margin: 0 2%;
        width: 46%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        .active {
          color: #e54847;
        }
      }
    }
    .border {
      position: relative;
      top: 5px;
      left: 0;
      margin: 0 2%;
      width: 46%;
      border-bottom: 5px solid #e54847;
      transition: all 0.5s;
    }
    .space {
      height: 5px;
      width: 100%;
      background: #e2ded5;
    }
  }
</style>
