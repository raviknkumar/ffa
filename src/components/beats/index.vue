<template>
    <div>
        <div class="row" style="margin: 5px">
            <a-input-group compact>
                <a-select
                        showSearch
                        placeholder="Street Filter"
                        optionFilterProp="children"
                        style="width: 40%;height: 40px"
                        notFoundContent="No Street Found"
                        @change="handleChange"
                        :filterOption="filterOption">
                    <a-select-option value="All">All</a-select-option>
                    <a-select-option value="G M Palya">G M Palya</a-select-option>
                    <a-select-option value="Jogupalya G Street">Jogupalya G Street</a-select-option>
                    <a-select-option value="Thippasandra">ThippaSandra</a-select-option>
                    <a-select-option value="Annasandrapalya">Anna sandra Palya</a-select-option>
                    <a-select-option value="DomlurMurugeshPalya">Domlur MurugeshPalya</a-select-option>
                    <a-select-option value="Kaggadasapura">Kaggadasapura</a-select-option>
                </a-select>
                <a-input-search
                        enterButton
                        placeholder="Filter by ShopName"
                        style="width: 60%"
                        v-model="shopNameFilterText"
                        @input="filterShops"
                        @search="filterShops"
                />
            </a-input-group>
        </div>

        <div v-if="shopLoading" class="text-center my-2">
            <b-spinner variant="primary" class="align-middle"></b-spinner>
            <strong style="color: #1482f0">Loading...</strong>
        </div>

        <div class="row d-flex justify-content-center">
            <b-button pill class="col-10 col-sm-3 col-md-3 col-xl-3 col-lg-3"
                      v-for="shop in filteredShops"
                      variant="outline-success"
                      style="margin: 2vw"
                      @click="createBill(shop)"
                      :key="shop._id">
                {{shop.name}}
            </b-button>
        </div>
        <div class="row d-flex justify-content-center" v-if="filteredShops.length === 0">
            No shops Found
        </div>
    </div>
</template>

<script>
    import {getShops} from "@/api/ffaEndPoints";
    import {showErrorDialog} from "@/commons/commons";
    import store from "@/vuexStore/index"

    export default {
        name: "index",
        data() {
            return {
                shops: [],
                filteredShops: [],
                street: null,
                shopLoading: false,
                shopNameFilterText: ""
            }
        },
        methods: {
            createBill(shop) {
                store.commit('storeShop', shop);
                this.$router.push('/beats/' + shop.id);
            },

            filterShops() {
                if (this.street === 'All')
                    this.filteredShops = this.shops;
                else {
                    this.filteredShops = this.shops.filter(shop => {
                        return shop.street === this.street
                    });
                }
                this.filteredShops = this.filteredShops.filter(shop => {
                    return shop.name.toLowerCase().includes(this.shopNameFilterText.toLowerCase())
                });
            },
            handleChange(value) {
                this.street = value;
                this.filterShops();
            }

        },
        created() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'fa fa-spinner fa-spin fa-3x',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            getShops({}).then(res => {
                if (res.data.success) {
                    this.shops = res.data.data
                    this.filteredShops = res.data.data
                } else
                    showErrorDialog(this.$swal, res.data.errorMessage);
                loading.close()
            }).catch(err => {
                showErrorDialog(this.$swal, err.message);
                loading.close()
            })
        }
    }
</script>

<style scoped>

</style>

<!--<div class="col-5 col-sm-5 col-md-3 col-xl-3 col-lg-3">-->
<!--    <el-select v-model="street" placeholder="select street"-->
<!--               filterable @change="filterShops()">-->
<!--        <el-option value="all">All</el-option>-->
<!--        <el-option value="G M Palya">G M Palya</el-option>-->
<!--        <el-option value="Jogupalya G Street">Jogupalya G Street</el-option>-->
<!--        <el-option value="Thippasandra">ThippaSandra</el-option>-->
<!--        <el-option value="Annasandrapalya">Anna sandra Palya</el-option>-->
<!--        <el-option value="DomlurMurugeshPalya">Domlur MurugeshPalya</el-option>-->
<!--        <el-option value="Kaggadasapura">Kaggadasapura</el-option>-->
<!--    </el-select>-->
<!--</div>-->
<!--<div class="col-7 col-sm-5 col-md-5 col-xl-5 col-lg-5">-->
<!--    <a-input-search-->
<!--            enterButton-->
<!--            placeholder="Filter by ShopName"-->
<!--            style="width: inherit"-->
<!--            v-model="shopNameFilterText"-->
<!--            @input="filterShops"-->
<!--            @search="filterShops"-->
<!--    />-->
<!--</div>-->