<template>

  <div class="container">
    <div class="characters characters--list">

      <router-link v-for="character in charactersList" :key="character.id" :to="{ name: 'characterDetail', params: { id: character.id }}" class="characters--list__item">
        <h2 class="characters--list__title">{{ character.name }}</h2>
        <img :src="character.thumbnailFull" class="img-fluid characters--list__img" :alt="character.name">
      </router-link>

    </div>
  </div>

</template>


<script>

  import store from '../store';

  export default {
    name: 'characterList',

    props: [],

    data: function () {
      return {
        searchString: ''
      };
    },

    computed: {

      charactersList: function () {
        return store.state.characters;
      }

    }

  };

</script>
