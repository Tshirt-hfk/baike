<template>
  <div id="app">
    <myHeader/>
    <router-view/>
  </div>
</template>

<script>
import myHeader from './components/myHeader.vue'

export default {
  name: 'app',
  components:{
    myHeader
  }
}
</script>

<style>
html,body,#app{
 		height: 100%;
 		width: 100%;
}
</style>