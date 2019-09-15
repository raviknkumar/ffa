<template>
    <div id="app">
        <navbar id="myNavbar" v-if="layout"></navbar>
        <transition>
            <router-view id="main" style="margin-left: 1vw"/>
        </transition>
    </div>
</template>

<script>

    import navbar from "@/components/navbar";

    export default {
        name: 'app',
        components: {
            navbar
        },
        computed: {
            layout() {
                if (this.$route.meta.layout !== 'no-navbar')
                    return true
                else
                    return false
            }
        },
        mounted(){

        }
    }
</script>

<style>

    #main {
        overflow: auto;
        margin-top: 4.0rem;
    }
</style>
