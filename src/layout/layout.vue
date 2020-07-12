<template>
  <div class="page-wrapper">
    <vHeader></vHeader>
    <div class="content-wrapper">
      <MainPage></MainPage>
    </div>
    <vFooter></vFooter>
  </div>
</template>

<script>
import MainPage from "../pages/main-page.vue";
import vHeader from "../components/v-header.vue";
import vFooter from "../components/v-footer.vue";

export default {
  name: "layout",
  components: {
    MainPage,
    vHeader,
    vFooter,
  },
  data: function() {
    return {
      title: "Main wrapper",
    };
  },
};
</script>

<style>
.content-wrapper {
  display: flex;
  align-items: center;
  padding-top: 82px;
  margin: 0 auto;
  flex-direction: column;
  max-width: 1200px;
  margin-bottom: 40px;
}
.page-wrapper {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
