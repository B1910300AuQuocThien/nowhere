<script>
import adminview from './views/admin/adminview.vue';
import Header from './components/Header.vue';
import categoryService from './services/category.service';
export default {
  components: {
    Header
  },
  data() {
    return {
      categorys: []
    }
  },

  methods: {
    async getCategory() {
      try {
        this.categorys = await categoryService.getAll()
      }
      catch (error) {
        console.log(error)
      }
    }
  },

  mounted() {
    this.getCategory()
  }
}
</script>
<template>
  <div id="app">
    <Header :categorys="categorys"></Header>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<style></style>