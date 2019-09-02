<template>
    <div>
        <nav class="navbar navbar-light" style="background-color: #e3f2fd;">

            <a v-if="drawer" @click="closeNav()" style="margin-left: 1vw;color: #000;font-size: large">
                <i class="el-icon-s-fold"></i>
            </a>
            <a v-else @click="openNav()" style="margin-left: 1vw;color: #000;font-size: large">
                <i class="el-icon-s-unfold"></i>
            </a>

            <span class="navbar-text has-text-weight-bold">
                Field Force Automation
            </span>

            <link rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

            <el-dropdown trigger="click" style="color: black">

                <span class="el-dropdown-link">
                {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>

                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-circle-plus">Action 2</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </nav>

        <div id="mySidenav" class="sidenav">
            <div class="row">
                <div class="col-6 col-sm-6 col-md-6" style="margin-left: 1vw;font-size: 20px">
                    <el-avatar style="background-color: purple">{{this.avtarText}}</el-avatar>
                </div>
                <div class="col-3">
                    <a href="javascript:void(0)" style="float: right" class="closebtn" @click="closeNav()"
                       id="#closeButton">
                        &times;</a>
                </div>
            </div>

            <router-link to="metrics" @click.native="closeNav()">
                <i class="fa fa-chart-line"></i>&nbsp;Metrics
            </router-link>
            <router-link to="store" @click.native="closeNav()">
                <i class="el-icon-office-building"></i>&nbsp;Add New Shop
            </router-link>
        </div>

    </div>
</template>

<script>

    import {routes} from "@/router/index"

    export default {
        name: "navbar",
        data() {
            return {
                drawer: false,
                direction: 'ltr',
                name: null,
                size: "20%",
                avtarText: null,
                routes
            }
        },
        methods: {
            handleClose() {
                this.drawer = false
            },
            openNav() {
                document.getElementById("mySidenav").style.width = "250px";
                document.getElementById("main").style.marginLeft = "260px";
                this.drawer = true
            },
            closeNav() {
                document.getElementById("mySidenav").style.width = "0";
                document.getElementById("main").style.marginLeft = "1vw";
                this.drawer = false
            }
        },
        mounted() {
            if (localStorage.username) {
                this.name = localStorage.username;
                this.avtarText = this.name.charAt(0).toUpperCase();
            }
        },

    }
</script>

<style scoped>

    .sidenav {
        height: 100%;
        width: 0;
        margin-top: 3.5rem;
        position: fixed;
        z-index: 2016;
        top: 0;
        left: 0;
        background: #545c64;
        color: #fff;
        overflow-x: hidden;
        overflow-y: scroll;
        transition: all 0.25s;
        align-items: stretch;
    }

    .sidenav a {
        padding: 6px 8px 6px 16px;
        text-decoration: none;
        font-size: 25px;
        color: #fff;
        display: block;
    }

    .sidenav .closebtn {
        position: absolute;
        top: 0;
        font-size: 36px;
        margin-left: 50px;
    }

    .sidenav a:hover:not(.closebtn):not(.router-link-active):not(.router-link-exact-active) {
        color: #ffd04b;
    }

    .router-link-active {
        color: #fff;
        background: #409eff;
    }

    .sidebar li.active > a {
        color: #409eff;
    }
</style>