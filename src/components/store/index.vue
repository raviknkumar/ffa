<template>
    <div>
        <h5 class="d-flex justify-content-center" style="margin-top: 1vh">Store</h5>
        <el-tabs type="card">
            <el-tab-pane label="Add">
                <add-store></add-store>
            </el-tab-pane>
            <el-tab-pane label="View">
                <view-store></view-store>
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
        methods: {}
    }
</script>

<style scoped>

</style>