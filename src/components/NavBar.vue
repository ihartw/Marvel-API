<template>
  <b-navbar toggleable type="dark" variant="dark" id="nav" class="sticky-top">
    <b-navbar-brand href="#" v-b-tooltip.hover.right title="All Characters"><img src="../assets/images/marvel.jpg" alt="Marvel Logo" @click="goHome" width="150"></b-navbar-brand>
    <b-form-input class="mr-sm-2 search-bar" :value="input" @keyup.enter="searchCharacters" placeholder="Search"></b-form-input>
  </b-navbar>
</template>

<script>
  import { key } from '../config.js'
  import axios from 'axios'
  import { mapState } from 'vuex'

  export default {
    name: 'NavBar',
    data: function () {
      return {
        input: ''
      }
    },
    computed: {
      ...mapState({
        characters: state => state.characters,
        search: state => state.search
      })
    },
    methods: {
      goHome: function(event) {
        this.$store.dispatch('getCharacters').then(() => {
          this.$router.push("/").catch(()=>{});
        });
      },
      searchCharacters: function(event) {
        this.input = event.target.value;
        this.$router.push("/").catch(()=>{});
        if (this.input !== "") {
          this.$store.dispatch('searchCharacters', this.input);
        } else {
          this.$store.dispatch('getCharacters');
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .search-bar {
    width: 50%;
  }
  @media(max-width: 350px) {
    .navbar-brand, .search-bar {
      margin: 10px auto;
    }
    
  }
</style>
