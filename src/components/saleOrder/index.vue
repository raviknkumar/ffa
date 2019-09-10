<template>
    <div>
        <div class="row form-group required">
            <div class="col-7 col-sm-4 col-md-3 col-xl-3 col-lg-3 ">
                <el-date-picker v-model="date" placeholder="Search Date">
                </el-date-picker>
            </div>

            <div class="col-5 col-sm-2 col-md-2 col-xl-2 col-lg-2">
                <el-button type="primary" @click="fetchOrders">Fetch</el-button>
            </div>
        </div>

        <div class="row">
            <div class="col-7 col-sm-4 col-md-4 col-xl-4 col-lg-4">
            <el-input prefix-icon="fa fa-search" v-model="shopNameFilterText"
            placeholder="filter by shop name"></el-input>
            </div>

            <div class="col-5 col-sm-4 col-md-4 col-xl-5 col-lg-5">
                <el-select v-model="street" placeholder="select street" filterable>
                    <el-option value="All">All</el-option>
                    <el-option value="G M Palya">G M Palya</el-option>
                    <el-option value="Jogupalya G Street">Jogupalya G Street</el-option>
                    <el-option value="Thippasandra">ThippaSandra</el-option>
                    <el-option value="Annasandrapalya">Anna sandra Palya</el-option>
                    <el-option value="DomlurMurugeshPalya">Domlur MurugeshPalya</el-option>
                    <el-option value="Kaggadasapura">Kaggadasapura</el-option>
                </el-select>
            </div>
        </div>

        <div>
            <b-container fluid>
                <b-table show-empty responsive small outlined hover striped
                         :items="filteredItems" :fields="fields" :current-page="currentPage"
                         :per-page="perPage" :filter="filter" :isBusy="isBusy">

                <div slot="table-busy" class="text-center my-2">
                    <b-spinner variant="primary" class="align-middle"></b-spinner>
                    <strong style="color: #1482f0">Loading...</strong>
                </div>

                <template slot-scope="row" slot="actions">
                    <el-button type="primary" @click="generateExcel(row.item)" circle title="generate Excel">
                        <a-icon type="file-excel" style="font-size: 18px" />
                        </el-button>
                    <el-button type="success" @click="generatePdf(row.item)" title="generate PDF" circle>
                        <a-icon type="file-pdf" style="font-size: 18px" />
                    </el-button>
                    <el-button type="warning" @click="downloadExcel(row.item)" round title="download Excel">
                        <a-icon type="cloud-download" style="font-size: 18px" />
                        <a-icon type="file-excel" style="font-size: 18px" />
                    </el-button>
                    <el-button type="danger" @click="downloadPdf(row.item)" round title="download Pdf">
                        <a-icon type="cloud-download" style="font-size: 18px" />
                        <a-icon type="file-pdf" style="font-size: 18px" />
                    </el-button>
                </template>

                </b-table>
                <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        aria-controls="my-table"
                ></b-pagination>
            </b-container>
        </div>
    </div>
</template>

<script>
    import "@/../public/styles/style.css"
    import {formatDateHiphen, showErrorDialog, showSuccessDialog, showWarningDialog} from "@/commons/commons";
    import {fetchOrders, generateFile, getBlobData} from "@/api/ffaEndPoints";
    import {ffaProdUrl} from "@/api/request";
    export default {
        name: "index",
        data(){
            return{
                date:null,
                shopNameFilterText:"",
                items: [],
                fields: [],
                currentPage: 1, perPage: 10,
                pageOptions: [5, 10, 15], sortBy: null, sortDesc: false, sortDirection: 'asc', filter: null,
                index: null,
                totalRows: 0,
                isBusy: false,
                street: "All",
            }
        },

        computed:{
          filteredItems(){
              if(this.street === "All") {
                  return this.items.filter(item => {
                      return item != null && item.name.toLowerCase().includes(this.shopNameFilterText.toLowerCase())
                  })
              }
              else {
                  return this.items.filter(item => {
                      return item != null
                          && item.name.toLowerCase().includes(this.shopNameFilterText.toLowerCase())
                          && item.street === this.street;
                  })
              }
          }
        },

        mounted(){
          this.fields.push({id:"name",key:"name"})
          this.fields.push({id:"street",key:"street"})
          this.fields.push("actions");
        },

        methods: {
            fetchOrders() {
                this.isBusy = true
                let params = {}
                if (this.validateData() === false)
                    return;
                params.orderDate = formatDateHiphen(this.date)
                fetchOrders(params).then(res => {
                    if (res.data.success) {
                        this.showData(res.data.data)
                    } else {
                        showErrorDialog(this.$swal, res.data.errorMessage);
                    }
                    this.isBusy = false
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
                    this.isBusy = false;
                })

            },

            showData(res) {
                this.items = [];
                if (res != null) {
                    for (let i = 0; i < res.length; i++) {
                        this.items.push({
                            'id': res[i].id,
                            'name': res[i].name,
                            'street': res[i].street,
                        });
                    }
                    this.totalRows = this.items.length
                }
            },

            validateData() {
                if (this.date == null) {
                    showWarningDialog(this.$swal, "please select a date");
                    return false;
                }
                return true;
            },

            generateExcel(row) {
                let params = {}
                params.orderDate = formatDateHiphen(this.date);
                params.shopId = row.id;
                params.shopName = row.name
                params.type = "excel";

                generateFile(params).then(res => {
                    if (res.data != null) {
                        showSuccessDialog(this.$swal, "File generated successfully..")
                    } else
                        showErrorDialog(this.$swal, res.data.errorMessage)
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
                })
            },

            generatePdf(row) {
                let params = {}
                params.orderDate = formatDateHiphen(this.date);
                params.shopId = row.id;
                params.shopName = row.name
                params.type = "pdf";

                generateFile(params).then(res => {
                    if (res.data != null) {
                        showSuccessDialog(this.$swal, "File generated successfully..")
                    } else
                        showErrorDialog(this.$swal, res.data.errorMessage)
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
                })
            },

            downloadExcel(row) {
                let params = {}
                params.orderDate = formatDateHiphen(this.date);
                params.shopId = row.id;
                params.shopName = row.name
                params.type = "excel";

                let source = ffaProdUrl() + '/so/download';

                getBlobData(source, params).then(response => {
                    if (response.data != null) {
                        const url = window.URL.createObjectURL(new Blob([response.data]))
                        const link = document.createElement('a')
                        link.href = url
                        link.setAttribute('download', params.shopName+"_"+params.orderDate+".xlsx")
                        document.body.appendChild(link)
                        link.click()
                    } else
                        showErrorDialog(this.$swal, "No file exists, please generate file first")
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
                });
            },

            downloadPdf(row) {
                let params = {}
                params.orderDate = formatDateHiphen(this.date);
                params.shopId = row.id;
                params.shopName = row.name
                params.type = "pdf";

                let source = ffaProdUrl() + '/so/download';

                getBlobData(source, params).then(response => {
                    if (response.data != null) {
                        const url = window.URL.createObjectURL(new Blob([response.data]))
                        const link = document.createElement('a')
                        link.href = url
                        link.setAttribute('download', params.shopName+"_"+params.orderDate+".pdf")
                        document.body.appendChild(link)
                        link.click()
                    } else
                        showErrorDialog(this.$swal, "No file exists, please generate file first")
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
                });
            }
        }
    }
</script>

<style scoped>

</style>