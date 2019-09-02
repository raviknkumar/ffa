<template>
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
</template>

<script>
    import {getShops} from "../../api/ffaEndPoints"
    import {showErrorDialog} from "@/commons/commons";

    export default {
        name: "viewStore",
        mounted: function () {
            this.fields.push({key: 'name', label: 'Shop name'});
            this.fields.push({key: 'street', label: 'Street'});
            this.fields.push({key: 'type1', label: 'shop type 1'});
            this.fields.push({key: 'type2', label: 'shop type 2'});
            this.fields.push({key: 'addressLine1', label: 'Address line 1'});
            this.fields.push({key: 'addressLine2', label: 'Address Line 2'});
            this.fields.push({key: 'phoneNumber', label: 'Phone Number'});
            this.getShops();

        },
        data() {
            return {
                items: [],
                fields: [],
                currentPage: 1, perPage: 10,
                pageOptions: [5, 10, 15], sortBy: null, sortDesc: false, sortDirection: 'asc', filter: null,
                editInfoDialogFlag: false,
                tariffInfoToEdit: {},
                index: null,
                totalRows: 0
            }
        }
        ,
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

            getShops() {
                let params = {}
                getShops(params).then(res => {
                    this.showData(res.data.data);
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
                })
            }
        }
    }
</script>

<style scoped>

</style>