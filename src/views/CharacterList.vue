<template>
  <div class="characters p-4" id="characters">
    <h1 class="m-3 text-center">Characters</h1>
    <b-container class="text-center">
      <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="5">
        <b-col md v-for="character in searchCharacters" :key="character.id">
            <router-link :to="{ name: 'CharacterDetail', params: { id: character.id }}" :id="character.id">
            <b-card-group deck>
              <b-card>
                <b-img-lazy :src="`${character.thumbnail.path}/standard_large.${character.thumbnail.extension}`" :alt="`${character.name} Image`"></b-img-lazy>
                <template v-slot:footer>
                  <b-card-text class="text-dark text-truncate width">{{ character.name }}</b-card-text>
                </template>
              </b-card>
            </b-card-group>
          </router-link>
        </b-col>
      </b-row>
      <b-spinner style="width: 3rem; height: 3rem;" type="grow" label="Loading..." v-if="loading"></b-spinner>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CharacterList',
  computed: {
    ...mapState({
      searchCharacters: state => state.searchCharacters,
      loading: state => state.loading,
    })
  },
}
</script>

<style scoped lang="scss">
  .card-deck {
    transition: ease-in-out 0.1s;
    padding: 0.5rem 0;
    border-radius: 8px;

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
        height: 200px;
    }
  }
  .width {
    width: '100%';
  }
</style>
