// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'      // 引用vue-router库 叫做VueRouter
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'

Vue.use(VueRouter)      // 在vue中使用VueRouter库

Vue.config.productionTip = false

const routes = [      // 定义一个数组 这个时候你还没用到router上面的时候
                      // 它只是一个普通的数组而已
  {
    path: '/',
    name: 'goods',
    component: goods
  },
  {
    path: '/',
    name: 'ratings',
    component: ratings
  },
  {
    path: '/',
    name: 'seller',
    component: seller
  }
]
const route = new VueRouter({     // 实例化一个VueRouter 同时它代表了刚刚那个数组
  routes                          // 实例化出来的这个玩意的名字 你把它叫做route
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  route,             // 所以你要用你定义的路由数组的时候 应该写route  如果你写的是abc 那在这就写abc
  template: '<App/>',
  components: { App }
})

