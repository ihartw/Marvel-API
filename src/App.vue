<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
  </div>
</template>

<script>
  import { key } from './config.js'
  import axios from 'axios'
  import NavBar from './components/NavBar'

  export default {
    name: 'App',
    components: {
      'nav-bar': NavBar,
    },
    data: function () {
      return {

      }
    }
  }
</script>
