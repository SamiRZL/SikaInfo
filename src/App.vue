<template>
  <NavBar />
  <router-view />
</template>

<script>
import NavBar from "./components/NavBar.vue";



export default {
  name: "App",
  components: {
    NavBar,
  }
}
</script>

<style>
* {
  font-family: Noticia Text, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  color: #323232;
}

body {
  background: #FFF7ED;
}
</style>