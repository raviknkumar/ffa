<template>
    <div>
        <div class="row d-flex justify-content-center">
            <h5>Manage Customer Orders </h5>
        </div>
        <el-tabs type="card">
            <el-tab-pane name="0" label="Generate And Download" style="margin-left: 1vw">
                <div>
                    <div class="row">
                        <div class="col-7 col-sm-4 col-md-3 col-xl-3 col-lg-3 ">
                            <el-date-picker v-model="date" placeholder="Search Date">
                            </el-date-picker>
                        </div>

                        <div class="col-5 col-sm-2 col-md-2 col-xl-2 col-lg-2">
                            <el-button type="primary" @click="fetchOrders">Fetch</el-button>
                        </div>
                    </div>

                    <div class="col-12 col-sm-12 col-md-6 col-xl-5 col-lg-6"
                         style="padding-top: 10px; padding-left: 1px;padding-right: 1px">
                        <a-input-group compact>
                            <a-select
                                    showSearch
                                    placeholder="Select a Street"
                                    optionFilterProp="children"
                                    style="width: 40%;height: 40px"
                                    :filterOption="filterOption"
                                    notFoundContent="No Street Found"
                                    v-model="street">
                                <a-select-option value="All">All</a-select-option>
                                <a-select-option value="G M Palya">G M Palya</a-select-option>
                                <a-select-option value="Jogupalya G Street">Jogupalya G Street</a-select-option>
                                <a-select-option value="Thippasandra">ThippaSandra</a-select-option>
                                <a-select-option value="Annasandrapalya">Anna sandra Palya</a-select-option>
                                <a-select-option value="DomlurMurugeshPalya">Domlur MurugeshPalya</a-select-option>
                                <a-select-option value="Kaggadasapura">Kaggadasapura</a-select-option>
                            </a-select>

                            <a-input-search
                                    placeholder="Filter by ShopName"
                                    style="width: 60%"
                                    v-model="shopNameFilterText"
                                    @search="filterPricingItems"
                                    @input="filterPricingItems"
                                    enterButton
                            />
                        </a-input-group>
                    </div>


                </div>

                <div>
                    <b-table show-empty responsive small outlined hover striped
                             :items="filteredItems" :fields="fields" :current-page="currentPage"
                             :per-page="perPage" :filter="filter" :busy="isBusy">

                        <div slot="table-busy" class="text-center my-2">
                            <b-spinner variant="primary" class="align-middle"></b-spinner>
                            <strong style="color: #1482f0">Loading...</strong>
                        </div>

                        <template slot-scope="row" slot="actions">
                            <el-button title="Download Sheets" type="success" size="mini" class="mr-1"
                                       @click.stop="openDownloadModal(row.item , $event.target)">
                                Generate & Download
                            </el-button>
                        </template>

                    </b-table>

                    <b-pagination
                            v-model="currentPage"
                            :total-rows="totalRows"
                            :per-page="perPage"
                            aria-controls="my-table"
                    ></b-pagination>

                    <el-dialog :visible.sync="dialog" title="Sheets" width="80%">
                        <div class="row justify-content-center">
                            Generate
                        </div>
                        <div class="justify-content-center">
                            <el-button
                                    type="primary" @click="generateExcel(downloadActions.content)" circle
                                    title="generate Excel">
                                <a-icon type="file-excel" style="font-size: 18px"/>
                            </el-button>
                            <el-button
                                    type="success" @click="generatePdf(downloadActions.content)"
                                    title="generate PDF"
                                    circle>
                                <a-icon type="file-pdf" style="font-size: 18px"/>
                            </el-button>
                        </div>
                        <br><br>
                        <div class="row justify-content-center">
                            Download
                        </div>
                        <el-button
                                type="warning" @click="downloadExcel(downloadActions.content)" round
                                title="download Excel">
                            <a-icon type="cloud-download" style="font-size: 18px"/>
                            <a-icon type="file-excel" style="font-size: 18px"/>
                        </el-button>
                        <el-button
                                type="danger" @click="downloadPdf(downloadActions.content)" round
                                title="download Pdf">
                            <a-icon type="cloud-download" style="font-size: 18px"/>
                            <a-icon type="file-pdf" style="font-size: 18px"/>
                        </el-button>
                        <span slot="footer" class="dialog-footer">
                    <el-button @click="dialog = false">Cancel</el-button>
                </span>
                    </el-dialog>
                </div>
            </el-tab-pane>
            <el-tab-pane label="Pricing" name="1">
                <div class="row form-group required">
                    <div class="col-7 col-sm-4 col-md-3 col-xl-3 col-lg-3 ">
                        <el-date-picker v-model="pricing.date" placeholder="Search Date">
                        </el-date-picker>
                    </div>

                    <div class="col-5 col-sm-2 col-md-2 col-xl-2 col-lg-2">
                        <el-button type="primary" @click="fetchOrdersForPricing">Fetch</el-button>
                    </div>
                </div>

                <div class="row">
                    <h6 class="col-2 col-sm-2 col-md-1 col-lg-1 col-xs-1">Shop </h6>
                    <a-select class="col-8 col-sm-8 col-md-5 col-lg-4 col-xl-3"
                              :filterOption="filterOption"
                              showSearch
                              v-loading="pricing.shopLoading"
                              placeholder="Select a Shop"
                              optionFilterProp="children"
                              notFoundContent="No Shop Found"
                              v-model="pricing.shopName"
                              @change="getSOD()">
                        <a-select-option v-for="shop in pricing.shops"
                                         :value="shop.name"
                                         :key="shop._id">{{shop.name}}
                        </a-select-option>
                    </a-select>
                </div>

                <div v-if="this.pricing.tableVisible">
                    <b-table show-empty responsive small outlined caption-top bordered head-variant="light"
                             :items="pricingFilteredItems" :fields="pricingFields" sort-icon-left
                             :current-page="pricing.currentPage"
                             :per-page="pricing.perPage" :busy="pricing.isBusy">

                        <div slot="table-busy" class="text-center my-2">
                            <b-spinner variant="primary" class="align-middle"></b-spinner>
                            <strong style="color: #1482f0">Loading...</strong>
                        </div>

                        <template slot="table-caption">
                            <a-input-search
                                    enterButton
                                    placeholder="Filter by Item Name"
                                    style="width: 200px"
                                    v-model="pricing.filterItemText"
                                    @search="filterPricingItems"
                            />
                            <b-button variant="danger" @click="updatePrice()" style="float: right;margin-right:5px">
                                <i class="fa fa-cloud-upload" style="font-size: 18px" title="upload"/> price
                            </b-button>
                        </template>

                        <template slot-scope="data" slot="itemName">
                            <b-badge style="display:block;width:50vw;overflow-x: auto"
                                     variant="warning"><h6>{{ data.value }}</h6></b-badge>
                        </template>

                        <template slot-scope="data" slot="pieces">
                            <span class="text-center" style="display: block;width: inherit">{{data.value}}</span>
                        </template>

                        <template slot-scope="data" slot="boxes">
                            <span class="text-center" style="display: block;width: inherit">{{data.value}}</span>
                        </template>

                        <template slot-scope="row" slot="originalPrice">
                            <input class="custom-input width-60" type="number" v-model="row.item.originalPrice"
                                   :ref="row.item.id"
                                   min="0" @input="changeStyle(row.item)"/>
                        </template>

                        <template slot-scope="row" slot="taxPrice">
                                <span class="text-center" style="display: block;width: inherit">
                                    {{row.item.taxPrice | addPercentage}}
                                </span>
                        </template>

                    </b-table>

                    <b-pagination
                            v-model="pricing.currentPage"
                            :total-rows="pricing.totalRows"
                            :per-page="pricing.perPage"
                            aria-controls="my-table"
                    ></b-pagination>
                </div>

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import "@/../public/styles/style.css"
    import {formatDateHiphen, showErrorDialog, showSuccessDialog, showWarningDialog} from "@/commons/commons";
    import {fetchOrders, fetchSaleOrder, generateFile, getBlobData, uploadPrice} from "@/api/ffaEndPoints";
    import {ffaProdUrl} from "@/api/request";
    import AInputGroup from "ant-design-vue/es/input/Group";

    export default {
        name: "index",
        components: {AInputGroup},
        data() {
            return {
                date: null,
                shopNameFilterText: "",
                items: [],
                fields: [],
                currentPage: 1, perPage: 10,
                pageOptions: [5, 10, 15], sortBy: null, sortDesc: false, sortDirection: 'asc', filter: null,
                index: null,
                totalRows: 0,
                isBusy: false,
                street: "All",
                dialog: false,
                downloadActions: {title: '', content: ''},

                pricingFields: [
                    {key: "itemName", label: "Item", sortable: true, sortDirection: 'desc'},
                    {key: "pieces", label: "Pieces", sortable: true,},
                    {key: "boxes", label: "Boxes", sortable: true,},
                    {key: "taxPrice", label: "TaxPrice(%)", sortable: true},
                    {key: "originalPrice", label: "Price",  sortable: true,},
                    {key: "salePrice", label: "Amount",  sortable: true}
                    ],

                pricing: {
                    date: null,
                    shops: [],
                    shopName: null,

                    items: [],
                    currentPage: 1, perPage: 10,
                    pageOptions: [5, 10, 15],

                    totalRows: 0,
                    isBusy: false,
                    tableVisible: false,
                    shopLoading: false,

                    saleOrder: {},
                    saleOrderDetails: [],

                    filterItemText: "",
                }
            }
        },

        computed: {
            filteredItems() {
                if (this.street === "All") {
                    return this.items.filter(item => {
                        return item != null && item.name.toLowerCase().includes(this.shopNameFilterText.toLowerCase())
                    })
                } else {
                    return this.items.filter(item => {
                        return item != null
                            && item.name.toLowerCase().includes(this.shopNameFilterText.toLowerCase())
                            && item.street === this.street;
                    })
                }
            },

            pricingFilteredItems() {
                return this.pricing.items.filter(sod => {
                    return sod.itemName.toLowerCase().includes(this.pricing.filterItemText.toLowerCase())
                });
            }

        },

        mounted() {
            this.fields.push({label: "name", key: "name"})
            this.fields.push({label: "street", key: "street"})
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
                            'key': i,
                        });
                    }
                    this.totalRows = this.items.length
                }
            },

            validateData() {
                if (this.date == null) {
                    showWarningDialog(this.$swal, "please select a date");
                    this.isBusy = false;
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

                this.resetDownloadModel();
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

                this.resetDownloadModel();

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
                this.resetDownloadModel();


                getBlobData(source, params).then(response => {
                    if (response.data != null) {
                        const url = window.URL.createObjectURL(new Blob([response.data]))
                        const link = document.createElement('a')
                        link.href = url
                        link.setAttribute('download', params.shopName + "_" + params.orderDate + ".xlsx")
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
                this.resetDownloadModel();

                let source = ffaProdUrl() + '/so/download';

                getBlobData(source, params).then(response => {
                    if (response.data != null) {
                        const url = window.URL.createObjectURL(new Blob([response.data]))
                        const link = document.createElement('a')
                        link.href = url
                        link.setAttribute('download', params.shopName + "_" + params.orderDate + ".pdf")
                        document.body.appendChild(link)
                        link.click()
                    } else
                        showErrorDialog(this.$swal, "No file exists, please generate file first")
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
                });
            },

            openDownloadModal(item, button) {
                this.dialog = true;
                this.downloadActions.content = item
            },

            resetDownloadModel() {
                this.dialog = false,
                    this.downloadActions.title = ''
                this.downloadActions.content = ''
            },

            filterShops() {
                return this.filteredItems;
            },

            filterOption(input, option) {
                // eslint-disable-next-line no-console
                return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            },

            fetchOrdersForPricing() {
                if (this.pricing.date === null) {
                    showWarningDialog(this.$swal, "Please select a date");
                    return;
                }
                this.pricing.shopLoading = true;
                let params = {}
                params.orderDate = formatDateHiphen(this.pricing.date)
                fetchOrders(params).then(res => {
                    if (res.data.success && res.data.data !== null && res.data.data.length > 0) {
                        this.pricing.shops = res.data.data
                        this.pricing.shopName = res.data.data[0].shopName
                    } else if (res.data.success && res.data === null) {
                        showErrorDialog(this.$swal, "No shops found");
                    } else {
                        showErrorDialog(this.$swal, res.data.errorMessage);
                    }
                    this.pricing.shopLoading = false;
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
                    this.pricing.shopLoading = false;
                })
            },

            getSOD() {

                let params = {}
                this.pricing.tableVisible = true;
                if (this.validateGetSODData() === false)
                    return;

                params.orderDate = formatDateHiphen(this.pricing.date);
                let shop = {}
                for (let i = 0; i < this.pricing.shops.length; i++) {
                    if (this.pricing.shops[i].name === this.pricing.shopName) {
                        shop = this.pricing.shops[i]
                        break;
                    }
                }
                params.shopId = shop.id;
                this.pricing.isBusy = true

                fetchSaleOrder(params).then(res => {
                    if (res.data.success) {
                        this.pricing.saleOrder = res.data.data.saleOrder;
                        this.pricing.saleOrderDetails = res.data.data.saleOrderDetails;
                        this.showSaleOrderDetailsData(this.pricing.saleOrderDetails);
                    } else {
                        showErrorDialog(this.$swal, res.data.errorMessage)
                    }
                    this.pricing.isBusy = false
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message)
                    this.pricing.isBusy = false
                })

            },

            validateGetSODData() {
                if (this.pricing.date === null) {
                    showWarningDialog(this.$swal, "Please enter date");
                    return false;
                } else if (this.pricing.shopName === null) {
                    showWarningDialog(this.$swal, "Please enter date");
                    return false;
                }
            },

            showSaleOrderDetailsData(res) {

                this.pricing.items = [];
                if (res != null) {
                    for (let i = 0; i < res.length; i++) {
                        this.pricing.items.push({
                            'id': res[i].id,
                            'saleOrderId': res[i].saleOrderId,
                            'itemId': res[i].itemId,
                            'itemName': res[i].itemName,
                            'salePrice': res[i].salePrice,
                            'originalPrice': res[i].originalPrice,
                            'taxPrice': res[i].taxPrice,
                            'pieces': res[i].pieces,
                            'boxes': res[i].boxes,
                        });
                    }
                    this.pricing.totalRows = this.pricing.items.length
                }
            },

            updatePrice() {
                if (this.validateUpdatePriceData() === false)
                    return;

                let data = {}
                data.saleOrder = this.pricing.saleOrder
                data.saleOrderDetails = this.pricing.items;

                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'fa fa-spinner fa-spin fa-3x',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                uploadPrice(data).then(res => {
                    if (res.data.success) {
                        this.pricing.tableVisible = false;
                        this.pricing.saleOrder = {}
                        this.pricing.saleOrderDetails = [];
                        this.pricing.items = []
                        loading.close();
                        showSuccessDialog(this.$swal, "Price uploaded successfully");
                    } else {
                        loading.close();
                        showErrorDialog(this.$swal, res.data.erroMessage)
                    }
                }).catch(err => {
                    loading.close();
                    showErrorDialog(this.$swal, err.message)
                });
            },

            validateUpdatePriceData() {
                for (let i = 0; i < this.pricing.items.length; i++) {
                    let item = this.pricing.items[i]
                    let price = item.originalPrice
                    if (price == null || price < 0) {
                        // this.$refs[this.pricing.items[i].id].style.border = "1px solid red";
                        this.$refs[this.pricing.items[i].id].focus()
                        showWarningDialog(this.$swal, "price cannot be empty or negative");
                        return false;
                    }
                }
                return true;
            },

            changeStyle(item) {
                if (item.originalPrice == null || item.originalPrice < 0 || item.originalPrice == "")
                    this.$refs[item.id].style.border = "1px solid red";
                else {
                    this.$refs[item.id].style.border = "none";
                    item.salePrice = item.originalPrice * (100 + item.taxPrice) / 100.0;
                }
            },

            filterBrands() {
                return this.filteredItems;
            },

            filterPricingItems() {
                return this.pricingFilteredItems;
            },
        },

        filters: {
            addPercentage(value) {
                return value + "%";
            }
        }
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
        width: 25vw;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>