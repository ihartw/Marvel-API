<template>
  <div class="details">
    <b-row class="hero">
      <b-col align-self="end">
        <b-col lg="4" class="p-4 bg-secondary text-light text-center">
          <h1>{{ character_name }}</h1>
        </b-col>
      </b-col>
    </b-row>
    <b-container fluid>
      <b-row>
        <b-col sm="8">
          <b-row class="p-5">
            <b-spinner label="Spinning" v-if="imgLoading"></b-spinner>
            <b-img :src="img_src" rounded="circle" :alt="`Image of ${this.$route.params.title}`"></b-img>
          </b-row>
          <b-row class="p-5">
            <h2 class="w-100">Description</h2>
            <p class="w-100">{{ character_desc }}</p>
          </b-row>
          <b-row class="p-5">
            <h2 class="w-100">Story</h2>
            <b-spinner label="Spinning" v-if="storyLoading"></b-spinner>
            <p>{{ story }}</p>
          </b-row>
        </b-col>
        <b-col sm="4" class="related">
          <b-row class="p-4">
            <h2 class="w-100">Related Characters</h2>
            <b-spinner label="Spinning" v-if="relatedLoading"></b-spinner>
            <p class="w-100" v-for="relatedChar in relatedChars.slice(0, 4)" :key="relatedChar.id">
              {{ relatedChar.name }}</p>
          </b-row>
          <b-row class="p-4">
            <h2 class="w-100">Series</h2>
            <b-spinner label="Spinning" v-if="seriesLoading"></b-spinner>
            <p class="w-100" v-for="serie in series.slice(0, 3)" :key="serie.id">{{ serie.title }}</p>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import { key } from '../config.js'
  import axios from 'axios'

  export default {
    name: 'CharacterDetail',
    data: function () {
      return {
        img_src: '',
        img_size: 'standard_xlarge.jpg',
        character: [],
        character_name: '',
        character_desc: '',
        story: '',
        relatedChars: [],
        series: [],
        imgLoading: false,
        storyLoading: false,
        relatedLoading: false,
        seriesLoading: false,
        characterId: this.$route.params.id
      }
    },
    methods: {
      getCharacter: async function() {
        try {
          const characterData = await axios.get(`https://gateway.marvel.com/v1/public/characters${key}&id=${this.characterId}`);
          return characterData;
        } catch(error) {
          console.log(error);
        }
      },
      getRelated: async function() {
        try {
          const relatedData = await axios.get(`http://gateway.marvel.com/v1/public/characters/${this.characterId}/series${key}`);
          return relatedData;
        } catch(error) {
          console.log(error);
        }
      },
      getStory: async function() {
        try {
          const storyData = await axios.get(`http://gateway.marvel.com/v1/public/characters/${this.characterId}/stories${key}`);
          return storyData;
        } catch(error) {
          console.log(error);
        }
      }
    },
    mounted: function () {
      this.imgLoading = true;
      this.storyLoading = true;
      this.relatedLoading = true;
      this.seriesLoading = true;
      this.character_desc = this.$route.params.description;

      axios.all([
        this.getCharacter(),
        this.getRelated(),
        this.getStory()
      ])
      .then(axios.spread((characterResponse, relatedResponse, storyResponse) => {

        characterResponse = characterResponse.data.data.results;
        relatedResponse = relatedResponse.data.data.results[0].characters.items;
        storyResponse = storyResponse.data.data.results;

        // Character response
        characterResponse.forEach(element => {
          this.character.push(element);
          this.img_src = `${element.thumbnail.path}/${this.img_size}`
        });
        if (this.character_desc === "") {
          this.character_desc = 'Description Unavailable';
        } else {
          this.character_desc = this.character[0].description;
        }
        this.character_name = this.character[0].name;
        console.log(this.character);

        // Related response
        for (let i = 0; i < relatedResponse.length; i++) {
          this.relatedChars.push(relatedResponse[i]);
          // console.log(relatedResults[i].resourceURI.split('/').pop());
        }

        // Story response
        for (let i = 0; i < storyResponse.length; i++) {
          this.series.push(storyResponse[i]);
        }

        this.story = storyResponse[0].description;
        if (this.story === "") {
          this.story = 'Story Unavilable';
        }

        // Hide preloaders
        this.imgLoading = false;
        this.storyLoading = false;
        this.relatedLoading = false;
        this.seriesLoading = false;

      }))
      .catch((error) => {
        console.log(error);
      });
    }
  }
</script>

<style scoped lang="scss">
  .hero {
    height: 300px;
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('../assets/images/bg-collage.jpg');
    background-position: center;
    background-size: cover;
    margin: auto;
  }

  .related {
    background-color: lightgrey;
  }
</style>
