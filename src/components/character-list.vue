<template>

  <div class="container">
    <div class="char-list">

      <router-link v-for="item in charactersList" :key="item.id" :to="{ name: 'characterDetail', params: { id: item.id }}" class="char-list-item">
        <h2 class="char-list-item-title">{{ item.name }}</h2>
        <img :src="`${item.thumbnail.path }.${item.thumbnail.extension }`" class="img-fluid char-list-item-img">
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
        return store.state.charactersPopular;
      }

    }

  };

</script>

<style lang="scss">
  @import "../styles/variables";

  // Display the characters in a grid
  .char-list {
    display: grid;
    grid-gap: 20px;
    margin: 20px 0;

    @media (min-width: $screen-xs-min) {
      // Split the grid into 4 columns, equally spaced as 1 fraction unit each. The same as '1fr 1fr 1fr 1fr'
      grid-template-columns: repeat(2, 1fr); 
      
      // First two items span 2 columns and 2 rows making it twice as large
      :nth-child(1), :nth-child(2) {
        grid-column: span 2; 
        grid-row: span 2;
      }
    }

    @media (min-width: $screen-sm-min) {
      // Split the grid into 4 columns, equally spaced as 1 fraction unit each. The same as '1fr 1fr 1fr 1fr'
      grid-template-columns: repeat(4, 1fr); 
    }

  }

    .char-list-item {
      display: block;
      position: relative;
      border: 5px solid #333;
      transition: color .2s,  border-color .2s;

      &:hover {
        border-color: #000;
      }
    }

      // Overlay the title on the image
      .char-list-item-title {
        position: absolute;
        margin: 5px 10px;
        text-shadow: 1px 1px 0 #000, 2px 2px 0 #000, 3px 3px 0 #000, 4px 4px 0 #000;
      }
      .char-list-item-img {
      }

</style>
