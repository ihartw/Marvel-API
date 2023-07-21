import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { key } from '../config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allCharacters: [],
    searchCharacters: [],
    character: [],
    loading: true,
    search: '',
  },
  mutations: {
    async getCharacters(state) {
      state.loading = true;
      const offsetValues = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400];
      const combinedCharacters = [];
    
      for (const offset of offsetValues) {
        try {
          const response = await axios.get(`http://gateway.marvel.com/v1/public/characters${key}&limit=100&offset=${offset}`);
          const moreCharacters = response.data.data.results;
          combinedCharacters.push(...moreCharacters);
          state.allCharacters = combinedCharacters;
          state.searchCharacters = combinedCharacters;
        } catch (error) {
          console.log(error);
        }
      }
      state.loading = false;
    },
    searchCharacters(state, search) {
      const lowerSearchQuery = search.toLowerCase();
      if(search === "") {
        state.searchCharacters = state.allCharacters;
      } else {
        const filteredCharacters = state.allCharacters.filter(item => item.name.toLowerCase().startsWith(lowerSearchQuery));
        state.searchCharacters = filteredCharacters;
      }
    },
  },
  actions: {
    getCharacters(context) {
      context.commit('getCharacters');
    },
    searchCharacters(context, search) {
      context.commit('searchCharacters', search);
    },
  },
})
