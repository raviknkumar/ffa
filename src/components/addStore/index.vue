<template>
    <div style="margin-left: 1vw;">
        <div class="row d-flex justify-content-center" style="margin-top: 1vh">
            <h5>ADD A SHOP</h5>
        </div>

        <div class="row">
            <div class="col-sm-12 col-md-3 col-xl-3 col-lg-3">
                Shop Name
            </div>
            <div class="col-sm-12 col-md-3 col-xl-3 col-lg-3">
                <el-input v-model="shopName" placeholder="enter shopname"></el-input>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12 col-md-3 col-xl-3 col-lg-3">
                Street Located
            </div>
            <div class="col-sm-12 col-md-3 col-xl-3 col-lg-3">
                <el-select v-model="street" placeholder="select street" filterable>
                    <el-option value="G M Palya">G M Palya</el-option>
                    <el-option value="Jogupalya G Street">Jogupalya G Street</el-option>
                    <el-option value="Thippasandra">ThippaSandra</el-option>
                    <el-option value="Annasandrapalya">Anna sandra Palya</el-option>
                    <el-option value="DomlurMurugeshPalya">Domlur MurugeshPalya</el-option>
                    <el-option value="Kaggadasapura">Kaggadasapura</el-option>
                </el-select>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
               shopName:null,
                street:null,
            }
        }
    }
</script>

<style scoped>

</style>