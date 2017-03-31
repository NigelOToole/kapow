<template>

  <div class="container">
    <router-link to="/" class="back">&lt; Back to list</router-link>

    <div class="char-detail" v-for="item in charactersFiltered">

      <div class="char-detail-item">
        <img :src="`${ item.thumbnail.path }.${ item.thumbnail.extension }`" class="img-fluid char-detail-item-img">
      </div>

      <div class="char-detail-item">
        <h1>{{ item.name }}</h1>
        <p>{{ item.description }}</p>
        <a :href="`${ moreInfoURL }`" target="_blank" class="btn">More information</a>
      </div>

    </div>
  </div>
</template>


<script>

  export default {
    name: 'characterDetail',

    props: ['id', 'charactersPopular'],

    computed: {
      charactersArray: function () {
        return this.charactersPopular;
      },

      // Returns that character with the matching id
      charactersFiltered: function () {
        let charactersArray = this.charactersArray;
        let id = this.id;

        if (!id) {
          return charactersArray;
        }

        charactersArray = charactersArray.filter(function (item) {
          if (item.id === id) {
            return item;
          }
        });

        return charactersArray;
      },

      // Returns the character more info url
      moreInfoURL: function () {
        let charactersArray = this.charactersArray;
        let id = this.id;
        let characterUrlsArray = [];
        let characterUrl = '';

        characterUrlsArray = this.charactersFiltered.filter(function (item) {
          return item.urls;
        });

        characterUrlsArray = characterUrlsArray.filter(function (item) {
          if (item.type === "detail") {
            characterUrl = item.url;
          }
        });

        return characterUrl;

      }

    }

  };

</script>


<style lang="scss">

  // Display the details in a 2x grid
  .char-detail {
    display: grid;
    grid-template-columns: repeat(2, 1fr); // Split the grid into 2 columns, equally spaced
    grid-gap: 20px;
    margin: 20px 0;
  }

      .char-detail-item-img {
        border: 5px solid #333;
      }

</style>
