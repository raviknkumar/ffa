import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

const store = new Vuex.Store({

    plugins:[createPersistedState({
        storage: {
            getItem: key => Cookies.get(key),
            setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
            removeItem: key => Cookies.remove(key)
        }
    })],

    state:{
        shop:null
    },

    getters:{
        getShop : state => {
            var shop = state.shop;
            if (!shop) {
                shop =  Cookies.getJSON('shop')
            }
            return shop;
        }
    },

    mutations:{
        storeShop: (state, shop) => {
            Cookies.set('shop', shop);
            state.shop = shop
        }
    },
})

export default store;
