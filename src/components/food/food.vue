<template>
    <transition name="move">
        <div v-show="showFlag" class="food">
            <div class="food-content">
            <div class="image-header"></div>
        </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false
        }
    },
    methods: {
        show() {
            this.showFlag = true
        }
    }
}
</script>

<style lang="stylus">
    .food
        position fixed
        top 0
        left 0
        bottom 48px
        z-index 30
        width 100%
        background-color #ffffff
        transform translate3d(0,0,0)
        &.move-enter-active, &.move-leave-active
            transition all 0.2s linear
        &.move-enter, &.move-leave-active
            transform translate3d(100%,0,0)
</style>
