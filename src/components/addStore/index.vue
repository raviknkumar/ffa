<template>
    <div style="margin-left: 2vw;">
        <div class="row d-flex justify-content-center" style="margin-top: 1vh">
            <h5>ADD A SHOP</h5>
        </div>

        <div class="row">
            <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3">
                Shop Name
            </div>
            <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                <el-input v-model="shopName" placeholder="enter shopname"></el-input>
            </div>
        </div>

        <div class="row">
            <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3">
                Street Located
            </div>
            <div class="col-7 col-sm-5 col-md-5 col-xl-5 col-lg-5">
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

        <div class="row">
            <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3">
                Address Line 1
            </div>
            <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                <el-input type="text" v-model="addressLine1" placeholder="Address Line 1"></el-input>
            </div>
        </div>

        <div class="row">
            <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3">
                Address Line 2
            </div>
            <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                <el-input type="text" v-model="addressLine2" placeholder="Address Line 2"></el-input>
            </div>
        </div>

        <div class="row">
            <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3">
                Phone Number
            </div>
            <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                <el-input type="tel" v-model="phoneNumber" placeholder="Phone number"></el-input>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                shopName: null,
                street: null,
                addressLine1: null,
                addressLine2: null,
                phoneNumber:null
            }
        }
    }
</script>

<style scoped>

</style>