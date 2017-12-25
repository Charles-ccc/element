<template lang="html">
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :key="index" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
export default {
  props:{
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size
    }
  }
}
</script>

<style lang="stylus">
    .star
        font-size 0
        .star-item
        display inline-block
        background-repeat no-repeat
        &.star-48
            .star-item
                width 20px
                height 20px
                margin-right 22px
                background-size 20px 20px
        &.star-36
        &.star-24
</style>
