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
                        <el-input v-model="itemName" placeholder="enter Item Name"></el-input>
                    </div>
                </div>

                <div class="row form-group required">
                    <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3 control-label">
                        Brand
                    </div>
                    <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                        <a-select
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
                        Price
                    </div>
                    <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                        <el-input type="number" v-model="itemPrice" placeholder="enter Item Price"></el-input>
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
                    <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                        <el-input v-model="itemNameFilterText" placeholder="Search by Item Name"
                                   prefix-icon="fa fa-search"
                                   filterable v-loading="brandLoading">
                        </el-input>
                    </div>

                    <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                        <el-select v-model="brandFilterId" placeholder="Enter Brand"
                                   filterable v-loading="brandLoading">
                            <el-option value="All">All</el-option>
                            <el-option v-for="(brand) in brands"
                                       :value="brand.id"
                                       :key="brand._id"
                                       :label="brand.name">
                            </el-option>
                        </el-select>
                    </div>
                </div>


                <b-container fluid>
                    <b-table show-empty responsive small outlined hover striped
                             :items="filteredItems" :fields="fields" :current-page="currentPage"
                             :per-page="perPage" :filter="filter" :busy="isBusy">

                        <div slot="table-busy" class="text-center my-2">
                            <b-spinner variant="primary" class="align-middle"></b-spinner>
                            <strong style="color: #1482f0">Loading...</strong>
                        </div>
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
                itemPrice: null,
                brandLoading: false,

                itemNameFilterText: "",
                brandFilterId:"All",

                items: [],
                fields: [],
                currentPage: 1, perPage: 10,
                pageOptions: [5, 10, 15], sortBy: null, sortDesc: false, sortDirection: 'asc', filter: null,
                index: null,
                totalRows: 0,
                activeTab: "0",

                array: [
                    'Alabama', 'Alaska', 'American Samoa', 'Arizona',
                    'Arkansas', 'California', 'Colorado', 'Connecticut',
                    'Delaware', 'District of Columbia', 'Federated States of Micronesia',
                    'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
                    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
                    'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
                    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
                    'Missouri', 'Montana', 'Nebraska', 'Nevada',
                    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
                    'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
                    'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
                    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
                    'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
                    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
                ],

                isBusy:false,
            }
        },
        computed:{
            filteredItems(){
                if(this.brandFilterId === 'All')
                    return this.items.filter(item=>{
                        return item.name!= null && item.name.toLowerCase().includes(this.itemNameFilterText.toLowerCase())
                    })
                else {
                    return this.items.filter(item=>{
                        return item.brandId === this.brandFilterId &&
                            item.name!= null && item.name.toLowerCase().includes(this.itemNameFilterText.toLowerCase())
                    })
                }
            }
        },
        created() {
            this.getBrands();

            this.fields.push({key: 'name', label: 'Item Name'});
            this.fields.push({key: 'brandName', label: 'Brand Name'});
            this.fields.push({key: 'price', label: 'Item Price'});
            this.fields.push({key: 'inventory', label: 'Item Stock'});

            this.getItems();
        },
        methods: {
            addItem() {
                if(this.validateData() === false)
                    return;

                let data = {}
                data.name = this.itemName
                let brand = this.brands[this.brandIndex]
                data.brandId = brand.id
                data.brandName = brand.name
                data.price = this.itemPrice
                addItem(data).then(res => {
                    if (res.data.success) {
                        showSuccessDialog(this.$swal, "Item Added Successfully");
                        this.getItems();
                        this.clearData();
                        this.activeTab = "1";
                    }
                    else
                        showErrorDialog(this.$swal, res.data.errorMessage);
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
                })
            },

            validateData(){
                let errorMessage = "";
                if(this.itemName === null){
                    errorMessage = "please enter itemName"
                }
                else if(this.brandIndex == null)
                    errorMessage = "please enter brand name"
                if(errorMessage !== "") {
                    showWarningDialog(this.$swal, errorMessage)
                    return false
                }
                return true;
            },

            getBrands(){
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

            getItems(){
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
                            'brandId':res[i].brandId,
                            'price': res[i].price,
                            'inventory': res[i].inventory
                        });
                    }
                    this.totalRows = this.items.length
                }
            },
            clearData(){
                this.itemName = "";
                this.brandIndex = null
                this.itemPrice = null
            },

            filterOption(input, option) {
                return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        }
    }
</script>

<style scoped>

</style>