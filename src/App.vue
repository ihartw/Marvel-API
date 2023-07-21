<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
  </div>
</template>

<script>
  import NavBar from './components/NavBar'

  export default {
    name: 'App',
    components: {
      'nav-bar': NavBar,
    },
    mounted() {
      this.$store.dispatch('getCharacters');
    },
    data: function () {
      return {

      }
    }
  }
</script>
