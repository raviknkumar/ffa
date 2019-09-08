
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
            // eslint-disable-next-line no-console
            console.log("STORES SHOP")
        }
    },
}
