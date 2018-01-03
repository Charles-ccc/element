<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart(event) {
            //pc点击会进下面这个函数，但是被return掉
            if(!event._constructed){
                return
            }
            if(!this.food.count) {
                //this.food.count =1
                Vue.set(this.food, 'count',1)
            }else{
                this.food.count ++
            }
            //vuejs特性，给观测对象添加一个不存在的字段，不可以直接赋值，检测不到变化，需要vue的一个接口 set
        },
        decreaseCart(event) {
            if(!event._constructed){
                return
            }
            if(this.food.count){
                this.food.count --
            }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
    font-size: 0
    .cart-decrease
        display: inline-block
        padding: 6px //增加点击区域
        opacity: 1
        transform: translate3d(0, 0, 0)
        .inner
            display: inline-block
            line-height: 24px
            font-size: 24px
            color: rgb(0, 160, 220)
            transition: all 0.4s linear
            transform: rotate(0)
        &.move-enter-active, &.move-leave-active
            transition: all 0.4s linear
        &.move-enter, &.move-leave-active
            opacity: 0
            transform: translate3d(24px, 0, 0)
            .inner
                transform: rotate(180deg)
    .cart-count
        display: inline-block
        vertical-align: top
        width: 12px
        padding-top: 6px
        line-height: 24px
        text-align: center
        font-size: 10px
        color: rgb(147, 153, 159)
    .cart-add
        display: inline-block
        padding: 6px
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
</style>