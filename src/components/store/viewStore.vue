<template>
    <div style="margin-left: 5px; margin-right: 5px">

        <div class="row">
            <div class="col-8 col-sm-2 col-md-2 col-xl-2 col-lg-2">
                Street Located
            </div>
            <div class="col-7 col-sm-4 col-md-4 col-xl-5 col-lg-5">
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

            <div class="col-9 col-sm-4 col-md-4 col-xl-4 col-lg-4">
                <el-input prefix-icon="fa fa-search" placeholder="Filter by shop Name" v-model="shopNameFilterText">
                </el-input>
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

                shopNameFilterText:""
            }
        },
        computed: {
            filteredItems() {
                if (this.street === "All")
                    return this.items.filter(shop =>{
                        return shop.name!=null && shop.name.toLowerCase().includes(this.shopNameFilterText.toLowerCase())
                    });
                else {
                    return this.items.filter(shop => {
                        return shop.street === this.street &&
                            shop.name!=null && shop.name.toLowerCase().includes(this.shopNameFilterText.toLowerCase());
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
        }
    }
</script>

<style scoped>

</style>