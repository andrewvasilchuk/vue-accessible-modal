import Vue from 'vue'
import App from './App.vue'
import VueAccessibleModal from '../src'

Vue.config.productionTip = false

Vue.use(VueAccessibleModal, {
  transition: 'fade',
})

new Vue({
  el: '#app',
  render: h => h(App),
})
