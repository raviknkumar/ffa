<template>
    <div>
        <h5 class="d-flex justify-content-center blue--text" style="margin-top: 1vh">
            ITEM
        </h5>
        <el-tabs type="card" v-model="activeTab">
            <el-tab-pane label="Add" name="0" id="tab-0">
                <div class="row form-group required">
                    <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3 control-label">
                        Item Name
                    </div>
                    <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                        <el-input ref="itemName" v-model="itemName" placeholder="enter Item Name"></el-input>
                    </div>
                </div>

                <div class="row form-group required">
                    <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3 control-label">
                        Brand
                    </div>
                    <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                        <a-select v-model="brandIndex" ref="brand"
                                  showSearch
                                  placeholder="Select a Brand"
                                  optionFilterProp="children"
                                  style="width: 200px"
                                  :filterOption="filterOption">
                            <a-select-option v-for="(brand,index) in brands" :value="index"
                                             :key="brand._id"
                                             :label="brand.name">
                                {{brand.name}}
                            </a-select-option>
                        </a-select>
                    </div>
                </div>

                <div class="row">
                    <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3">
                        Box Price
                    </div>
                    <div class="col-8 col-sm-4 col-md-3 col-xl-3 col-lg-3">
                        <el-input type="number" min="0" v-model="boxPrice" placeholder="enter Item Box Price">
                            <template slot="prepend"><i class="fa fa-rupee" aria-hidden="false"></i></template>
                        </el-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3">
                        Piece Price
                    </div>
                    <div class="col-8 col-sm-4 col-md-3 col-xl-3 col-lg-3">
                        <el-input type="number" min="0" v-model="piecePrice" placeholder="enter Item Piece Price">
                            <template slot="prepend"><i class="fa fa-rupee" aria-hidden="false"></i></template>
                        </el-input>
                    </div>
                </div>

                <div class="row form-group required">
                    <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3 control-label">
                        Tax (%)
                    </div>
                    <div class="col-10 col-sm-8 col-md-3 col-xl-4 col-lg-4">
                        <a-input style="width: 100%" addonAfter="%" ref="taxPercent" type="number" min="0" max="100"
                                 v-model="taxPercent" placeholder="enter Item Tax In percent" >
                        </a-input>
