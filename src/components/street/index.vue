<template>
    <div>
        <h5 class="d-flex justify-content-center blue--text" style="margin-top: 1vw">
            Street
        </h5>
        <el-tabs type="card" v-model="activeTab">
            <el-tab-pane label="Add" name="0">
                <div class="row form-group required">
                    <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3 ">
                        <h6 class="control-label">Street Name </h6>
                    </div>
                    <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                        <el-input ref="streetName" type="text" v-model="streetName"
                                  placeholder="Enter Street Name.."></el-input>
                    </div>
                </div>
                <el-button type="primary" @click="addStreet">
                    Add Street
                </el-button>
            </el-tab-pane>
            <el-tab-pane label="view" name="1">
                <div style="margin-left: 5px; margin-right: 5px">

                    <div class="row">
                        <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3">
                            Street Name
                        </div>
                        <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                            <a-input-search
                                    enterButton
                                    placeholder="Enter Streetname.. to filter"
                                    style="width: 300px"
                                    v-model="filterStreetText"
                                    @search="filterStreets"
                            />
                        </div>
                    </div>

                    <b-container fluid>
                        <b-table show-empty responsive small outlined hover striped
                                 :items="filteredItems" :fields="fields" :current-page="currentPage"
                                 :per-page="perPage"
                                 :sort-by.sync="sortBy"
                                 :sort-desc.sync="sortDesc"
                                 sort-icon-left=true>
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
    import {showErrorDialog, showSuccessDialog, showWarningDialog} from "@/commons/commons";
    import {addStreet, getStreets} from "@/api/ffaEndPoints";

    export default {
        name: "index",
        data() {
            return {
                streetName: null,

                items: [],
                fields: [],
                currentPage: 1, perPage: 10,
                pageOptions: [5, 10, 15], sortBy: "name", sortDesc: false, sortDirection: 'asc', filter: null,
                index: null,
                totalRows: 0,
                activeTab: "0",

                filterStreetText: "",
                filterFields: ["name"]
            }
        },
        mounted() {
            this.fields.push({key: 'id', label: 'Id'});
            this.fields.push({key: 'name', label: 'Street Name', sortable : true});
            this.getStreets();
        },
        computed: {
            filteredItems() {
                let filterArray = []
                filterArray =  this.items.filter(street => {
                    return street.name != null && street.name.toLowerCase().includes(this.filterStreetText.toLowerCase())
                });
                this.onFilteringData(filterArray);
                return filterArray;
            }
        },
        methods: {
            addStreet() {
                if (this.validateData() === false)
                    return;
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'fa fa-spinner fa-spin fa-3x',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let data = {}
                data.name = this.streetName;
                addStreet(data).then(res => {
                    if (res.data.success) {
                        this.clearData();
                        loading.close();
                        showSuccessDialog(this.$swal, "Street Added Successfully");
                        this.getStreets();
                    } else {
                        loading.close();
                        showErrorDialog(this.$swal, res.data.errorMessage)
                    }
                }).catch(err => {
                    loading.close();
                    showErrorDialog(this.$swal, err.message);
                })
            },

            getStreets() {
                let params = {}
                getStreets(params).then(res => {
                    this.showData(res.data.data);
                    this.activeTab = '1';
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
                })
            },

            validateData() {
                if (!this.streetName) {
                    this.$refs["streetName"].focus();
                    showWarningDialog(this.$swal, "please enter Street name")
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

            clearData() {
                this.streetName = null;
            },

            filterStreets() {
                return this.filteredItems;
            },
            onFilteringData(data){
                this.totalRows = data.length;
                this.currentPage = 1;
            }
        }
    }
</script>

<style scoped>

</style>