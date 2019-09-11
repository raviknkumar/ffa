<template>
    <b-container class="dashboard-container">
        <b-row class="dashboard-text">

            <b-col :span="8">
                <b-row>
                    <img src="https://img.icons8.com/color/70/000000/shop.png">
                </b-row>
                <b-row>
                    <el-button type="success" plain @click="navigateTo('/store')"> ManageShops
                    </el-button>
                </b-row>
            </b-col>

            <b-col :span="8">
                <b-row>
                    <img src="https://img.icons8.com/color/70/000000/download.png">
                </b-row>
                <b-row>
                    <el-button type="success" plain @click="navigateTo('/order')"> DownloadOrders
                    </el-button>
                </b-row>
            </b-col>
        </b-row>
        <b-row>

            <b-col :span="8">
                <b-row type="flex">
                    <img src="https://img.icons8.com/color/70/000000/new--v1.png">
                </b-row>
                <b-row>
                    <el-button type="primary" plain @click="navigateTo('/brand')"> Manage Brands
                    </el-button>
                </b-row>
            </b-col>

            <b-col :span="8">
                <b-row type="flex">
                    <img src="https://img.icons8.com/color/70/000000/shopping-cart.png">
                </b-row>
                <b-row>
                    <el-button type="warning" plain @click="navigateTo('/item')"> Manage Items
                    </el-button>
                </b-row>
            </b-col>

        </b-row>
        <b-row>

            <b-col :span="8">
                <b-row type="flex">
                    <img src="https://img.icons8.com/cute-clipart/70/000000/purchase-order.png">
                </b-row>
                <b-row>
                    <el-button type="primary" plain @click="navigateTo('/beats')"> Manage Orders
                    </el-button>
                </b-row>
            </b-col>

            <b-col :span="8">
                <b-row type="flex">
                    <img src="https://img.icons8.com/color/70/000000/combo-chart.png">
                </b-row>
                <b-row>
                    <el-button type="primary" plain @click="navigateTo('/metrics')"> Metrics
                    </el-button>
                </b-row>
            </b-col>

        </b-row>
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
        justify-content: center;
        alignment: center;
    }

    .dashboard-text {
        font-size: 30px;
        line-height: 46px;
    }
</style>