<!--                        <el-input ref="taxPercent" type="number" min="0" max="100"-->
<!--                                  v-model="taxPercent" placeholder="enter Item Tax In percent">-->
<!--                            <template slot="prepend"><i class="fa fa-percent" aria-hidden="false"></i></template>-->
<!--                        </el-input>-->
                    </div>
                </div>

                <div class="row">
                    <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3 d-flex justify-content-center">
                        <el-button type="primary" @click.native="addItem" style="background-color: #1867c0 !important">
                            Add Item
                        </el-button>
                    </div>
                </div>
            </el-tab-pane>

            <el-tab-pane label="View" name="1" id="tab-1">

                <div class="row">
                    <div class="col-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
                        <a-select v-model="brandFilterId"
                                  showSearch
                                  placeholder="Select a Brand"
                                  optionFilterProp="children"
                                  style="width: 200px"
                                  :filterOption="filterOption"
                                  v-loading="brandLoading">
                            <a-select-option value="All">All</a-select-option>
                            <a-select-option v-for="(brand) in brands"
                                             :value="brand.id"
                                             :key="brand._id"
                            >{{brand.name}}
                            </a-select-option>
                        </a-select>
                    </div>
                    <div class="col-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
                        <a-input-search
                                placeholder="Enter brandname.. to filter"
                                style="width: 300px"
                                :value="itemNameFilterText"
                                @input="evt=>itemNameFilterText = evt.target.value"
                                @search="filterItems"
                                enterButton
                        />
                    </div>
                </div>


                <b-container fluid>
                    <b-table show-empty responsive small  hover striped outlined
                             :items="filteredItems" :fields="fields" :current-page="currentPage"
                             :per-page="perPage" :filter="filter" :busy="isBusy">

                        <div slot="table-busy" class="text-center my-2">
                            <b-spinner variant="primary" class="align-middle"></b-spinner>
                            <strong style="color: #1482f0">Loading...</strong>
                        </div>

                        <template slot="name" slot-scope="data">
                            <div style="display:block;width:30vw;overflow-x: auto" class="badge"><h6>{{ data.value }}</h6></div>
                        </template>

                    </b-table>
                    <b-pagination
                            v-model="currentPage"
                            :total-rows="totalRows"
                            :per-page="perPage"
                            aria-controls="my-table"
                    ></b-pagination>
                </b-container>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {addItem, getBrands, getItems} from "@/api/ffaEndPoints";
    import {showErrorDialog, showSuccessDialog, showWarningDialog} from "@/commons/commons";
    import "@/../public/styles/style.css"

    export default {
        name: "index",
        data() {
            return {
                brands: [],
                itemName: null,
                brandIndex: null,
                brandId: null,
                boxPrice: null,
                piecePrice: null,
                taxPercent: null,
                brandLoading: false,

                itemNameFilterText: "",
                brandFilterId: "All",

                items: [],
                fields: [],
                currentPage: 1, perPage: 10,
                pageOptions: [5, 10, 15], sortBy: null, sortDesc: false, sortDirection: 'asc', filter: null,
                index: null,
                totalRows: 0,
                activeTab: "0",

                isBusy: false,
            }
        },
        computed: {
            filteredItems() {
                let filterArray = [];
                if (this.brandFilterId === 'All')
                    filterArray =  this.items.filter(item => {
                        return item.name != null && item.name.toLowerCase().includes(this.itemNameFilterText.toLowerCase())
                    })
                else {
                    filterArray =  this.items.filter(item => {
                        return item.brandId === this.brandFilterId &&
                            item.name != null && item.name.toLowerCase().includes(this.itemNameFilterText.toLowerCase())
                    })
                }
                this.onFilterigData(filterArray);
                return filterArray;
            }
        },
        created() {
            this.getBrands();

            this.fields.push({key: 'name', label: 'Item Name'});
            this.fields.push({key: 'brandName', label: 'Brand Name'});
            this.fields.push({key: 'boxPrice', label: 'Box Price'});
            this.fields.push({key: 'piecePrice', label: 'Piece Price'});
            this.fields.push({key: 'taxPercent', label: 'Tax Percent '});
            this.fields.push({key: 'inventory', label: 'Item Stock'});


            this.getItems();
        },
        methods: {
            addItem() {
                if (this.validateData() === false)
                    return;

                let data = {}

                data.name = this.itemName
                let brand = this.brands[this.brandIndex]
                data.brandId = brand.id
                data.brandName = brand.name
                data.boxPrice = this.boxPrice
                data.piecePrice = this.piecePrice
                data.taxPercent = this.taxPercent;

                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'fa fa-spinner fa-spin fa-3x',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                addItem(data).then(res => {
                    if (res.data.success) {
                        loading.close();
                        showSuccessDialog(this.$swal, "Item Added Successfully");
                        this.getItems();
                        this.clearData();
                        this.activeTab = "1";
                    } else{
                        loading.close();
                        showErrorDialog(this.$swal, res.data.errorMessage);
                    }
                }).catch(err => {
                    loading.close();
                    showErrorDialog(this.$swal, err.message);
                })
            },

            validateData() {
                let errorMessage = "";
                if (!this.itemName) {
                    this.$refs["itemName"].focus();
                    errorMessage = "please enter itemName"
                } else if (this.brandIndex == null) {
                    this.$refs["brand"].focus();
                    errorMessage = "please enter brand name"
                }
                else if (this.taxPercent == null || isNaN(this.taxPercent)) {
                    this.$refs["taxPercent"].focus();
                    errorMessage = "please enter valid tax percent"
                }
                else if (this.taxPercent < 0){
                    this.$refs["taxPercent"].focus();
                    errorMessage = "Tax percent cannot be negative";
                }
                else if (this.taxPercent > 100) {
                    this.$refs["taxPercent"].focus();
                    errorMessage = "Tax percent cannot be greater than 100";
                }

                if (errorMessage !== "") {
                    showWarningDialog(this.$swal, errorMessage)
                    return false
                }
                return true;
            },

            getBrands() {
                this.brandLoading = true;
                getBrands().then(res => {
                    if (res.data.success)
                        this.brands = res.data.data
                    else
                        showErrorDialog(this.$swal, "Error fetching brands");
                    this.brandLoading = false;
                }).catch(err => {
                    this.brandLoading = false;
                    showErrorDialog(this.$swal, err.message);
                })
            },

            getItems() {
                this.isBusy = true;
                getItems().then(res => {
                    if (res.data.success)
                        this.showData(res.data.data)
                    else
                        showErrorDialog(this.$swal, res.data.errorMessage)
                    this.isBusy = false
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message)
                    this.isBusy = false
                })
            },

            showData(res) {
                this.items = [];
                if (res != null) {
                    for (let i = 0; i < res.length; i++) {
                        this.items.push({
                            'id': res[i].id,
                            'name': res[i].name,
                            'brandName': res[i].brandName,
                            'brandId': res[i].brandId,
                            'boxPrice': res[i].boxPrice,
                            'piecePrice': res[i].piecePrice,
                            'taxPercent': res[i].taxPercent,
                            'inventory': res[i].inventory,
                        });
                    }
                    this.totalRows = this.items.length
                }
            },
            clearData() {
                this.itemName = "";
                this.brandIndex = null
                this.itemPrice = null
            },

            filterOption(input, option) {
                return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            },

            filterItems() {
                return this.filteredItems;
            },
            onFilterigData(data){
                this.totalRows = data.length;
                this.currentPage = 1;
            }
        }
    }
</script>

<style scoped>

</style>