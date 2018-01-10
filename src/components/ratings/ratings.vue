<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @toggle="toggleContent" @select="selectRating" :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)" v-for="(rating, index) in ratings" :key="index" >
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import star from '../star/star'
import {formatDate} from '../../common/js/date'

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

    export default{
      props:{
        seller: {
          type: Object
        }
      },
      data() {
        return {
          ratings: [],
          selectType: ALL,
          onlyContent: true
        }
      },
      components: {
        star,
        split,
        ratingselect
      },
      created() {
        this.$http.get('http://localhost:8080/api/data')
        .then((res) => {
          //console.log(res.data.api_data.ratings)
          this.ratings = res.data.api_data.ratings
          this.$nextTick( () => {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.ratings, {
                  click: true
                })
            } else {
                this.scroll.refresh()
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
      },
      methods: {
        needShow(type,text){
            if(this.onlyContent && !text){
                //判断是否要显示内容，但是没有文本内容，那就不会被展示
               //否则显示所有的
                return false
            }
            if(this.selectType === ALL){
                //有文本的时候
                return true
            }else{
                return type == this.selectType
            }
        },
        addFood(target) {
            this.$emit('add',target)
        },
        selectRating(type) {
            this.selectType = type
            this.$nextTick(() => {
                this.scroll.refresh();
            })
        },
        toggleContent() {
            this.onlyContent = !this.onlyContent
            this.$nextTick(() => {
                this.scroll.refresh();
            })
        }
      },
      filters: {
        formatDate(time) {
          let date = new Date(time)
          //将formatDate提取为公共js，模块化
          return formatDate(date,'yyyy-MM-dd hh:mm')
          //通过正则表达式，对字符串进行替换
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
  .ratings
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 137px
        padding 6px 0
        width 137px
        border-right 1px solid rgba(7,17,27,0.1)
        text-align center
        @media only screen and (max-width: 320px)
          flex 0 0 120px
          width 120px
        .score
          margin-bottom 6px
          font-size 24px
          line-height 28px
          color rgb(255,153,0)
        .title
          margin-bottom 8px
          line-height 12px
          font-size 12px
          color rgb(7,17,27)
        .rank
          line-height 10px
          font-size 10px
          color rgb(147,153,159)
      .overview-right
        flex 1
        padding 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left 6px
        .score-wrapper
          margin-bottom 8px
          font-size 0
          .title
            display inline-block
            line-height 18px
            vertical-align top
            font-size 12px
            color rgb(7,17,27)
          .star
            display inline-block
            margin 0 12px
            vertical-align top
          .score
            display inline-block
            line-height 18px
            vertical-align top
            font-size 12px
            color rgb(255,153,0)
        .delivery-wrapper
          font-size 0
          .title
            line-height 18px
            font-size 12px
            color rgb(7,17,27)
          .delivery
            margin-left 12px
            font-size 12px
            color rgb(147,153,159)
    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          position relative
          flex 1
          .name
            margin-bottom 4px
            line-height 12px
            font-size 10px
            color rgb(7,17,27)
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star
              display inline-block
              margin-right 6px
              vertical-align top
            .delivery
              display inline-block
              vertical-align top
              line-height 12px
              font-size 10px
              color rgb(147,153,159)
          .text
            margin-bottom 8px
            line-height 18px
            color rgb(7,17,27)
            font-size 12px
          .recommend
            line-height 16px
            font-size 0
            .icon-thumb_up, .item
              display inline-block
              margin 0 8px 4px 0
              font-size 9px
            .icon-thumb_up
              color rgb(0,160,220)
            .item
              padding 0 6px
              border 1px solid rgba(7,17,27,0.1)
              border-radius 1px
              color rgb(147,153,159)
              background-color #ffffff
          .time
              position absolute
              top 0
              right 0
              line-height 12px
              font-size 10px
              color rgb(147 ,153,159)
</style>