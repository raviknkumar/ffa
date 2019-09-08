<template>
    <div v-if="pageLoaded" v-loading="!pageLoaded">
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
                        <el-select v-model="brandId" placeholder="select brand"
                                   filterable v-loading="brandLoading"
                                   @change="filterItems()">
                            <el-option value="All">All</el-option>
                            <el-option v-for="brand in brands"
                                       :key="brand._id"
                                       :label="brand.name"
                                       :value="brand.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>

                <b-table show-empty responsive small outlined sticky-header
                         :items="filteredItems" :fields="fields" head-variant="light"
                         style="margin-bottom: 7vh;">

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
                        <el-input type="text" v-model="itemFilter"
                                  placeholder="Filter items..."/>
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
    import {createSaleOrder, fetchSaleOrder, getBrands, getItems} from "@/api/ffaEndPoints";
    import {formatDateHiphen, showErrorDialog} from "@/commons/commons";

    export default {
        name: "billing",
        async mounted() {
            this.fields.push({key: 'itemName', value: "Name"})
            this.fields.push({key: 'pieces', value: "Pieces"})
            this.fields.push({key: 'boxes', value: "Boxes"})

            this.getBrands();
            await this.getItems();
            this.fetchSaleOrder();
            this.addExisitingSaleOrderDetails();
            this.pageLoaded = true
        },
        data() {
            return {
                brands: [],
                brandId: null,
                brandLoading: false,
                items: [],
                filteredItems: [],

                tableItems: [],
                fields: [],
                itemFilter: null,
                editedRows: new Set(),

                saleOrder: {},
                saleOrderDetails: [],

                pageLoaded: false

            }
        },
        computed: {
            shop() {
                return this.$store.getters.getShop;
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
                getItems({}).then(res => {
                    if (res.data.success) {
                        let resp = res.data.data
                        this.tableItems = []
                        for (let i = 0; i < resp.length; i++) {
                            this.tableItems.push({
                                'saleOrderId': null,
                                'pieces': '',
                                'boxes': '',
                                'itemName': resp[i].name,
                                'brandId': resp[i].brandId,
                                'itemId': resp[i].id,
                                'id':"",
                            })
                        }
                        // this.filteredItems = this.tableItems;
                    } else
                        showErrorDialog(this.$swal, res.data.errorMessage)
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
                })
            },

            filterItems() {
                if (this.brandId === 'All')
                    this.filteredItems = this.tableItems;

                else {
                    this.filteredItems = this.tableItems.filter(item => {
                        return item.brandId === this.brandId;
                    })
                }
            },

            createBill() {
                // eslint-disable-next-line no-console
                this.showConfirmDialog();
            },

            showConfirmDialog() {
                this.$swal({
                    title: 'Are you sure to create the bill?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    showCloseButton: true
                }).then((result) => {
                    if (!result.value) {
                        this.$swal({
                            position: 'center',
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
                // eslint-disable-next-line no-console
                console.log("row edited: " + index)
            },

            fetchSaleOrder() {
                let params = {}
                params.shopId = this.shop.id;
                params.orderDate = formatDateHiphen(new Date())

                fetchSaleOrder(params).then(res => {
                    if (res.data.success && res.data.data != null) {
                        this.saleOrder = res.data.data.saleOrder
                        this.saleOrderDetails = res.data.data.saleOrderDetails
                    }
                })
                console.log("SOD:", this.saleOrderDetails.length);
            },

            addExisitingSaleOrderDetails() {
                const itemMap = new Map();
                // eslint-disable-next-line no-console
                console.log("ITEMS:", this.tableItems)
                for(let i=0; i< this.tableItems.length;i++){
                    let item = this.tableItems[i];
                    itemMap.set(item.itemId, item)
                }

                // eslint-disable-next-line no-console
                console.log("MAP:",itemMap)
                // eslint-disable-next-line no-console
                console.log("SOD: ", this.saleOrderDetails);

                for (let i = 0; i < this.saleOrderDetails.length; i++) {
                    let saleOrderDetail = this.saleOrderDetails[i]
                    itemMap.set(saleOrderDetail.itemId, saleOrderDetail);
                }
                this.tableItems = [...itemMap.values()];
                this.filteredItems = this.tableItems;

                // eslint-disable-next-line no-console
                console.log(this.tableItems)
            },

            addSaleOrder() {

                let data = {};
                data.saleOrder = {};
                let saleOrder = data.saleOrder;
                saleOrder.shopName = this.shop.name
                saleOrder.shopId = this.shop.id
                saleOrder.orderDate = formatDateHiphen(new Date());
                saleOrder.id = null
                let updatedData = []

                let changedRows = [...this.editedRows]
                changedRows.forEach(rowIndex => {
                    let obj = this.convertItemToSaleOrderDetail(this.tableItems[rowIndex]);
                    updatedData.push({
                        ...obj
                    })
                });

                data.saleOrderDetails = updatedData;
                // eslint-disable-next-line no-console
                console.log(data);

                createSaleOrder(data).then(res => {
                    if (res.data.success) {
                        // eslint-disable-next-line no-undef
                        showSuccessDialog(this.$swal, "Order created successfully")
                    } else {
                        showErrorDialog(this.$swal, res.data.errorMessage)
                    }
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
                })
            },

            convertItemToSaleOrderDetail(obj) {
                let tempData = {}
                tempData.saleOrderId = obj.saleOrderId;
                tempData.id = obj.id
                tempData.itemId = obj.itemId;
                tempData.itemName = obj.itemName;
                tempData.pieces = obj.pieces;
                tempData.boxes = obj.boxes;
                return tempData;
            }
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