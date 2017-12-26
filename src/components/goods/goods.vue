<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="menu-item">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script>
    export default{
      data() {
        return {
          goods:[]
        }
      },
      props:{
        seller:{
          type:Object
        }
      },
      created() {
        this.classMap = ['decrease','discount','special','invoice','guarantee']

        this.$http.get('http://localhost:8080/api/data')
        .then( (res) => {
          this.goods = res.data.api_data.goods
        }) 
        .catch( (error) => {
          console.log(error)
        })
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px //等分 内容缩放 占位
      width 80px
      background-color #f3f5f7
      .menu-item
        display table //用来垂直居中
        width 56px
        height 54px
        line-height 54px
        .icon
          display inline-block
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          vertical-align top
          &.decrease
              bg-image('decrease_3')
          &.discount
              bg-image('discount_3')
          &.guarantee
              bg-image('guarantee_3')
          &.invoice
              bg-image('invoice_3')
          &.special
              bg-image('special_1')
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7,17,27,0.1))
          font-size 12px
    .food-wrapper
      flex 1
</style>