<template>

  <div class="container">
    <div class="characters characters--list">

      <router-link v-for="item in charactersList" :key="item.id" :to="{ name: 'characterDetail', params: { id: item.id }}" class="characters--list__item">
        <h2 class="characters--list__title">{{ item.name }}</h2>
        <img :src="`${item.thumbnail.path }.${item.thumbnail.extension }`" class="img-fluid characters--list__img" :alt="item.name">
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
