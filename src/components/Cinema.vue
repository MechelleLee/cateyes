<template>
  <div class="cinema-list" ref="cinemalist">
    <ul>
      <li>
        <router-link to="/cinemadetails">
          <div class="cinemas" v-for="area in data" @click="sendCinemaId(area.id)">
            <span class="name">{{area.nm}}</span><span class="price">{{area.sellPrice}}元起</span>
            <p class="address">{{area.addr}}</p>
            <span class="sell" v-if="area.tag.sell">座</span><span class="imax" v-if="area.imax == '1'">IMAX厅</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  import {mapMutations} from 'vuex'

  export default {
    data () {
      return {
        data: {},
        details: {}
      }
    },
    created () {
      let self = this
      this.$axios.get('/api/cinema')
        .then((res) => {
          self.data = res.data.cinemas
        })
        .catch((err) => {
          console.log(err)
        })
      this.$nextTick(() => {
        setTimeout(() => {
          this.listScroll()
        }, 500)
      })
    },
    methods: {
      ...mapMutations(['SEND_DESDATA']),
      listScroll () {
        if (!this.cinemaScroll) {
          this.cinemaScroll = new IScroll(this.$refs.cinemalist, {
            click: true
          })
        } else {
          this.cinemaScroll.refresh()
        }
      },
      sendCinemaId (id) {
        let self = this
        this.$axios.get('/api/details', {
          params: {
            id: id
          }
        })
          .then((res) => {
            self.details = res.data
            console.log(id)
            console.log(res.data)
            this.SEND_DESDATA(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  .cinema-list {
    position: fixed;
    top: 105px;
    bottom: 0;
    padding: 0 0 4%;
    width: 100%;
    overflow: hidden;
    .cinemas {
      width: 92%;
      margin: 4%;
      border-bottom: 1px solid #e1e1e1;
      .name {
        display: inline-block;
        margin-right: 20px;
        /*background: #edc214;*/
        font-size: 16px;
        height: 20px;
        line-height: 20px;
      }
      .price {
        display: inline-block;
        font-size: 15px;
        color: #e54847;
      }
      .address {
        font-size: 15px;
        margin: 15px 0 10px;
        color: #7e7e7e;
      }
      .sell, .imax {
        display: inline-block;
        margin: 0 5px 15px 0;
        padding: 3px;
        font-size: 12px;
        color: #589daf;
        border: 1px solid #589daf;
        border-radius: 5px;
      }
    }
  }
</style>
