import Vue from 'vue'
import App from './App.vue'
import { store} from  './store/store'
import VueRouter from 'vue-router'
import {routes}  from './router/index.js'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.use(vuetify)
Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes,store
})

new Vue({
  router,store,vuetify,
  render: h => h(App),
}).$mount('#app')
