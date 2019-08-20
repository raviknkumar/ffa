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
                <h3 class="col-6" style="margin-left: 1vw">Sidenav</h3>
                <div class="col-3">
                    <a href="javascript:void(0)" style="float: right" class="closebtn" @click="closeNav()" id="#closeButton">
                        &times;</a>
                </div>
            </div>

            <a href="#">About</a>
            <a href="#">Services</a>
            <router-link to="metrics" @click.native="closeNav()">
                <i class=""></i>&nbsp;Metrics
            </router-link>
            <router-link to="addStore" @click.native="closeNav()">
                <i class="el-icon-office-building"></i>&nbsp;Add New Shop
            </router-link>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
        </div>

    </div>
</template>

<script>

    import { routes } from "@/router/index"

    export default {
        name: "navbar",
        data() {
            return {
                drawer: false,
                direction: 'ltr',
                name: null,
                size:"20%",
                routes
            }
        },
        methods: {
            handleClose() {
                this.drawer = false
            },
            openNav() {
                document.getElementById("mySidenav").style.width = "250px";
                this.drawer = true
            },
            closeNav() {
                document.getElementById("mySidenav").style.width = "0";
                this.drawer = false
            }
        },
        mounted() {
            if (localStorage.username) {
                this.name = localStorage.username;
            }
            // eslint-disable-next-line no-console
            console.log(routes)
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

    @media (max-width: 575.98px) {

        .sidenav{
            width: 70%;
        }

        .sidenav a {
            padding: 3px 3px 4px 4px;
            text-decoration: none;
            font-size: 15px;
            display: block;
            overflow: auto;
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