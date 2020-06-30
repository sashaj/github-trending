<template>
  <div class="main-wrapper">
    <MainPage></MainPage>
  </div>
</template>

<script>
import MainPage from "../pages/main-page.vue";

export default {
  name: "main-wrapper",
  components: {
    MainPage,
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
