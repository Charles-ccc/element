<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item ">
        <router-link to="/goods">
          商品
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">
          评论
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">
          商家
        </router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header'
import axios from 'axios'
import{urlParse} from '../src/common/js/until' 
export default {
  data() {
    return {
      seller: {
        //立即执行函数，id从url的参数拿到
        id: (()=>{
          let queryParam = urlParse()
          //console.log(queryParam)
          return queryParam.id
        })()
      }
    }
  },
  components:{
    "v-header" :header
  },
  created() {
    const url = 'http://localhost:8080/api/data'
    this.$http.get(url + '?id=' + this.seller.id)
    .then( (res) => {
      //this.seller = res.data.api_data.seller
      //console.log(res.data.api_data)
      //console.log(this.seller)
      this.seller = Object.assign({}, this.seller, res.data.api_data.seller)
      //console.log(this.seller)
    })
    .catch( (error) => {
      console.log(error)
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin"
  *
    margin: 0px
    padding: 0px
  #app
    .tab
      display:flex
      width: 100%
      height: 40px
      line-height: 40px
      .tab-item
        flex:1
        text-align:center
        border-1px(rgba(7, 17, 27, 0.1))
        & > a
          display: block
          text-decoration: none
          font-size: 14px
          color: rgb(77,85,93)
          &.active
            color: rgb(240,20,20)
</style>
