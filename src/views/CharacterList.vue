<template>
  <div class="characters">
    <h1 class="m-5 text-center">Characters</h1>
    <b-container class="text-center">
      <b-spinner style="width: 3rem; height: 3rem;" type="grow" label="Loading..." v-if="loading"></b-spinner>
      <h2 v-show="!characterExists">Character Not Found</h2>
      <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="5">
        <b-col md v-for="character in allCharacters" :key="character.id">
            <router-link :to="{ name: 'CharacterDetail', params: { id: character.id, title: character.name, description: character.description }}">
            <b-card-group deck>
              <b-card>
                <b-img-lazy :src="`${character.thumbnail.path}/standard_xlarge.jpg`" :alt="`${character.name} Image`" v-bind="mainProps"></b-img-lazy>
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
import { mapState } from 'vuex'

export default {
  name: 'CharacterList',
  data: function() {
    return {
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: '#bbb'
      }
    }
  },
  methods: {
    characterInit: function() {
      this.$store.dispatch('getCharacters');
    }
  },
  computed: {
    ...mapState({
      allCharacters: state => state.allCharacters,
      loading: state => state.loading,
      characterExists: state => state.characterExists
    })
  },
  created: function() {
    window.addEventListener('load', this.characterInit);
  }
}
</script>

<style scoped lang="scss">
  .card-deck {
    transition: ease-in-out 0.1s;
    padding: 0.5rem 0;

    &:hover {
      text-decoration: none;
      transform: scale(1.1);
    }
  }

  .card {
    &-body {
      padding: 0;
    }
    
    img {
        width: 100%;
    }
  }
</style>
