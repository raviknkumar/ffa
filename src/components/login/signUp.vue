<template>
    <section class="intro">
        <div class="inner">
            <div class="content row">
                <div class="col">
                    <el-card class="card-image" shadow="always">
                        <div class="hover-card form-header rounded">
                            <div class="d-flex justify-content-center">
                                <h3><i class="fa fa-lock fa-2x text-white" aria-hidden="false"></i> <strong
                                        class="text-white">&nbsp;Sign Up </strong></h3>
                            </div>
                        </div>
                        <div>
                            <div class="form-control-custom">
                                <label class="grey-text" for="email">User Name</label>
                                <el-input id="email" type="text" v-model="userName">
                                </el-input>
                            </div>

                            <div class="form-control-custom">
                                <label class="grey-text" for="password">Password </label>
                                <el-input id="password" :type="pwdType" v-model="password" placeholder="password">
                                    <el-button slot="append" type="primary" class="show-pwd" @click.native="showPwd()" style="background: none">
                                        <i :class="iconClass" aria-hidden="false" ></i>
                                    </el-button>
                                </el-input>
                            </div>

                            <div class="form-control-custom">
                                <label class="grey-text" for="password">Confirm Password </label>
                                <el-input id="conformPassword" :type="confirmPwdType" v-model="confirmPassword" placeholder="confirm password"
                                          @keyup.enter.native="signUp">
                                    <el-button slot="append" type="primary" class="show-pwd" @click.native="showConfirmPwd()" style="background: none">
                                        <i :class="confirmIconClass" aria-hidden="false" ></i>
                                    </el-button>
                                </el-input>
                            </div>

                            <div class="row d-flex justify-content-center form-control-custom">
                                <div class="">
                                    <el-button round class="btn-block z-depth-1 text-white" style="background: #1867c0" @click.native="signUp">
                                        <strong class="text-white">Sign up&nbsp; <i class="fa fa-sign-in" aria-hidden="false"></i></strong>
                                    </el-button>
                                </div>
                            </div>

                            <div class="footer">
                                <p>Have an account?
                                    <router-link to="/login" class="font-weight-bold">
                                        Sign in
                                    </router-link>
                                </p>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    /* eslint-disable */
    import {signUp} from "@/api/ffaEndPoints";
    import {addUser, addUserName} from "@/commons/localStoreFunctions";
    import {showErrorDialog, showWarningDialog} from "@/commons/commons";

    export default {
        name: "signUp",
        data() {
            return {
                userName: null,
                password: null,
                confirmPassword:null,
                pwdType:'password',
                confirmPwdType:'password',
                iconClass: 'fa fa-eye',
                confirmIconClass: 'fa fa-eye',
                altText:'abc'
            }
        },
        methods: {
            showPwd(){
                if(this.pwdType === 'password'){
                    this.pwdType = 'text'
                    this.iconClass = 'fa fa-eye-slash'

                }
                else {
                    this.pwdType = 'password'
                    this.iconClass = 'fa fa-eye'
                }
            },

            showConfirmPwd(){
                if(this.confirmPwdType === 'password'){
                    this.confirmPwdType = 'text'
                    this.confirmIconClass = 'fa fa-eye-slash'

                }
                else {
                    this.confirmPwdType = 'password'
                    this.confirmIconClass = 'fa fa-eye'
                }
            },

            signUp() {
                let valid = this.validateData();
                if (valid) {
                    let data = {}
                    data.name = this.userName;
                    data.password = btoa(this.password)
                    signUp(data).then(res => {
                        if (res.data.success) {
                            addUserName(this.userName)
                            addUser(res.data.data)
                            this.$router.push({name: 'home'});
                        } else {
                            showErrorDialog(this.$swal, res.data.errorMessage);
                        }
                    }).catch(err => {
                        showErrorDialog(this.$swal, err.message);
                    });
                }
            },

            validateData(){
                if(this.password === this.confirmPassword)
                    return true;
                else {
                    showWarningDialog(this.$swal, "Password is not same as confirm password, please check")
                    return false;
                }
            }
        }
    }
</script>

<style scoped>

    .hover-card {
        margin: 0 auto;
        background: linear-gradient(45deg, #1867c0 0%, #31e3fa 99%, #66b1ff 100%);
        z-index: 1;
        position: relative;
    }

    .form-header {
        box-shadow: 0 5px 11px 0 rgba(0, 0, 0, .18), 0 4px 15px 0 rgba(0, 0, 0, .15);
        color: #fff;
        text-align: center;
        margin-top: -1rem;
        margin-bottom: 2rem;
        padding: 1rem;
        border-radius: .125rem;
        overflow: visible;
        position: relative;
        z-index: 2;
    }

    .rounded {
        border-radius: .25rem !important;
    }

    .inner {
        display: table-cell;
        vertical-align: middle;
        width: 100%;
    }

    .grey-text {
        color: #9e9e9e !important;
    }

    .intro {
        display: table;
        height: 100%;
        width: 100%;
    }

    .form-control-custom {
        margin-top: 1vh;
        margin-bottom: 1vh;
        padding: 5px;
    }

    .footer {
        float: end;
        padding: 1rem;
        border-top: 1px solid #dee2e6;
        border-bottom-right-radius: .3rem;
        border-bottom-left-radius: .3rem;
        width: 100%;
    }


    @media (max-width: 575.98px) {
        .content {
            width: 90%;
            height: 75%;
            margin: auto;
        }
    }

    /* Small devices (landscape phones, 576px and up) */
    @media (min-width: 576px) and (max-width: 767.98px) {
        .content {
            width: 75%;
            height: 75%;
            margin: auto;
        }
    }

    /* Medium devices (tablets, 768px and up) */
    @media (min-width: 768px) and (max-width: 991.98px) {
        .content {
            width: 75%;
            height: 75%;
            margin: auto;
        }
    }

    /*Large devices (desktops, 992px and up)*/
    @media (min-width: 992px) and (max-width: 1199.98px) {
        .content {
            width: 50%;
            height: 50%;
            margin: auto;
        }
    }

    /*Extra large devices (large desktops, 1200px and up)*/
    @media (min-width: 1200px) {
        .content {
            width: 50%;
            height: 50%;
            margin: auto;
        }
    }


</style>