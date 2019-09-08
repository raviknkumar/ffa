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

    export default {
        name: "viewStore",
        props:['tableData'],

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
                items: [],
                fields: [],
                currentPage: 1, perPage: 10,
                pageOptions: [5, 10, 15], sortBy: null, sortDesc: false, sortDirection: 'asc', filter: null,
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
        }
    }
</script>

<style scoped>

</style>