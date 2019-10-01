import Vue from 'vue'
import App from './App.vue'

import router from "../src/router/index"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import 'vuetify/dist/vuetify.min.css'
import {BBadge, BButton, BTable, BRow, BCol, BContainer, BModal, BPagination, BSpinner, BAlert} from 'bootstrap-vue'

Vue.component('b-badge', BBadge)
Vue.component('b-button', BButton)
Vue.component('b-pagination', BPagination)
Vue.component('b-table', BTable)
Vue.component('b-row', BRow)
Vue.component('b-col', BCol)
Vue.component('b-container', BContainer)
Vue.component('b-modal', BModal);

Vue.component('b-modal', BModal);
Vue.component('b-spinner', BSpinner);
Vue.component('b-alert', BAlert);


import sweetAlert from 'vue-sweetalert2'

Vue.use(sweetAlert);

import 'ant-design-vue/dist/antd.css';
import {Select, Input, Icon, Row, Col} from 'ant-design-vue';

Vue.use(ElementUI, {locale})
Vue.config.productionTip = false
Vue.use(Select)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)

import store from './vuexStore'
import './permission'

new Vue({
    router,
    render: h => h(App),
    store
}).$mount('#app')

