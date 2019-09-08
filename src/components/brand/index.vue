<template>
    <div>
        <h5 class="d-flex justify-content-center blue--text" style="margin-top: 1vw">Brand</h5>
        <el-tabs type="card">
            <el-tab-pane label="Add">
                <div class="row">
                    <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3">
                    Brand Name
                </div>
                <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                    <el-input type="text" v-model="brandName"></el-input>
                </div>
                </div>
                <el-button type="primary" @click="addBrand">
                    Add Brand
                </el-button>
            </el-tab-pane>
            <el-tab-pane label="view">
                <div style="margin-left: 5px; margin-right: 5px">
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
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {addBrand, getBrands} from "@/api/ffaEndPoints";
    import {showErrorDialog, showSuccessDialog} from "@/commons/commons";

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
                totalRows: 0
            }
        },
        mounted() {
            this.fields.push({key: 'id', label: 'Id'});
            this.fields.push({key: 'name', label: 'Brand Name'});
            this.getBrands();
        },

        methods: {
            addBrand() {
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
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
                })
            },

            clearData(){
                this.brandName = null;
            }
        }
    }
</script>

<style scoped>

</style>