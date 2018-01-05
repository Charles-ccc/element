<template>
  <div>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="food-list food-list-hook" >
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" v-for="(food, index) in item.foods" :key="index" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" width="57px">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
  <food :food="selectedFood" ref="food"></food>
  <!-- ref="food" 获取子组件 -->
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../shopCart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food'
    export default{
      data() {
        return {
          goods:[],
          listHeight:[], //存每个菜单列表的高度
          scrollY: 0,
          selectedFood:{}
        }
      },
      components:{
        shopcart,
        cartcontrol,
        food
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
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight() 
          })
        }) 
        .catch( (error) => { 
          console.log(error)
        })
      },
      computed: {
        currentIndex() {
          for(let i=0;i<this.listHeight.length;i++){
            //获取区间模块的一个范围
            let height1 = this.listHeight[i]
            let height2 = this.listHeight[i + 1]
            if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
              return i
            }
          }
          return 0
        },
        selectFoods() {
          let foods = []
          this.goods.forEach((good) => {
            good.foods.forEach((food) =>{
              if(food.count){
                foods.push(food)
              }
            })
          })
          return foods
        }
      },
      methods: {
        _initScroll() {
          if(!this.menuScroll){
            this.menuScroll = new BScroll(this.$refs.menuWrapper,{
            click: true 
            //better-scroll监听了一些touch事件，然后会阻止默认的，所以传一个click属性
            })
          }else{
            this.menuScroll.refresh()
          }
          this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
            click: true ,
            probeType: 3 //实时获取滚动的位置
          })
          this.foodsScroll.on('scroll', (pos) => { //监听scroll事件，然后将实时位置暴露
            this.scrollY = Math.abs(Math.round(pos.y)) //取整数的绝对值
          })
        },
        _calculateHeight() {
          let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
          let height = 0
          this.listHeight.push(height) //先把第一个高度push进去
          for(let i=0;i<foodList.length;i++){
            let item = foodList[i] //获得每一个foodList
            height += item.clientHeight //获得每一个区块（foodList）的高度并且累加
            this.listHeight.push(height)
          }
        },
        selectMenu(index,event) {
          //传入一个原生网页浏览器没有的事件,是BScroll中的 _constructed
          if(!event._constructed){
            return false
          }
          let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
          let el = foodList[index]
          this.foodsScroll.scrollToElement(el,300)
        },
        selectFood(food,event) {
          if(!event._constructed){
            return false
          }
          //选中的food等于传入的food
          this.selectedFood = food
          this.$refs.food.show()
        }
      }
    }
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin"
  *
    text-decoration none
    list-style none
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden //将页面默认滚动禁止掉
    .menu-wrapper
      flex 0 0 80px //等分 内容缩放 占位
      width 80px
      background-color #f3f5f7
      .menu-item
        display table //用来垂直居中
        width 56px
        height 54px
        line-height 14px
        padding 0 12px
        &.current
          position relative
          margin-top -1px
          z-index 10
          background-color #ffffff
          font-weight 700
          .text
            border-none()
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
              bg-image('special_3')
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7,17,27,0.1))
          font-size 12px
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147,153,159)
        background-color #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7,17,27)
          .desc,.extra
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
          .desc
            margin-bottom 8px
            line-height 12px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 18px
              font-size 14px
              color rgb(240,20,20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147,153,159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px  
</style>