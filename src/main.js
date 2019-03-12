import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import lodash from 'lodash'

Vue.config.productionTip = false

Vue.prototype._ = lodash

// AUTORIZACION
axios.defaults.headers.common['Authorization'] = 'Bearer f586f136b5af4a7292ab11148b160666';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
