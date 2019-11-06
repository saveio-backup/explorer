<template>
  <div id="app">
    <header-component></header-component>
    <!-- <new-header>
    </new-header> -->
    <router-view/>
    <footer-component></footer-component>
  </div>
</template>

<script>
import headerComponent from './../src/components/HeaderComponent';
// import newHeader from './../src/components/newHeader';
import footerComponent from './../src/components/footerComponent';
// import newFooter from './../src/components/newFooter';
export default {
  name: 'App',
  components: {
    headerComponent,
    footerComponent,
    // newHeader,
    // newFooter
  }
}
</script>

<style lang="scss">
@import './assets/css/style.scss';
#app {
  width: 100%;
  height: auto;
  min-height: 100%;
  background: rgba(32, 32, 32, 1);
  // box-sizing: border-box;
}
</style>
