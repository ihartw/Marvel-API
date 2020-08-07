<template>
  <div class="characters p-5" id="characters">
    <h1 class="m-5 text-center">Characters</h1>
    <b-button href="#characters" class="m-3 fixed-bottom" v-b-tooltip.hover title="Back to Top">
      <b-icon icon="arrow-up" font-scale="2.5" variant="light"></b-icon>
    </b-button>
    <b-container class="text-center">
      <b-spinner style="width: 3rem; height: 3rem;" type="grow" label="Loading..." v-if="loading"></b-spinner>
      <p v-if="loading">Loading characters... This may take a moment</p>
      <h2 v-show="!characterExists">Character Not Found</h2>
      <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="5">
        <b-col md v-for="character in allCharacters" :key="character.id">
            <router-link :to="{ name: 'CharacterDetail', params: { id: character.id, name: character.name }}" :id="`${character.id}`">
            <b-card-group deck>
              <b-card>
                <b-img-lazy :src="`${character.thumbnail.path}/standard_xlarge.jpg`" :alt="`${character.name} Image`" v-bind="mainProps"></b-img-lazy>
                <template v-slot:footer>
                  <small class="text-dark">{{ character.name }}</small>
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
  .fixed-bottom {
    width: 65px;
    opacity: .8;
  }
</style>
