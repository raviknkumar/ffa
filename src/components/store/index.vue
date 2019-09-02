<template>
    <div>
        <h5 class="d-flex justify-content-center" style="margin-top: 1vh">Store</h5>
        <el-tabs type="card" v-model="activeTab">
            <el-tab-pane label="Add" id="tab-0" name="0" >
                <add-store @addData="changeActiveTab"></add-store>
            </el-tab-pane>
            <el-tab-pane label="View" id="tab-1" name="1">
                <view-store :reload-view-store="reloadViewStore" ></view-store>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import AddStore from "@/components/store/addStore";
    import ViewStore from "@/components/store/viewStore";
    export default {
        name: "index",
        components: {ViewStore, AddStore},
        methods: {
            changeActiveTab(){
                this.activeTab = "1";
                this.reloadViewStore = true;
            },
        },
        data(){
            return{
                activeTab:"0",
                reloadViewStore:false,
            }
        }
    }
</script>

<style scoped>

</style>