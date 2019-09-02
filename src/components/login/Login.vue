<template>
    <section class="intro">
        <div class="inner">
            <div class="content row">
                <div class="col">
                    <el-card class="card-image" shadow="always">
                        <div class="hover-card form-header rounded">
                            <div class="d-flex justify-content-center">
                                <h3><i class="el-icon-lock text-white" aria-hidden="false"></i> <strong
                                        class="text-white">&nbsp;Login </strong></h3>
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
                                <el-input id="password" :type="pwdType" v-model="password" placeholder="password"
                                          @keyup.enter.native="handleLogin()">
                                        <el-button slot="append" type="primary" class="show-pwd" @click.native="showPwd()" style="background: none">
                                            <i :class="iconClass" aria-hidden="false" ></i>
                                        </el-button>
                                </el-input>
                            </div>

                            <link rel="stylesheet"
                                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                            <div class="row d-flex justify-content-center form-control-custom">
                                <div class="">
<!--                                    <el-button style="background: #fd7e14" round class="btn-block z-depth-1 text-white" >-->
                                    <el-button style="background: #fd7e14" round @click.native="handleLogin" >
                                        <strong class="text-white">Sign in &nbsp; <i class="fa fa-sign-in" aria-hidden="false"></i></strong>
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
    </section>
</template>

<script>
    /* eslint-disable */
    import {addUserName} from '../../commons/localStoreFunctions'
    export default {
        name: "Login",
        data() {
            return {
                userName: null,
                password: null,
                pwdType:'password',
                iconClass: 'fa fa-eye',
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
            handleLogin(){
                // validate userName

                addUserName(this.userName);
                this.$router.push({ name: 'home'});

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