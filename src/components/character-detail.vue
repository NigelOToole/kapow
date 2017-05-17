<template>

  <div class="container">
    <router-link to="/" class="back">&lt; Back to list</router-link>

    <div class="characters characters--detail">

      <div class="characters--detail__item">
        <img :src="`${ characterDetail.thumbnail.path }.${ characterDetail.thumbnail.extension }`" class="img-fluid characters--detail__img" :alt="characterDetail.name">
      </div>

      <div class="characters--detail__item">
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
