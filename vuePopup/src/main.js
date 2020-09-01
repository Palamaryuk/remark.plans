import Vue from 'vue'
import App from './App.vue'
import 'modern-css-reset/dist/reset.min.css'
import {store} from './store'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
