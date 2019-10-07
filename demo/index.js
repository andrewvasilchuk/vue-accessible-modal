import Vue from 'vue'
import App from './App.vue'
import VueAccessibleModal from '../src'
import ConfirmComponent from './components/ConfirmComponent.vue'

Vue.config.productionTip = false

Vue.use(VueAccessibleModal, { confirmComponent: ConfirmComponent })

new Vue({
  el: '#app',
  render: h => h(App),
})
