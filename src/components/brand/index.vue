<template>
    <div>
        <h5 class="d-flex justify-content-center blue--text" style="margin-top: 1vw">Brand</h5>
        <el-tabs type="card" v-model="activeTab">
            <el-tab-pane label="Add" name="0">
                <div class="row form-group required">
                    <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3 ">
                        <h6 class="control-label">Brand Name </h6>
                    </div>
                    <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                        <el-input ref="brandName" type="text" v-model="brandName" placeholder="Enter Brand Name.."></el-input>
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
                                    :value="filterbrandText"
                                    @input="evt=>filterbrandText = evt.target.value"
                                    @search="filterBrands"
                            />
                        </div>
                    </div>

                    <b-container fluid>
                        <b-table show-empty responsive small outlined hover striped
                                 :items="items" :fields="fields" :current-page="currentPage"
                                 :per-page="perPage"
                                 :sort-by.sync="sortBy"
                                 :sort-desc.sync="sortDesc"
                                 sort-icon-left=true
                                 :filter="filterbrandText" :filterIncludedFields="filterFields" :filter-function="customFilter" @filtered="onFiltered">
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
                pageOptions: [5, 10, 15], sortBy: "name", sortDesc: false, sortDirection: 'asc', filter: null,
                index: null,
                totalRows: 0,
                activeTab: "0",

                filterbrandText: "",
                filterFields:["name"]
            }
        },
        mounted() {
            this.fields.push({key: 'id', label: 'Id'});
            this.fields.push({key: 'name', label: 'Brand Name', sortable : true});
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
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'fa fa-spinner fa-spin fa-3x',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let data = {}
                data.name = this.brandName;
                addBrand(data).then(res => {
                    if (res.data.success) {
                        this.clearData();
                        loading.close();
                        showSuccessDialog(this.$swal, "Brand Added Successfully");
                        this.getBrands();
                    } else {
                        loading.close();
                        showErrorDialog(this.$swal, res.data.errorMessage)
                    }
                }).catch(err => {
                    loading.close();
                    showErrorDialog(this.$swal, err.message);
                })
            },

            validateData() {
                if (!this.brandName ) {
                    this.$refs["brandName"].focus();
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
            },

            customFilter(item, filter){
                return item.name!= null && item.name.toLowerCase().includes(filter.toLowerCase())
            },
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            }
        }
    }
</script>

<style scoped>

</style>