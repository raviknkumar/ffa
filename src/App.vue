<template>
  <div id="app" >
    <navbar v-if="layout"></navbar>
    <router-view id="main" style="margin-left: 1vw"/>
  </div>
</template>

<script>

import navbar from "@/components/navbar";
export default {
  name: 'app',
  components: {
    navbar
  },
  computed:{
    layout(){
      if(this.$route.meta.layout !== 'no-navbar')
        return true
      else
        return false
    }
  }
}
</script>

<style>

  #main{
    overflow: auto;
  }
</style>
