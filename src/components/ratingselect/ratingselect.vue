<template>
  <div class="ratingselect">
      <div class="rating-type border-1px">
          <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">55</span></span>
          <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">40</span></span>
          <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">6</span></span>
      </div>
      <div class="switch border-1px" :class="{'on':onlyContent}">
          <span class="icon-check_circle"></span>
          <span class="text">只看有内容的评价</span>
      </div>
  </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  props: {
      ratings: {
          type: Array,
          default() {
              return []
          }
      },
      selectType: {
          type: Number,
          default: ALL
      },
      onlyContent: {
          type: Boolean,
          default: false
      },
      desc: {
          typr: Object,
          default() {
              return {
                  all: '全部',
                  positive: '满意',
                  negative: '不满意'
              }
          }
      }
  },
  methods: {
      select(type,event){
          if(!event._constructed){
              return
          }
          this.selectType = type
      }
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin" 
    .ratingselect
        .rating-type
            padding 18px 0
            margin 0 18px
            border-1px (rgba(7,17,27,0.1))
            font-size 0
            .block
                display inline-block
                padding 8px 12px
                line-height 16px
                margin-right 8px
                border-radius 2px
                font-size 12px
                color rgb(77,85,93)
                &.active
                    color #ffffff
                .count
                    margin-left 2px
                    font-size 8px
                &.positive
                    background-color rgba(0,160,220,0.2)
                    &.active
                        background-color rgb(0,160,220)
                &.negative
                    background-color rgba(77,85,93,0.2)
                    &.active
                        background-color rgb(77,85,93)
        .switch
            padding 12px 18px
            line-height 24px
            font-size 0
            color rgb(147,153,159)
            border-1px (rgba(7,17,27,0.1))
            &.on
                .icon-check_circle
                    color #00c850
            .icon-check_circle
                display inline-block
                vertical-align top
                margin-right 4px
                font-size 24px
            .text
                font-size 12px
                vertical-align top
</style>
