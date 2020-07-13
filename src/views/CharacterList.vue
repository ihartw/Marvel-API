<template>
  <div class="character-list">
    <h1 class="m-5 text-center">All Characters</h1>
    <b-container class="text-center">
      <h2 v-show="!characterExists">Character Not Found</h2>
      <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="5">
        <b-col md v-for="character in characters" :key="character.id">
          <router-link
            :to="{ name: 'CharacterDetail', params: { id: character.id, title: character.name, description: character.description }}">
            <b-card-group deck>
              <b-card>
                <b-img-lazy :src="`${character.thumbnail.path}/standard_xlarge.jpg`" alt="" v-bind="mainProps"></b-img-lazy>
                <template v-slot:footer>
                  <small class="text-muted">{{ character.name }}</small>
                </template>
              </b-card>
            </b-card-group>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import { key } from '../config.js'
  import axios from 'axios'

  export default {
    name: 'CharacterList',
    props: ['input', 'characters', 'characterExists'],
    data: function () {
      return {
        img_path: [],
        img_size: 'standard_xlarge.jpg',
        mainProps: {
          center: true,
          fluidGrow: true,
          blank: true,
          blankColor: '#bbb'
        }
      }
    },
    methods: {
      getCharacters: function () {
        const characterUrl = `https://gateway.marvel.com/v1/public/characters${key}&limit=100`;
        axios.get(characterUrl)
          .then((response) => {
            let results = response.data.data.results;
            for (let i = 0; i < results.length; i++) {
              this.characters.push(results[i]);
              this.characterExists = true;
            }
            if (this.characters.length === 0) {
              this.characterExists = false;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    created: function () {
      window.addEventListener('load', this.getCharacters);
    }
  }
</script>

<style scoped lang="scss">
  .card-deck {
    transition: ease-in-out .1s;
    padding: .5rem 0px;
  }

  .card-deck:hover {
    transform: scale(1.1);
  }

  .card {
    .card-body {
      padding: 0px;

      img {
        width: 100%;
      }
    }
  }
</style>