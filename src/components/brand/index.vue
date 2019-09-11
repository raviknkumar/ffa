<template>
    <div>
        <h5 class="d-flex justify-content-center blue--text" style="margin-top: 1vw">Brand</h5>
        <el-tabs type="card" v-model="activeTab">
            <el-tab-pane label="Add" name="0">
                <div class="row form-group required">
                    <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3 control-label">
                        Brand Name
                    </div>
                    <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                        <el-input type="text" v-model="brandName" placeholder="Enter Brand Name.."></el-input>
                    </div>
                </div>
                <el-button type="primary" @click="addBrand">
                    Add Brand
                </el-button>
            </el-tab-pane>
            <el-tab-pane label="view" name="1">
                <div style="margin-left: 5px; margin-right: 5px">

                    <div class="row">
                        <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3">
                            Brand Name
                        </div>
                        <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                            <a-input-search
                                    enterButton
                                    placeholder="Enter brandname.. to filter"
                                    style="width: 300px"
                                    v-model="filterbrandText"
                                    @search="filterBrands"
                            />
                        </div>
                    </div>

                    <b-container fluid>
                        <b-table show-empty responsive small outlined hover striped
                                 :items="filteredItems" :fields="fields" :current-page="currentPage"
                                 :per-page="perPage" :filter="filter">
                        </b-table>
                        <b-pagination
                                v-model="currentPage"
                                :total-rows="totalRows"
                                :per-page="perPage"
                                aria-controls="my-table"
                        ></b-pagination>
                    </b-container>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {addBrand, getBrands} from "@/api/ffaEndPoints";
    import {showErrorDialog, showSuccessDialog, showWarningDialog} from "@/commons/commons";
    import "../../../public/styles/style.css"

    export default {
        name: "index",
        data() {
            return {
                brandName: null,
                items: [],
                fields: [],
                currentPage: 1, perPage: 10,
                pageOptions: [5, 10, 15], sortBy: null, sortDesc: false, sortDirection: 'asc', filter: null,
                index: null,
                totalRows: 0,
                activeTab: "0",

                filterbrandText: ""
            }
        },
        mounted() {
            this.fields.push({key: 'id', label: 'Id'});
            this.fields.push({key: 'name', label: 'Brand Name'});
            this.getBrands();
        },

        computed: {
            filteredItems() {
                return this.items.filter(brand => {
                    return brand.name != null && brand.name.toLowerCase().includes(this.filterbrandText.toLowerCase())
                });
            }
        },
        methods: {
            addBrand() {
                if (this.validateData() === false)
                    return;
                let data = {}
                data.name = this.brandName;
                addBrand(data).then(res => {
                    if (res.data.success) {
                        this.clearData();
                        showSuccessDialog(this.$swal, "Brand Added Successfully");
                        this.getBrands();
                    } else
                        showErrorDialog(this.$swal, res.data.errorMessage)
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
                })
            },

            validateData() {

                if (this.brandName == null) {
                    showWarningDialog(this.$swal, "please enter brand name")
                    return false;
                }
                return true;
            },

            showData(res) {
                this.items = [];
                if (res != null) {
                    for (let i = 0; i < res.length; i++) {
                        this.items.push({
                            'id': res[i].id,
                            'name': res[i].name,
                        });
                    }
                    this.totalRows = this.items.length
                }
            },

            getBrands() {
                let params = {}
                getBrands(params).then(res => {
                    this.showData(res.data.data);
                    this.activeTab = '1';
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
                })
            },

            clearData() {
                this.brandName = null;
            },
            filterBrands() {
                return this.filteredItems;
            }
        }
    }
</script>

<style scoped>

</style>