<template>
    <div style="margin-left: 5px; margin-right: 5px">

        <div class="row">
            <div class="col-8 col-sm-2 col-md-2 col-xl-2 col-lg-2">
                Street Located
            </div>

            <div class="col-7 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                <a-select
                        showSearch
                        placeholder="Select a Street"
                        optionFilterProp="children"
                        style="width: 200px"
                        :filterOption="filterOption"
                        notFoundContent="No Street Found"
                        v-loading="streetLoading"
                        v-model="street">
                    <a-select-option value="All">All</a-select-option>
                    <a-select-option v-for="street in streets"
                                     :key="street._id"
                                     :value="street.name">
                        {{street.name}}
                    </a-select-option>
                </a-select>
            </div>

            <div class="col-9 col-sm-4 col-md-4 col-xl-4 col-lg-4">
                <a-input-search
                        placeholder="Filter by shop Name"
                        style="width: 300px"
                        v-model="shopNameFilterText"
                        @search="filterBrands"
                        enterButton
                />
            </div>
        </div>


        <b-container fluid>
            <b-table show-empty responsive small hover outlined class="text-center" head-variant="light"
                     :items="items" :fields="fields" :current-page="currentPage"
                     :per-page="perPage"
                     :filter="shopNameFilterText" filterIncludedFields="name" :filter-function="customFilter"
                     @filtered="onFiltered"
                     selectable select-mode="single" @row-clicked="showAdditionalDetails" sort-icon-left>

                <template slot="name" slot-scope="data">
                    <div style="display:block;width:30vw;overflow-x: auto" class="badge"><h6>{{ data.value }}</h6></div>
                </template>

                <template slot="row-details" slot-scope="row">

                    <b-row class="text-left">
                        <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xs-2" style="padding: 5px;margin-left: 5px">
                            <b-badge class="text-center " style="font-size: 15px; font-weight: bold;" variant="primary">
                                ShopType1:
                            </b-badge>
                            &nbsp;
                            <b-badge class="text-center " style="font-size: 15px; font-weight: bold;" variant="success">
                                {{row.item.type1}}
                            </b-badge>
                        </div>
                        <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xs-3" style="padding: 5px;margin-left: 5px">
                            <b-badge class="text-center " style="font-size: 15px; font-weight: bold;" variant="primary">
                                ShopType2:
                            </b-badge>
                            &nbsp;
                            <b-badge class="text-center " style="font-size: 15px; font-weight: bold;" variant="dark">
                                {{row.item.type2}}
                            </b-badge>
                        </div>
                        <div class="col-12 col-sm-10 col-md-5 col-lg-5 col-xs-5" style="padding: 5px;margin-left: 5px">
                            <b-badge class="text-center " style="font-size: 15px; font-weight: bold;" variant="primary">
                                Address Line 2:
                            </b-badge>
                            &nbsp;
                            <b-badge class="text-center " style="font-size: 15px; font-weight: bold;" variant="info">
                                {{row.item.addressLine2 }}
                            </b-badge>
                        </div>
                    </b-row>

                </template>

                <template slot="actions" slot-scope="row">

                    <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="primary">
                         <span title="show info" v-if="row.detailsShowing === false">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                         </span>
                        <span title="hide info" v-else>
                            <i class="fa fa-minus" aria-hidden="true"></i>
                        </span>
                    </b-button>

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
</template>

<script>

    import {getStreets} from "@/api/ffaEndPoints";
    import {showErrorDialog} from "@/commons/commons";

    export default {
        name: "viewStore",
        props: ['tableData'],

        mounted() {
            this.$watch('tableData', response => {
                    this.showData(response);
                },
                {immediate: true});

            this.fields.push({key: 'name', label: 'Shop name', sortable: true});
            this.fields.push({key: 'street', label: 'Street'});
            this.fields.push({key: 'addressLine1', label: 'Address line 1'});
            this.fields.push({key: 'phoneNumber', label: 'Phone Number'});
            this.fields.push({key: 'actions', label: 'Actions'});

            this.streetLoading = true
            getStreets({}).then(res => {
                if (res.data.success) {
                    this.streets = res.data.data
                    this.streetLoading = false
                } else {
                    showErrorDialog(this.$swal, res.data.errorMessage)
                    this.streetLoading = false
                }
            }).catch(err => {
                showErrorDialog(this.$swal, err.message)
                this.streetLoading = false
            });
        },
        data() {
            return {
                street: "All",
                items: [],
                fields: [],
                currentPage: 1, perPage: 10,
                pageOptions: [5, 10, 15], sortBy: null, sortDesc: false, sortDirection: 'asc', filter: null,
                index: null,
                totalRows: 0,

                shopNameFilterText: "",
                streetLoading: false,
                streets:[],
            }
        },
        computed: {
            filteredItems() {
                let filterArray = []
                if (this.street === "All")
                    filterArray = this.items.filter(shop => {
                        return shop.name != null && shop.name.toLowerCase().includes(this.shopNameFilterText.toLowerCase())
                    });
                else {
                    filterArray = this.items.filter(shop => {
                        return shop.street === this.street &&
                            shop.name != null && shop.name.toLowerCase().includes(this.shopNameFilterText.toLowerCase());
                    })
                }
                return filterArray;
            }
        },
        methods: {
            showData(res) {
                this.items = [];
                if (res != null) {
                    for (let i = 0; i < res.length; i++) {
                        this.items.push({
                            'name': res[i].name,
                            'street': res[i].street,
                            'type1': res[i].type1,
                            'type2': res[i].type2,
                            'addressLine1': res[i].addressLine1,
                            'addressLine2': res[i].addressLine2,
                            'phoneNumber': res[i].phoneNumber
                        });
                    }
                    this.totalRows = this.items.length
                }
            },

            filterOption(input, option) {
                return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            },

            filterBrands() {
                return this.filteredItems;
            },

            showAdditionalDetails(item) {
                item._showDetails = !item._showDetails;
            },

            customFilter(item, filter) {
                return item.name != null && item.name.toLowerCase().includes(filter.toLowerCase())
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