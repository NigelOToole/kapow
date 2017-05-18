<template>

  <div class="container">
    <router-link to="/" class="back">&lt; Back to list</router-link>

    <div class="characters characters--detail">

      <div class="characters--detail__item">
        <img :src="character.thumbnailFull" class="img-fluid characters--detail__img" :alt="character.name">
      </div>

      <div class="characters--detail__item">
        <h1>{{ character.name }}</h1>
        <p>{{ character.description }}</p>
        <a :href="`${ character.moreInfoURL }`" target="_blank" class="btn">More information</a>
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
      character: function () {
        return store.getters.getCharacterById(this.id);
      }
    }

  };

</script>
