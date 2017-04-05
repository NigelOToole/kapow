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

  export default {
    name: 'app',

    data: function () {
      return {
      };
    },

    created: function () {

      // Load characters from the API in the store/index.js
      store.dispatch('loadCharacters');
      
    }
  };

</script>


<style lang="scss">
  @import "./styles/variables";
  @import "./styles/normalize";
  @import "./styles/base";
</style>
