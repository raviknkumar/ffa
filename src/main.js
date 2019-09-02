import Vue from 'vue'
import App from './App.vue'

import router from "../src/router/index"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import 'vuetify/dist/vuetify.min.css'

import bootStrapVue from 'bootstrap-vue'
import sweetAlert from 'vue-sweetalert2'

Vue.use(bootStrapVue);
Vue.use(sweetAlert);

Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

