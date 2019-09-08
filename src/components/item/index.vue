<template>
    <div>
        <h5 class="d-flex justify-content-center blue--text" style="margin-top: 1vh">
            ITEM
        </h5>
        <el-tabs type="card">
            <el-tab-pane label="Add">
                <div class="row">
                    <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3">
                        Item Name
                    </div>
                    <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                        <el-input v-model="itemName" placeholder="enter Item Name"></el-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3">
                        Brand
                    </div>
                    <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                        <el-select v-model="brandIndex" placeholder="Enter Brand"
                                   filterable>
                            <el-option v-for="(brand, index) in brands"
                                       :value="index"
                                       :key="brand._id"
                                       :label="brand.name">
                            </el-option>
                        </el-select>
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

            <el-tab-pane label="View">
                <b-container fluid>
                    <b-table show-empty responsive small outlined hover striped
                             :items="items" :fields="fields" :current-page="currentPage"
                             :per-page="perPage" :filter="filter">
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
    import {showErrorDialog, showSuccessDialog} from "@/commons/commons";

    export default {
        name: "index",
        data() {
            return {
                brands: [],
                itemName: null,
                brandIndex: null,
                brandId: null,
                itemPrice: null,

                items: [],
                fields: [],
                currentPage: 1, perPage: 10,
                pageOptions: [5, 10, 15], sortBy: null, sortDesc: false, sortDirection: 'asc', filter: null,
                index: null,
                totalRows: 0
            }
        },
        created() {
            getBrands().then(res => {
                if (res.data.success)
                    this.brands = res.data.data
                else
                    showErrorDialog(this.$swal, "Error fetching brands");
            }).catch(err => {
                showErrorDialog(this.$swal, err.message);
            })

            this.fields.push({key: 'name', label: 'Item Name'});
            this.fields.push({key: 'brandName', label: 'Brand Name'});
            this.fields.push({key: 'price', label: 'Item Price'});
            this.fields.push({key: 'inventory', label: 'Item Stock'});

            getItems().then(res => {
                if (res.data.success)
                    this.showData(res.data.data)
                else
                    showErrorDialog(this.$swal, res.data.errorMessage)
            }).catch(err => {
                showErrorDialog(this.$swal, err.message)
            })
        },
        methods: {
            addItem() {
                let data = {}
                data.name = this.itemName
                let brand = this.brands[this.brandIndex]
                data.brandId = brand.id
                data.brandName = brand.name
                data.price = this.itemPrice
                addItem(data).then(res => {
                    if (res.data.success)
                        showSuccessDialog(this.$swal, "Item Added Successfully");
                    else
                        showErrorDialog(this.$swal, res.data.errorMessage);
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
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
                            'price': res[i].price,
                            'inventory': res[i].inventory
                        });
                    }
                    this.totalRows = this.items.length
                }
            },
        }
    }
</script>

<style scoped>

</style>