<template>
    <div>
        <div class="row" style="margin: 5px">
            <a-select
                    showSearch
                    placeholder="Street Filter"
                    optionFilterProp="children"
                    style="width: 55%;height: 40px"
                    notFoundContent="No Street Found"
                    defaultValue="All"
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
            <div class="formGroup">
                <input type="text" placeholder="Filter by Shop Name" class="expandInput"
                       v-model="shopNameFilterText"
                       @input="filterShops"/>
                <b-button class="buttonPushLeft" @click="filterShops" variant="primary">
                    <i class="fa fa-search" aria-hidden="false"></i>
                </b-button>
            </div>
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
            },
            filterOption(input, option) {
                return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            },

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

    .formGroup {
        display: flex;
        flex-direction: row;
        position: absolute;
        right: 0;
        width: 20%;
        -webkit-transition: width 0.4s;
        transition: width 2s;
    }

    .formGroup .expandInput {
        width: 100%;
        border-top: 2px solid #ccc;
        border-bottom: 2px solid #ccc;
        border-left: 2px solid #ccc;
        border-radius: 4px 0 0 4px;
        font-size: 16px;
        background-color: white;
    }

    .formGroup:focus-within {
        width: 90%;
    }

    .buttonPushLeft {
        margin-left: -1px;
    }

</style>