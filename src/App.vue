<template>
  <div id="app">
    <MainWrapper />
  </div>
</template>

<script>
import MainWrapper from "./layout/layout";

export default {
  name: "App",
  components: {
    MainWrapper,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
