import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import VueFullPage from 'vue-fullpage.js'

var firebaseConfig = {
  apiKey: "AIzaSyB-zAT4xbdFZoubcCBt2mvECj9GXtkOEu4",
  authDomain: "ericzzli.firebaseapp.com",
  databaseURL: "https://ericzzli.firebaseio.com",
  projectId: "ericzzli",
  storageBucket: "ericzzli.appspot.com",
  messagingSenderId: "178942591194",
  appId: "1:178942591194:web:3716fca0b66e3158a565e3",
  measurementId: "G-5B06RPR4W2"
};

//initialize firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

Vue.use(VueFullPage);

//scroll directive, just in case
Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
