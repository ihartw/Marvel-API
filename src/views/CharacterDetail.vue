<template>
  <div class="details">
    <b-alert
      v-model="showTop"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000;"
      variant="warning"
      dismissible
    >
      Oops! something went wrong. Try another character.
    </b-alert>
    <b-row class="hero">
      <b-col align-self="center">
        <div class="text-center">
          <b-spinner  style="width: 3rem; height: 3rem;" variant="light" type="grow" label="Loading..." v-if="loading"></b-spinner>
        </div>
        <h1 class="text-center text-white display-4">{{ character_name }}</h1>
      </b-col>
    </b-row>
    <b-container fluid>
      <b-row>
        <b-col sm="7">
          <b-row class="p-5">
            <b-img :src="img_src" rounded="circle" :alt="`Image of ${character_name}`"></b-img>
          </b-row>
          <b-row class="px-5">
            <h2 class="w-100">Description</h2>
            <p class="w-100">{{ character_desc }}</p>
          </b-row>
          <b-row class="p-5">
            <h2 class="w-100">Story</h2>
            <p>{{ story }}</p>
          </b-row>
        </b-col>
        <b-col sm="5" class="related">
          <b-row class="p-5">
            <h2 class="w-100">Related Characters</h2>
            <a class="w-100" href="" v-for="relatedChar in relatedChars" :key="relatedChar.id" :id="`${relatedChar.id}`" @click="viewCharacter">
              {{ relatedChar.name }}
            </a>
          </b-row>
          <b-row class="p-5">
            <h2 class="w-100">Series</h2>
            <p class="w-100" v-for="serie in series.slice(0, 8)" :key="serie.id">{{ serie.title }}</p>
          </b-row>
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
    name: 'CharacterDetail',
    data: function() {
      return {
        link: ''
      }
    },
    methods: {
      viewCharacter: function(event) {
        event.preventDefault();
        this.link = event.target.id;
        this.$store.state.characterId = this.link;
        this.$store.dispatch('getCharacterDetails', this.$store.state.characterId);
      }
    },
    beforeCreate() {
      window.scrollTo(0, 0);
    },
    computed: {
      ...mapState({
        img_src: state => state.img_src,
        img_size: state => state.img_size,
        character: state => state.character,
        characterId: state => state.characterId,
        loading: state => state.loading,
        character_desc: state => state.character_desc,
        character_name: state => state.character_name,
        story: state => state.story,
        relatedChars: state => state.relatedChars,
        series: state => state.series,
        showTop: state => state.showTop
      })
    },
    mounted() {
      this.$store.state.characterId = this.$route.params.id;
      this.$store.dispatch('getCharacterDetails', this.$store.state.characterId);
    }
  }
</script>

<style scoped lang="scss">
  .hero {
    height: 350px;
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../assets/images/bg-collage.jpg');
    background-position: center;
    background-size: cover;
    margin: auto;
  }

  .related {
    background-color: lightgrey;
  }
</style>
