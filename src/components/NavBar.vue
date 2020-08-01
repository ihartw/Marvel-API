<template>
    <div id="nav">
      <div class="container">
        <b-row align-v="center">
          <b-col xs="6">
            <img src="../assets/images/marvel.jpg" alt="Marvel Logo" class="logo" @click="goHome">
          </b-col>
          <b-col xs="6">
            <b-form-input id="input-none" :value="input" @keyup.enter="searchCharacters" placeholder="Search">
            </b-form-input>
          </b-col>
        </b-row>
      </div>
    </div>
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
        if (this.input !== "") {
          this.$store.dispatch('searchCharacters', this.input);
        } else {
          this.$store.dispatch('getCharacters');
        }
        this.$router.push("/").catch(()=>{});
      }
    }
  }
</script>
