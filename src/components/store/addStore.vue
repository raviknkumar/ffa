<template>
    <div style="margin-left: 2vw;">
        <div class="row d-flex justify-content-center" style="margin-top: 1vh">
            <h5>ADD A SHOP</h5>
        </div>

        <div class="row form-group required">
            <label class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3 control-label">
                Shop Name
            </label>
            <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                <el-input v-model="shopName" placeholder="enter shopname"></el-input>
            </div>
        </div>

        <div class="row form-group required">
            <label class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3 control-label">
                Street Located
            </label>
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
        </div>

        <div class="row">

            <div class="col-9 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                <a-select v-model="type1" placeholder="select type" showSearch optionFilterProp="children"
                          style="width: 200px" :filterOption="filterOption"
                          notFoundContent="No type Found">
                    <a-select-option value="GOI">GOI</a-select-option>
                    <a-select-option value="GSS">GSS</a-select-option>
                    <a-select-option value="GOT">GOT</a-select-option>
                    <a-select-option value="GFW">GFW</a-select-option>
                    <a-select-option value="GGS">GGS</a-select-option>
                    <a-select-option value="GMS">GMS</a-select-option>
                    <a-select-option value="GGK">GGK</a-select-option>
                    <a-select-option value="GFS">GFS</a-select-option>
                    <a-select-option value="GPETYS">GPETTYS</a-select-option>
                    <a-select-option value="GPS">GPS</a-select-option>
                    <a-select-option value="SELF SERVICE">SELF SERVICE</a-select-option>
                    <a-select-option value="GDC">GCDC</a-select-option>
                    <a-select-option value="GFO">GFO</a-select-option>
                    <a-select-option value="GCC">GCC</a-select-option>
                    <a-select-option value="GLB">GLB</a-select-option>
                    <a-select-option value="GTRS">GTRS</a-select-option>
                </a-select>
            </div>
        </div>

        <div class="row">
            <div class="col-9 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                <a-select v-model="type2" placeholder="select type2" showSearch optionFilterProp="children"
                          style="width: 200px" :filterOption="filterOption"
                          notFoundContent="No type Found">
                    <a-select-option value="Executive Basic">Executive Basic</a-select-option>
                    <a-select-option value="Executive">Executive</a-select-option>
                    <a-select-option value="Signature">Signature</a-select-option>
                    <a-select-option value="Premium">Premium</a-select-option>
                    <a-select-option value="Vintage">Vintage</a-select-option>
                    <a-select-option value="FirstBusiness">First Business</a-select-option>
                </a-select>
            </div>
        </div>

        <div class="row form-group required">
            <label class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3 control-label">
                Address Line 1
            </label>
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

        <div class="row form-group required">
            <label class="col-8 col-sm-5 col-md-3 col-xl-3 col-lg-3 control-label">
                Phone Number
            </label>
            <div class="col-10 col-sm-5 col-md-5 col-xl-5 col-lg-5">
                <el-input type="tel" v-model="phoneNumber" placeholder="Phone number"></el-input>
            </div>
        </div>

        <div class="row d-flex justify-content-center justify-content-lg-center justify-content-md-center">
<!--            <div class="col-5 col-sm-3 col-md-2 col-xl-2 col-lg-2">-->
<!--                <el-button type="primary">Capture Location</el-button>-->
<!--            </div>-->
            <div class="col-4 offset-2 col-sm-3 col-md-2 col-xl-2 col-lg-2">
                <el-button type="primary" @click="addShop()">Save</el-button>
            </div>
<!--            <div class="col-3 col-sm-3 col-md-2 col-xl-2 col-lg-2">-->
<!--                <el-button type="primary">Save And Order</el-button>-->
<!--            </div>-->
        </div>

    </div>
</template>

<script>

    /* eslint-disable */

    import {addShop} from "@/api/ffaEndPoints";
    import {showErrorDialog, showSuccessDialog, showWarningDialog} from "@/commons/commons";

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
                type2: 'Executive Basic',
                errorMessage:null,
            }
        },
        methods: {

            addShop() {
                if(this.validateShop() === false)
                    return;

                let data = this.buildDataForAddShopRequest();
                addShop(data).then(res => {
                    if (res.data.success) {
                        showSuccessDialog(this.$swal, "Shop added successfully");
                        this.clearData();
                        this.$emit('addData', null);

                    }
                }).catch(err => {
                    showErrorDialog(this.$swal, err.message)
                })
            },

            validateShop(){
                let errorMessage = null
                if(this.shopName == null )
                    errorMessage = "please enter shopName";
                else if(this.street == null)
                    errorMessage = "please enter street";
                else if(this.addressLine1 == null)
                    errorMessage = "please enter Address Line 1";
                else if (this.phoneNumber == null)
                    errorMessage = "please enter phone Number";
                if(errorMessage == null){
                    return true;
                }
                else {
                    showWarningDialog(this.$swal, errorMessage);
                    return false;
                }
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
            },

            clearData() {
                this.shopName = null,
                this.street = null;
                this.addressLine1 = null;
                this.addressLine2 = null;
                this.phoneNumber = null;
                this.type1 = 'GOI';
                this.type2 = 'Executive Basic'
            },

            filterOption(input, option) {
                return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            },
        }
    }
</script>

<style scoped>
    .form-group.required .control-label:after {
        content:"*";
        color:red;
        font-size: 20px;
    }
</style>