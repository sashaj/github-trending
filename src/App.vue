<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import Layout from "./layout/layout";

export default {
  name: "App",
  components: {
    Layout,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
a {
  color: #0366d6;
}
body,
html {
  overflow: auto;
}
</style>
