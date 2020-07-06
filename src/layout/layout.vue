<template>
  <div class="main-wrapper">
    <Header></Header>
    <MainPage></MainPage>
    <Footer></Footer>
  </div>
</template>

<script>
import MainPage from "../pages/main-page.vue";
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";

export default {
  name: "layout",
  components: {
    MainPage,
    Header,
    Footer
  },
  data: function() {
    return {
      title: "Main wrapper",
    };
  },
};
</script>

<style scoped>
.main-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 82px;
  margin: 0 auto;
  flex-direction: column;
  max-width: 1200px;
}
</style>
