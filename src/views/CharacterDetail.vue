<template>
  <div class="details">
    <b-row class="hero">
      <b-col align-self="end">
        <b-col lg="4" class="p-4 bg-secondary text-light text-center">
          <h1>{{ this.$route.params.title }}</h1>
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
            <h3 class="w-100">Description</h3>
            <p class="w-100">{{ character_desc }}</p>
          </b-row>
          <b-row class="p-5">
            <h3 class="w-100">Story</h3>
            <b-spinner label="Spinning" v-if="storyLoading"></b-spinner>
            <p>{{ story }}</p>
          </b-row>
        </b-col>
        <b-col sm="4" class="related">
          <b-row class="p-4">
            <h3 class="w-100">Related Characters</h3>
            <b-spinner label="Spinning" v-if="relatedLoading"></b-spinner>
            <p class="w-100" v-for="relatedChar in relatedChars.slice(0, 4)" :key="relatedChar.id">
              {{ relatedChar.name }}</p>
          </b-row>
          <b-row class="p-4">
            <h3 class="w-100">Series</h3>
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
        character_desc: '',
        story: '',
        relatedChars: [],
        series: [],
        imgLoading: false,
        storyLoading: false,
        relatedLoading: false,
        seriesLoading: false
      }
    },
    mounted: function () {
      this.imgLoading = true;
      this.storyLoading = true;
      this.relatedLoading = true;
      this.seriesLoading = true;
      this.character_desc = this.$route.params.description;
      let characterId = this.$route.params.id;
      const characterUrl = `https://gateway.marvel.com/v1/public/characters${key}&id=${characterId}`;
      const relatedUrl = `http://gateway.marvel.com/v1/public/characters/${characterId}/series${key}`;
      const storyUrl = `http://gateway.marvel.com/v1/public/characters/${characterId}/stories${key}`;

      // Character request
      axios.get(characterUrl)
        .then((response) => {
          let results = response.data.data.results;
          results.forEach(element => {
            this.character.push(element);
            this.img_src = `${element.thumbnail.path}/${this.img_size}`
          });
          console.log(this.character);
          if (this.character_desc === "") {
            this.character_desc = 'Description Unavailable';
          }
          this.imgLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });

      // Related request
      axios.get(relatedUrl)
        .then((response) => {
          let relatedResults = response.data.data.results[0].characters.items;
          for (let i = 0; i < relatedResults.length; i++) {
            this.relatedChars.push(relatedResults[i]);
            // console.log(relatedResults[i].resourceURI.split('/').pop());
          }
          this.relatedLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });

      // Series request
      axios.get(relatedUrl)
        .then((response) => {
          let seriesResults = response.data.data.results;
          for (let i = 0; i < seriesResults.length; i++) {
            this.series.push(seriesResults[i]);
          }
          this.seriesLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });


      // Stories request
      axios.get(storyUrl)
        .then((response) => {
          let results = response.data.data.results;
          this.story = results[0].description;
          if (this.story === "") {
            this.story = 'Story Unavilable';
          }
          this.storyLoading = false;
        })
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
