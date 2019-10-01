<template>
    <div class="intro">
        <div class="inner">
            <div class="content row">
                <div class="col" style="position: relative">
                    <el-card class="card-image" shadow="always">
                        <div class="hover-card form-header rounded text-center above">
                            <h3><i class="el-icon-lock text-white" aria-hidden="false"></i> <strong
                                    class="text-white">&nbsp;Login </strong></h3>
                        </div>
                        <div style="margin-top: 3rem">
                            <b-alert
                                    :show="dismissCountDown"
                                    dismissible
                                    variant="danger"
                                    @dismissed="dismissCountDown=0"
                                    @dismiss-count-down="countDownChanged">
                                <h4 class="alert-heading">
                                    Error !</h4>
                                <p>
                                    {{this.errorMessage}}
                                </p>
                            </b-alert>

                            <div class="form-control-custom">
                                <label class="grey-text" for="email">User Name</label>
                                <el-input id="email" type="text" v-model="userName">
                                </el-input>
                            </div>

                            <div class="form-control-custom">
                                <label class="grey-text" for="password">Password </label>
                                <el-input id="password" show-password v-model="password" placeholder="password"
                                          @keyup.enter.native="handleLogin()">
                                </el-input>
                            </div>

                            <div class="row d-flex justify-content-center form-control-custom">
                                <div class="">
                                    <el-button style="background: #fd7e14" round @click.native="handleLogin"
                                               :disabled="loginInProgress">
                                        <strong class="text-white">
                                            Sign in &nbsp; <i class="fa fa-sign-in" aria-hidden="false"></i>
                                            <span v-if="loginInProgress">
                                                <i class="fa fa-spinner fa-pulse fa-fw"></i>
                                            </span>
                                        </strong>
                                    </el-button>
                                </div>
                            </div>

                            <div class="footer">
                                <p>Don't Have an account?
                                    <router-link to="signup" class="font-weight-bold">
                                        Sign up
                                    </router-link>
                                </p>

                                <p>Forgot
                                    <a href="#" class="font-weight-bold">
                                        Password?
                                    </a>
                                </p>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import {addUserName, addUser} from '../../commons/localStoreFunctions'
    import {login} from "@/api/ffaEndPoints";
    import {showErrorDialog} from "@/commons/commons";

    export default {
        name: "Login",
        data() {
            return {
                userName: null,
                password: null,
                altText: 'abc',
                loginInProgress: false,
                dismissSecs: 5,
                dismissCountDown: 0,
                errorMessage: null,
            }
        },
        methods: {
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            showAlert(message) {
                this.errorMessage = message;
                this.dismissCountDown = this.dismissSecs
            },

            handleLogin() {
                if (this.validateData() === false)
                    return;

                let data = {}
                data.name = this.userName
                data.password = btoa(this.password);

                this.loginInProgress = true;
                login(data).then(res => {
                    if (res.data.success) {
                        addUserName(this.userName);
                        addUser(res.data.data);
                        this.loginInProgress = false
                        this.$router.push({name: 'home'});
                    } else {
                        this.loginInProgress = false
                        // showErrorDialog(this.$swal, res.data.errorMessage);
                        this.showAlert(res.data.errorMessage);
                    }
                }).catch(err => {
                    this.loginInProgress = false
                    // showErrorDialog(this.$swal, err.message);
                    this.showAlert(err.message);
                });
            },

            validateData() {
                let errorMessage = "";
                if (!this.userName) {
                    errorMessage += "Please Enter User Name!"
                } else if (!this.password)
                    errorMessage += "Please Enter password";
                if (errorMessage === "") {
                    return true
                }
                this.showAlert(errorMessage);
                return false;
            }
        }
    }
</script>

<style scoped>

    .hover-card {
        margin: 0 auto;
        background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
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

    .above {
        position: absolute;
        top: -1vw;
        left: 0;
        width: 90%;
        right: 0;
    }

    @media (max-width: 575.98px) {
        .content {
            width: 75%;
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