<template>
  <div id="app">
  
    <nav class="nav-main">
      <div class="container">
        <a href="/" class="logo">Kapow!</a>
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

      // Get the 10 most popular characters that have appeared in the X-Men series
      store.dispatch('loadCharacters');
      
    }
  };

</script>


<style lang="scss">
  @import "./styles/variables";
  @import "./styles/normalize";
  @import "./styles/base";
</style>
