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
            <!--            <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3">-->
            <!--                Street Located-->
            <!--            </div>-->
            <div class="col-9 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                <el-select v-model="type1" placeholder="select type" filterable>
                    <el-option value="GOI">GOI</el-option>
                    <el-option value="GSS">GSS</el-option>
                    <el-option value="GOT">GOT</el-option>
                    <el-option value="GFW">GFW</el-option>
                    <el-option value="GGS">GGS</el-option>
                    <el-option value="GMS">GMS</el-option>
                    <el-option value="GGK">GGK</el-option>
                    <el-option value="GFS">GFS</el-option>
                    <el-option value="GPETYS">GPETTYS</el-option>
                    <el-option value="GPS">GPS</el-option>
                    <el-option value="SELF SERVICE">SELF SERVICE</el-option>
                    <el-option value="GDC">GCDC</el-option>
                    <el-option value="GFO">GFO</el-option>
                    <el-option value="GCC">GCC</el-option>
                    <el-option value="GLB">GLB</el-option>
                    <el-option value="GTRS">GTRS</el-option>
                </el-select>
            </div>
        </div>

        <div class="row">
            <!--            <div class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3">-->
            <!--                Street Located-->
            <!--            </div>-->
            <div class="col-9 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                <el-select v-model="type2" placeholder="select type2" filterable>
                    <el-option value="Executive Basic">Executive Basic</el-option>
                    <el-option value="Executive">Executive</el-option>
                    <el-option value="Signature">Signature</el-option>
                    <el-option value="Premium">Premium</el-option>
                    <el-option value="Vintage">Vintage</el-option>
                    <el-option value="FirstBusiness">First Business</el-option>
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

        <div class="row d-flex justify-content-center justify-content-lg-center justify-content-md-center">
            <div class="col-5 col-sm-3 col-md-2 col-xl-2 col-lg-2">
                <el-button type="primary">Capture Location</el-button>
            </div>
            <div class="col-4 offset-2 col-sm-3 col-md-2 col-xl-2 col-lg-2">
                <el-button type="primary" @click="addShop()">Save</el-button>
            </div>
            <div class="col-3 col-sm-3 col-md-2 col-xl-2 col-lg-2">
                <el-button type="primary">Save And Order</el-button>
            </div>
        </div>

    </div>
</template>

<script>

    /* eslint-disable */

    import {addShop} from "@/api/ffaEndPoints";
    import {showErrorDialog, showSuccessDialog} from "@/commons/commons";

    export default {
        name: "addStore",
        data() {
            return {
                shopName: null,
                street: null,
                addressLine1: null,
                addressLine2: null,
                phoneNumber: null,
                type1: 'GOI',
                type2: 'Executive Basic'
            }
        },
        methods: {

            addShop() {
                let data = this.buildDataForAddShopRequest();
                addShop(data).then(res=>{
                    if(res.data.success){
                        showSuccessDialog(this.$swal, "Shop added successfully");
                    }
                }).catch(err=>{
                    showErrorDialog(this.$swal, err.message)
                })
            },

            buildDataForAddShopRequest() {
                let data = {};
                data.name = this.shopName;
                data.street = this.street;
                data.addressLine1 = this.addressLine1;
                data.addressLine2 = this.addressLine2;
                data.type1 = this.type1;
                data.type2 = this.type2;
                data.phoneNumber = this.phoneNumber;

                return data;
            }
        }
    }
</script>

<style scoped>

</style>