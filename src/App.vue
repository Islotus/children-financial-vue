<template>
  <div id="app">
    <nav-menu class="nav-menu"></nav-menu>
    <router-view/>
    <self-footer></self-footer>
  </div>
</template>

<script>
  import NavMenu from '@/components/common/NavMenu'
  import SelfFooter from '@/components/common/Footer'

export default {
  name: 'App',
  components:{
    NavMenu, SelfFooter
  }
}
</script>

<style>
  .nav-menu {
    margin-bottom: 40px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.05);
  }
</style>
