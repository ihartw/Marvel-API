import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { key } from '../config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    characters: [],
    allCharacters: [],
    character: [],
    characterExists: true,
    loading: false,
    search: '',
    url: 'https://gateway.marvel.com/v1/public/characters',
    img_src: '',
    img_size: 'standard_xlarge.jpg',
    characterId: '',
    character_desc: '',
    character_name: '',
    story: '',
    relatedChars: [],
    series: [],
    showTop: false
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
        axios.get(`${state.url}${key}&limit=100&offset=1100`),
        axios.get(`${state.url}${key}&limit=100&offset=1200`),
        axios.get(`${state.url}${key}&limit=100&offset=1300`),
        axios.get(`${state.url}${key}&limit=100&offset=1400`)

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
      state.loading = true;

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
        state.loading = false;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    getCharacterDetails(state, characterId) {
      state.loading = true;
      state.character = [];
      state.relatedChars = [];
      state.series = [];

      axios.all([
        axios.get(`${state.url}${key}&id=${state.characterId}`),
        axios.get(`${state.url}/${state.characterId}/stories${key}`)
      ])
      .then(axios.spread((characterResponse, storyResponse) => {

        characterResponse = characterResponse.data.data.results;
        storyResponse = storyResponse.data.data.results;

        // Character response
        characterResponse.forEach(item => {
          state.character.push(item);
          state.img_src = `${item.thumbnail.path}/${state.img_size}`
        });

        state.character_desc = state.character[0].description;
        state.character_name = state.character[0].name;

        state.character_desc === "" ? state.character_desc = 'Description Unavailable' : state.character_desc = state.character[0].description;

        // Story response
        for (let i = 0; i < storyResponse.length; i++) {
          state.series.push(storyResponse[i]);          
        }

        state.relatedChars = state.series[0].characters.items;
        state.story = storyResponse[0].description;
        state.story === "" ? state.story = 'Story Unavilable' : state.story = storyResponse[0].description;

        for (let i = 0; i < state.relatedChars.length; i++) {
          state.relatedChars[i].id = state.relatedChars[i].resourceURI.split("/").pop();
        }

        // Hide preloader
        state.loading = false;

      }))
      .catch((error) => {
        console.log(error);
        state.showTop = true;
        setTimeout(() => {
          state.showTop = false;
        }, 5000);
      });
    }
  },
  actions: {
    getCharacters(context) {
      context.commit('getCharacters');
    },
    searchCharacters(context, search) {
      context.commit('searchCharacters', search);
    },
    getCharacterDetails(context, characterId) {
      context.commit('getCharacterDetails', characterId);
    }
  },
  modules: {
  }
})
