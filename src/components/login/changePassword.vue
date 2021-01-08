<template>
    <div class="intro">
        <div class="inner">
            <div class="content row">
                <div class="col" style="position: relative">
                    <el-card>
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                            <div class="row form-control-custom" style="display: flex;flex-direction: column">
                                <h3 class="text-center">
<!--                                    <i class="fa fa-lock fa-3x text-center" aria-hidden="false"></i>-->
                                    <img src="https://img.icons8.com/color/100/000000/lock.png">
                                </h3>
                                <h3 class="text-center">
                                    Change Password
                                </h3>
                            </div>

                            <div class=" form-control-custom">
                                <div class="custom-label compulsary">
                                    Current Password
                                </div>
                                <el-form-item prop="currentPassword">
                                    <el-input show-password type="text" v-model="ruleForm.currentPassword"
                                              placeholder="Current Password"></el-input>
                                </el-form-item>
                            </div>

                            <div class=" form-control-custom">
                                <div class="custom-label compulsary">
                                    New Password
                                </div>
                                <el-form-item prop="newPassword">
                                    <el-input show-password v-model="ruleForm.newPassword" placeholder="New Password">
                                    </el-input>
                                </el-form-item>
                            </div>

                            <div class=" form-control-custom">
                                <div class="custom-label compulsary">
                                    Confirm Password
                                </div>
                                <el-form-item prop="confirmPassword">
                                    <el-input show-password v-model="ruleForm.confirmPassword" placeholder="Confirm New Password">
                                    </el-input>
                                </el-form-item>
                            </div>

                            <div class="row d-flex justify-content-center form-control-custom">
                                <div class="">
                                    <el-button type="success" round  @click="submitForm('ruleForm')">
                                        <strong class="text-white">
                                            Change Password &nbsp; <i class="fa fa-sign-in" aria-hidden="false"></i>
                                        </strong>
                                    </el-button>
                                </div>
                            </div>

                        </el-form>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "changePassword",
        data() {
            var confirmPassword = (rule, value, callback) => {
                if(!value){
                    return callback(new Error('Please confirm the password'));
                }
                if (!this.passwordsMatch()) {
                    return callback(new Error('New Password and Confirm Password are not same!'));
                }
                else {
                    return callback();
                }
            };

            var newPassword = (rule, value, callback) => {
                if (this.newPasswordMatchesOldPassword()) {
                    return callback(new Error('New Password cannot be same as Old Password!'));
                }
                else {
                    return callback();
                }
            };

            return {
                ruleForm: {
                    currentPassword: null,
                    newPassword: null,
                    confirmPassword: null,
                },
                rules: {
                    currentPassword: [
                        {required: true, message: 'Please enter Current password', trigger: 'blur'},
                    ],
                    newPassword: [
                        {required: true, message: 'Please enter New password', trigger: 'blur'},
                        { validator: newPassword, trigger: 'blur' }
                    ],
                    confirmPassword: [
                        { validator: confirmPassword, trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{

            passwordsMatch(){
                return this.ruleForm.confirmPassword === this.ruleForm.newPassword;
            },

            newPasswordMatchesOldPassword(){
                return this.ruleForm.newPassword === this.ruleForm.currentPassword;
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        // eslint-disable-next-line no-console
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

    .centerDiv {
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 3px;
        width: fit-content;
        transform: translate(-50%, -50%);
    }

    .hover-card {
        margin: 0 auto;
        background: linear-gradient(45deg, #1867c0 0%, #31e3fa 99%, #66b1ff 100%);
        z-index: 1;
        position: relative;
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

    .compulsary::after {
        content: '*';
        font-size: 16px;
        color: red;
        display: inline-block;
        white-space: nowrap;
    }

    .custom-label {
        width: 100%;
        padding: 10px 10px 10px 0; /* L */
    }

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

    .inner {
        display: table-cell;
        vertical-align: middle;
        width: 100%;
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

    @media (max-width: 575.98px) {
        .content {
            width: 85%;
            height: 80%;
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