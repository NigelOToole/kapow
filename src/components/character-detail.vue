<template>

  <div class="container">
    <router-link to="/" class="back">&lt; Back to list</router-link>

    <div class="char-detail">

      <div class="char-detail-item">
        <img :src="`${ characterDetail.thumbnail.path }.${ characterDetail.thumbnail.extension }`" class="img-fluid char-detail-item-img">
      </div>

      <div class="char-detail-item">
        <h1>{{ characterDetail.name }}</h1>
        <p>{{ characterDetail.description }}</p>
        <a :href="`${ characterDetail.moreInfoURL }`" target="_blank" class="btn">More information</a>
      </div>

    </div>
  </div>

</template>


<script>

  import store from '../store';

  export default {
    name: 'characterDetail',

    props: ['id'],

    computed: {

      // Returns that character with the matching id
      characterDetail: function () {
        return store.getters.getCharacterById(this.id);
      }
    }

  };

</script>


<style lang="scss">
  @import "../styles/variables";

  // Display the details in a 2x grid
  .char-detail {
    display: grid;
    grid-gap: 20px;
    margin: 20px 0;

    @media (min-width: $screen-sm-min) {
      grid-template-columns: repeat(2, 1fr); 
    }
    
  }

      .char-detail-item-img {
        border: 5px solid #333;
      }

</style>
