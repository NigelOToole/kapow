<template>
  <div id="app">
  
    <nav class="nav-main">
      <div class="container">
        <router-link to="/" class="logo">Kapow!</router-link>
      </div>
    </nav>

    <router-view></router-view>

    <footer class="container footer"><a href="http://marvel.com">Data provided by Marvel. © 2017 MARVEL</a></footer>

  </div>
</template>


<script>

import store from './store';
import localforage from 'localforage';

  export default {
    name: 'app',

    data: function () {
      return {
      };
    },

    created: function () {
      console.log('created');

      // Load data from the API in the store/index.js or from Local storage if available
      localforage.getItem('characters')
        .then(data => {
          if(data !== null) {
            console.log('data from local storage');
            store.state.characters = data;
          }
          else {
            console.log('data from API');
            store.dispatch('loadCharacters');
          };
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  };

</script>


<style lang="scss">
  @import "./styles/variables";
  @import "./styles/normalize";
  @import "./styles/base";
</style>
