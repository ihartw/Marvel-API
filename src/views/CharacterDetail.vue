<template>
  <div class="details" id="details">
    <b-row class="hero">
      <b-col sm="12" align-self="center">
        <div class="text-center">
          <b-spinner style="width: 3rem; height: 3rem;" variant="light" type="grow" label="Loading..." v-if="loading"/>
          <h1 class="text-center text-white display-4" v-if="!loading">{{ character.name }}</h1>
        </div>
      </b-col>
    </b-row>
    <b-container fluid>
      <b-row>
        <b-col sm="4" class="mb-5">
          <b-row class="p-4">
            <b-img class="w-100" :src="img_src"/>
          </b-row>
          <b-row class="px-4">
            <h2 class="w-100">Backstory</h2>
            <p class="w-100">{{ description ? description : "Backstory is unavailable" }}</p>
          </b-row>
          <b-row class="px-4 mb-5">
            <h2 class="w-100">Related Characters</h2>
            <div class="w-100" v-for="character in relatedCharacters" :key="character.id">
              <b-link @click="viewCharacter(character.resourceURI)">{{character.name}}</b-link>
            </div>
          </b-row>
        </b-col>
        <b-col sm="8" class="related">
          <b-row class="p-4">
            <h2 class="w-100">Comics</h2>
            <b-container v-if="!loading" class="text-center">
              <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="5">
                <b-col md v-for="comic in comics" :key="comic.id">
                  <a :href="comic.urls[0].url" target="_blank">
                    <b-card-group deck>
                      <b-card>
                        <b-img-lazy :src="`${comic.thumbnail.path}/standard_fantastic.${comic.thumbnail.extension}`"/>
                        <template v-slot:footer>
                          <b-card-text class="text-dark text-truncate width">{{ comic.title }}</b-card-text>
                        </template>
                      </b-card>
                    </b-card-group>
                  </a>
                </b-col>
              </b-row>
            </b-container>
            <p class="w-100" v-if="!comics && !loading">Comics unavailable</p>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import {key} from '../config.js'
  import axios from 'axios'

  export default {

    name: 'CharacterDetail',
    data() {
      return {
        character: {},
        comics: null,
        img_src: "",
        description: null,
        relatedCharacters: null,
        loading: true
      }
    },
    mounted() {
      this.getCharacterDetails()
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    methods: {
      async getCharacterDetails() {
        try {
          let character_id = document.URL.split('/').pop().toString();
          const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${character_id}${key}`);
          this.character = response.data.data.results[0];
          this.img_src = `${this.character.thumbnail.path}/standard_fantastic.${this.character.thumbnail.extension}`;
          let comic_uri = this.character.comics.collectionURI.replace("http://", "https://");
          const collection = await axios.get(`${comic_uri}${key}`);
          this.comics = collection.data.data.results ? collection.data.data.results : null;
          this.description = this.character.description ? this.character.description : this.comics[0] ? this.comics[0].description : null;
          this.relatedCharacters = this.comics[0] ? this.comics[0].characters.items : null;
        } catch (error) {
          console.log(error);
        } finally {
          this.loading = false;
        }
      },
      viewCharacter(resourceURI) {
        let character_id = resourceURI.split('/').pop().toString();
        this.$router.push({ name: 'CharacterDetail', params: { id: character_id }});
      }
    }
  }
</script>

<style scoped lang="scss">
  .hero {
    height: 200px;
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../assets/images/bg-collage.jpg');
    background-position: center;
    background-size: cover;
    margin: auto;
  }
  .related {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .card-deck {
    transition: ease-in-out 0.1s;
    padding: 0.5rem 0;

    &:hover {
      transform: scale(1.1);
    }
  }
  .card {
    &-body {
      padding: 0;
    }
    img {
        width: 100%;
        height: 150px;
    }
  }
</style>
