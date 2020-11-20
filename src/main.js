import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFullPage from 'vue-fullpage.js'
import VCalendar from 'v-calendar';

Vue.config.productionTip = false

Vue.use(VueFullPage);
Vue.use(VCalendar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
