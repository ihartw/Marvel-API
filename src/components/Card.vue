<template>
  <div class="card">
    <b-card-group deck>
      <b-card>
        <!-- <b-img :src="character_img" fluid :alt="alt_desc"></b-img> -->
        <template v-slot:footer>
          <small class="text-muted">{{ characters.name }}</small>
        </template>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: 'Card',
  data: function() {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
  .card {
    .card-body {
      padding: 0px;
    }
  }
</style>
