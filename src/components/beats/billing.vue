<template>
    <div>
        <div class="row d-flex justify-content-center">
            <h2><i class="el-icon-s-shop"></i></h2>
            <h4>
                {{shop.name}}
            </h4>
        </div>

        <el-tabs type="card">
            <el-tab-pane label="Order Entry">
                <div class="row">
                    <div class="col-4 col-sm-2 col-md-2 col-xl-2 col-lg-2">
                        Brand:
                    </div>
                    <div class="col-7 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                        <a-select
                                showSearch
                                placeholder="Select a Brand"
                                optionFilterProp="children"
                                style="width: 200px"
                                :filterOption="filterOption" v-loading="brandLoading"
                                v-model="brandId">
                            <a-select-option value="All">All</a-select-option>
                            <a-select-option v-for="(brand) in brands" :value="brand.id"
                                             :key="brand._id"
                                             :label="brand.name">
                                {{brand.name}}
                            </a-select-option>
                        </a-select>
                    </div>
                </div>

                <b-table show-empty responsive small outlined sticky-header
                         :items="filteredItems" :fields="fields" head-variant="light"
                         style="margin-bottom: 7vh;"
                         :busy="isBusy">

                    <div slot="table-busy" class="text-center my-2">
                        <b-spinner variant="primary" class="align-middle"></b-spinner>
                        <strong style="color: #1482f0">Loading...</strong>
                    </div>

                    <template slot="itemName" slot-scope="data">
                        <b-badge style="display:block;width:50vw;overflow-x: auto"
                                 variant="warning"><h6>{{ data.value }}</h6></b-badge>
                    </template>

                    <template slot="boxes" slot-scope="row">
                        <input class="custom-input width-60" type="number" v-model="row.item.boxes"
                               @change="editRow(row.index)"/>
                    </template>

                    <template slot="pieces" slot-scope="row">
                        <input class="custom-input width-60" type="number" v-model="row.item.pieces"
                               @change="editRow(row.index)"/>
                    </template>

                </b-table>


                <div class="row poz">
                    <div class="col-7">
                        <a-input-search
                                placeholder="Filter items..."
                                @search="filterItems"
                                enterButton v-model="itemFilterText"
                        />
                    </div>
                    <div class="col-4">
                        <el-button type="success" @click.native="createBill()"
                                   style="background-color: #fb8c00;border-color: #fb8c00">Next
                        </el-button>
                    </div>
                </div>

            </el-tab-pane>

            <el-tab-pane label="reports">
                Reports
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    /* eslint-disable */

    import {createSaleOrder, fetchSaleOrder, getBrands, getItems} from "@/api/ffaEndPoints";
    import {formatDateHiphen, showErrorDialog, showSuccessDialog} from "@/commons/commons";

    export default {
        name: "billing",
        async created() {

            this.fields.push({key: 'itemName', value: "Name"})
            this.fields.push({key: 'pieces', value: "Pieces"})
            this.fields.push({key: 'boxes', value: "Boxes"})

            this.getBrands();

            this.fetchDataAsync();
            this.fetchData = false
        },

        async mounted() {

        },

        watch: {
            async $route(route) {
                this.clearData();
                if (route.name === 'shopReport' && this.fetchData === true) {
                    this.fetchDataAsync();
                }
            }
        },

        data() {
            return {
                brands: [],
                brandId: "All",
                brandLoading: false,

                items: [],
                fields: [],
                itemFilterText: "",
                editedRows: new Set(),

                saleOrder: {},
                saleOrderDetails: [],

                fetchData: true,
                isBusy: true,

            }
        },
        computed: {
            shop() {
                return this.$store.getters.getShop;
            },
            filteredItems() {
                if (this.brandId === 'All') {
                    return this.items.filter(item => {
                        return item.itemName != null && item.itemName.includes(this.itemFilterText);
                    })
                } else {
                    return this.items.filter(item => {
                        return item.itemName != null
                            && item.itemName.includes(this.itemFilterText)
                            && item.brandId === this.brandId
                    })
                }
            }
        },
        methods: {
            getBrands() {
                this.brandLoading = true
                getBrands({}).then(res => {
                    this.brandLoading = false
                    if (res.data.success)
                        this.brands = res.data.data
                    else
                        showErrorDialog(this.$swal, res.data.errorMessage)
                }).catch(err => {
                    this.brandLoading = false
                    showErrorDialog(this.$swal, err.message);
                })
            },
            async getItems() {
                this.isBusy = true;
                return getItems({});
            },

            processItems(resp) {
                this.items = []
                for (let i = 0; i < resp.length; i++) {
                    this.items.push({
                        'saleOrderId': null,
                        'pieces': '',
                        'boxes': '',
                        'itemName': resp[i].name,
                        'brandId': resp[i].brandId,
                        'itemId': resp[i].id,
                        'id': "",
                    })
                }
            },

            createBill() {
                this.showConfirmDialog();
            },

            showConfirmDialog() {
                this.$swal({
                    title: 'Are you sure to create the bill?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    showCloseButton: true,
                    position: 'top',
                }).then((result) => {
                    if (!result.value) {
                        this.$swal({
                            position: 'top',
                            type: 'warning',
                            title: 'Cancelled',
                            text: 'Bill not created!',
                            showConfirmButton: true,
                            timer: 1500
                        })
                    } else {
                        this.addSaleOrder()
                    }
                })
            },

            editRow(index) {
                this.editedRows.add(index)
            },

            async fetchSaleOrder() {
                let params = {}
                params.shopId = this.shop.id;
                params.orderDate = formatDateHiphen(new Date())

                return fetchSaleOrder(params);
            },

            processSaleOrders(res) {
                if (res.data.success && res.data.data != null) {
                    this.saleOrder = res.data.data.saleOrder
                    this.saleOrderDetails = res.data.data.saleOrderDetails
                }
            },

            addExisitingSaleOrderDetails() {
                const itemMap = new Map();
                if (this.saleOrderDetails.length > 0) {
                    for (let i = 0; i < this.items.length; i++) {
                        let item = this.items[i];
                        itemMap.set(item.itemId, item)
                    }

                    for (let i = 0; i < this.saleOrderDetails.length; i++) {
                        let saleOrderDetail = this.saleOrderDetails[i]
                        itemMap.set(saleOrderDetail.itemId, saleOrderDetail);
                    }
                    this.items = [...itemMap.values()];
                }
                this.isBusy = false
            },

            addSaleOrder() {
                let data = {};
                data.saleOrder = {};
                if (Object.keys(this.saleOrder).length === 0) {
                    data.saleOrder.shopName = this.shop.name
                    data.saleOrder.shopId = this.shop.id
                    data.saleOrder.orderDate = formatDateHiphen(new Date());
                    data.saleOrder.id = null
                } else {
                    data.saleOrder = {...this.saleOrder}
                }
                let updatedData = []

                let changedRows = [...this.editedRows]
                changedRows.forEach(rowIndex => {
                    let obj = this.convertItemToSaleOrderDetail(data.saleOrder, this.items[rowIndex]);
                    updatedData.push({
                        ...obj
                    })
                });

                data.saleOrderDetails = updatedData;

                createSaleOrder(data).then(res => {
                    if (res.data.success) {
                        showSuccessDialog(this.$swal, "Order created successfully")
                        this.clearData();
                        this.fetchDataAsync();
                    } else {
                        showErrorDialog(this.$swal, res.data.errorMessage)
                    }
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
                })
            },

            convertItemToSaleOrderDetail(saleOrder, item) {
                let tempData = {}
                tempData.saleOrderId = item.saleOrderId;
                if (tempData.saleOrderId == null)
                    tempData.saleOrderId = saleOrder.id;

                tempData.id = item.id
                tempData.itemId = item.itemId;
                tempData.itemName = item.itemName;
                tempData.pieces = item.pieces;
                tempData.boxes = item.boxes;
                return tempData;
            },

            clearData() {
                this.items = []
                this.editedRows = new Set();
                this.saleOrder = {}
                this.saleOrderDetails = []
                this.fetchData = true;
            },
            async fetchDataAsync() {
                let res = await this.getItems().catch(err => {
                    this.isBusy = false
                    showErrorDialog(this.$swal, err.message)
                });
                this.processItems(res.data.data);
                res = await this.fetchSaleOrder().catch(err => {
                    this.isBusy = false
                    showErrorDialog(this.$swal, err.message)
                });
                this.processSaleOrders(res);
                this.addExisitingSaleOrderDetails()
                this.isBusy = false
            },

            filterItems() {
                return this.filteredItems
            },

            filterOption(input, option) {
                return option.componentOptions.children[0].text.toLowerCase().includes(input.toLowerCase()) >= 0
            },
        },
    }
</script>

<style scoped>
    .custom-input {
        webkit-appearance: none;
        background-color: #f0f0f0;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    }

    .width-60 {
        width: 60px;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    .poz {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 1vw;
        z-index: 200;
        background: #e3f2fd;

        display: flex;
        justify-content: center;
    }

    @media (max-width: 575.98px) {
        .poz {
            height: 10vh;
            padding-bottom: 5vh;
        }
    }

    /* Small devices (landscape phones, 576px and up) */
    @media (min-width: 576px) and (max-width: 767.98px) {
        .poz {
            height: 8vh;
            padding-bottom: 3vh;
        }
    }

    /* Medium devices (tablets, 768px and up) */
    @media (min-width: 768px) and (max-width: 991.98px) {
        .poz {
            height: 6vh;
            padding-bottom: 2vh;
        }
    }

    /*Large devices (desktops, 992px and up)*/
    @media (min-width: 992px) and (max-width: 1199.98px) {
        .poz {
            height: 8vh;
            padding-bottom: 2vh;
        }
    }

    /*Extra large devices (large desktops, 1200px and up)*/
    @media (min-width: 1200px) {
        .poz {
            height: 8vh;
            padding-bottom: 2vh;
        }
    }

</style>