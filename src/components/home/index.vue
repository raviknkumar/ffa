<template>
    <b-container class="dashboard-container">
        <div class="row">
            <div class="col-12 col-sm-6 d-flex flex-column align-items-center">
                <div>
                    <img src="https://img.icons8.com/color/70/000000/shop.png" alt="Shop">
                </div>
                <div>
                    <el-button type="success" plain @click="navigateTo('/store')"> ManageShops
                    </el-button>
                </div>
            </div>
            <div class="col-12 col-sm-6 d-flex flex-column align-items-center">
                <div>
                    <img src="https://img.icons8.com/color/70/000000/download.png">
                </div>
                <div>
                    <el-button type="success" plain @click="navigateTo('/order')"> DownloadOrders
                    </el-button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-sm-6 d-flex flex-column align-items-center">
                <div>
                    <img src="https://img.icons8.com/color/70/000000/new--v1.png">
                </div>
                <div>
                    <el-button type="primary" plain @click="navigateTo('/brand')"> Manage Brands
                    </el-button>
                </div>
            </div>
            <div class="col-12 col-sm-6 d-flex flex-column align-items-center">
                <div>
                    <img src="https://img.icons8.com/color/70/000000/shopping-cart.png">
                </div>
                <div>
                    <el-button type="warning" plain @click="navigateTo('/item')"> Manage Items
                    </el-button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12 col-sm-6 d-flex flex-column align-items-center">
                <div>
                    <img src="https://img.icons8.com/cute-clipart/70/000000/purchase-order.png">
                </div>
                <div>
                    <el-button type="primary" plain @click="navigateTo('/beats')"> Manage Orders
                    </el-button>
                </div>
            </div>
            <div class="col-12 col-sm-6 d-flex flex-column align-items-center">
                <div>
                    <img src="https://img.icons8.com/color/70/000000/combo-chart.png">
                </div>
                <div>
                    <el-button type="primary" plain @click="navigateTo('/metrics')"> Metrics
                    </el-button>
                </div>
            </div>
        </div>

    </b-container>
</template>

<script>
    export default {
        name: "index",
        components: {},
        methods: {
            navigateTo: function (routePath) {
                this.$router.push(routePath)
            }
        }
    }
</script>

<style scoped>
    .dashboard-container {
        width: 100%;
        min-height: 70vh;
        justify-content: center;
        alignment: center;
    }

    .dashboard-text {
        font-size: 30px;
        line-height: 46px;
    }
</style>

