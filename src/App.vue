<template>
    <div id="app">
        <navbar v-if="layout"></navbar>
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
            // eslint-disable-next-line no-console
            console.clear();
        }
    }
</script>

<style>

    #main {
        overflow: auto;
    }
</style>
