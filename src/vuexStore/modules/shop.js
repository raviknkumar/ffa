
export default shop;

const shop = {
    state: () => {
        return {
            shop: null
        }
    },

    mutations:{
        storeShop: (state, shop) => {
            state.shop = shop
        }
    },
}
