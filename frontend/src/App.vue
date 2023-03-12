<script>
import adminview from './views/admin/adminview.vue';
import Header from './components/Header.vue';
export default {
  components: {
    Header
  }
}
</script>
<template>
  <div id="app">
    <Header></Header>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<style></style>