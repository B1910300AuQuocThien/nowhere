<script>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import categoryService from './services/category.service';
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      categorys: [],
    }
  },
  methods: {
    async getCategory() {
      try {
        this.categorys = await categoryService.getAll()
        console.log(this.categorys)
      }
      catch (error) {
        console.log(error)
      }
    },

    searchProduct(text) {
      console.log(text)
    }

  },

  mounted() {
    this.getCategory()
  }
}
</script>
<template>
  <div id="app">
    <Header :categorys="categorys" @search="searchProduct"></Header>
    <div>
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>
<style></style>