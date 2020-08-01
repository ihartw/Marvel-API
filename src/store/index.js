import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { key } from '../config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    characters: [],
    allCharacters: [],
    characterExists: true,
    loading: false,
    search: '',
    url: 'https://gateway.marvel.com/v1/public/characters'
  },
  mutations: {
    getCharacters(state) {
      state.loading = true;
      state.characters = [];
      state.allCharacters = [];
      axios.all([
        axios.get(`${state.url}${key}&limit=100&offset=0`),
        axios.get(`${state.url}${key}&limit=100&offset=100`),
        axios.get(`${state.url}${key}&limit=100&offset=200`),
        axios.get(`${state.url}${key}&limit=100&offset=300`),
        axios.get(`${state.url}${key}&limit=100&offset=400`),
        axios.get(`${state.url}${key}&limit=100&offset=500`),
        axios.get(`${state.url}${key}&limit=100&offset=600`),
        axios.get(`${state.url}${key}&limit=100&offset=700`),
        axios.get(`${state.url}${key}&limit=100&offset=800`),
        axios.get(`${state.url}${key}&limit=100&offset=900`),
        axios.get(`${state.url}${key}&limit=100&offset=1000`),
      ])
      .then((response) => {
        response.forEach((item, i) => {
          state.characters.push(response[i].data.data.results);
          state.characterExists = true;
        });
        state.allCharacters = state.characters.flat(Infinity);
        state.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchCharacters(state, search) {
      axios.get(`${state.url}${key}&name=${search}`)
      .then((response) => {
        let results = response.data.data.results;
        state.characters = [];
        state.allCharacters = [];

        results.forEach((item, i) => {
          state.allCharacters.push(results[i]);
          state.characterExists = true;
        });
        
        if (state.allCharacters.length === 0) {
          state.characterExists = false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }  
  },
  actions: {
    getCharacters(context) {
      context.commit('getCharacters');
    },
    searchCharacters(context, search) {
      context.commit('searchCharacters', search);
    }
  },
  modules: {
  }
})
