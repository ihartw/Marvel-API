<template>
  <div>
    <b-navbar toggleable type="dark" variant="dark" id="nav" class="sticky-top">
      <b-navbar-brand href="#" v-b-tooltip.hover.right title="Home">
        <img src="../assets/images/marvel.jpg" alt="Marvel Logo" @click="goHome" width="150">
      </b-navbar-brand>
      <b-form-input 
        v-if="!this.$route.path.includes('CharacterDetail')"
        class="mr-sm-2 search-bar" 
        @input="searchCharacters" 
        v-model="input" 
        placeholder="Search" 
        type="text">
      </b-form-input>
    </b-navbar>
    <b-button @click="scrollToTop" class="m-3 fixed-bottom" v-b-tooltip.hover title="Back to Top">
      <b-icon icon="arrow-up" font-scale="2.5" variant="light"></b-icon>
    </b-button>
  </div>
</template>

<script>
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
        search: state => state.search,
        loading: state => state.loading
      }),
    },
    methods: {
      goHome() {
        this.$router.push("/");
      },
      searchCharacters() {
        this.$store.dispatch('searchCharacters', this.input);
      },
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .search-bar {
    width: 50%;
  }
  .fixed-bottom {
    width: 65px;
    opacity: .8;
  }
  @media(max-width: 350px) {
    .navbar-brand, .search-bar {
      margin: 10px auto;
    }
  }
</style>
