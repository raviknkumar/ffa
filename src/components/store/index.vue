<template>
    <div>
        <h5 class="d-flex justify-content-center" style="margin-top: 1vh">Store</h5>
        <el-tabs type="card" v-model="activeTab">
            <el-tab-pane label="Add" id="tab-0" name="0">
                <add-store @addData="changeActiveTab"></add-store>
            </el-tab-pane>
            <el-tab-pane label="View" id="tab-1" name="1">
                <view-store :table-data="tableData"></view-store>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import AddStore from "@/components/store/addStore";
    import ViewStore from "@/components/store/viewStore";
    import {getShops} from "@/api/ffaEndPoints";
    import {showErrorDialog} from "@/commons/commons";

    export default {
        name: "index",
        components: {ViewStore, AddStore},
        mounted() {
            this.getShops();
        },
        data() {
            return {
                activeTab: "0",
                tableData: [],
            }
        },
        methods: {
            changeActiveTab() {
                this.getShops();
                this.activeTab = "1";
            },
            getShops() {
                let params = {}
                getShops(params).then(res => {
                    this.tableData = res.data.data;
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message);
                })
            },
        }
    }
</script>

<style scoped>

</style>