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
                        v-model="street">
                    <a-select-option value="G M Palya">G M Palya</a-select-option>
                    <a-select-option value="Jogupalya G Street">Jogupalya G Street</a-select-option>
                    <a-select-option value="Thippasandra">ThippaSandra</a-select-option>
                    <a-select-option value="Annasandrapalya">Anna sandra Palya</a-select-option>
                    <a-select-option value="DomlurMurugeshPalya">Domlur MurugeshPalya</a-select-option>
                    <a-select-option value="Kaggadasapura">Kaggadasapura</a-select-option>
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
            <b-table show-empty responsive small hover striped bordered
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
</template>

<script>

    export default {
        name: "viewStore",
        props: ['tableData'],

        mounted() {
            this.$watch('tableData', response => {
                    this.showData(response);
                },
                {immediate: true})
            this.fields.push({key: 'name', label: 'Shop name'});
            this.fields.push({key: 'street', label: 'Street'});
            this.fields.push({key: 'type1', label: 'shop type 1'});
            this.fields.push({key: 'type2', label: 'shop type 2'});
            this.fields.push({key: 'addressLine1', label: 'Address line 1'});
            this.fields.push({key: 'addressLine2', label: 'Address Line 2'});
            this.fields.push({key: 'phoneNumber', label: 'Phone Number'});
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

                shopNameFilterText: ""
            }
        },
        computed: {
            filteredItems() {
                if (this.street === "All")
                    return this.items.filter(shop => {
                        return shop.name != null && shop.name.toLowerCase().includes(this.shopNameFilterText.toLowerCase())
                    });
                else {
                    return this.items.filter(shop => {
                        return shop.street === this.street &&
                            shop.name != null && shop.name.toLowerCase().includes(this.shopNameFilterText.toLowerCase());
                    })
                }
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
            }
        }
    }
</script>

<style scoped>

</style>