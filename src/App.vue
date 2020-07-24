<template>
  <div id="app">
    <div id="nav">
      <div class="container">
        <b-row align-v="center">
          <b-col xs="6">
            <router-link to="/">
              <img src="./assets/images/marvel.jpg" alt="Marvel Logo" class="logo">
            </router-link>
          </b-col>
          <b-col xs="6">
            <b-form-input id="input-none" :value="input" @keyup.enter="searchCharacters" :state="null" placeholder="Search">
            </b-form-input>
          </b-col>
        </b-row>
      </div>
    </div>
    <router-view :input='input' :characters="characters" :characterExists="characterExists" />
  </div>
</template>

<script>
  import { key } from './config.js'
  import axios from 'axios'

  export default {
    name: 'App',
    props: ['userInput'],
    data: function () {
      return {
        input: '',
        characters: [],
        characterExists: true,
      }
    },
    methods: {
      searchCharacters: function (event) {
        this.input = event.target.value;
        let search = this.input;

        axios.get(`https://gateway.marvel.com/v1/public/characters${key}&name=${search}`)
          .then((response) => {
            let results = response.data.data.results;
            this.characters = [];

            results.forEach((item, i) => {
              this.characters.push(results[i]);
              this.characterExists = true;
            });
            
            if (this.characters.length === 0) {
              this.characterExists = false;
            }
            if (this.$route.path !== `/`) {
              this.$router.push(`/`);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }
</script>
