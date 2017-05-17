<template>
  <div id="app">
  
    <nav class="nav-main">
      <div class="container">
        <router-link to="/" class="logo">Kapow!</router-link>
      </div>
    </nav>

    <div class="loader" v-if="loading">Loading...</div>

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
        loading: false
      };
    },

    created: function () {
      this.fetchData();
    },

    methods: {

      // Load data from the API in the store/index.js or from Local storage if available
      fetchData () {

        this.loading = true;

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
          .then(() => {
            console.log('finished loading');
            this.loading = false;
          })
          .catch(function (error) {
            console.log(error);
          });
        
      }
    }

  };

</script>


<style lang="scss">
  @import "./styles/variables";
  @import "./styles/normalize";
  @import "./styles/base";

  .loader,
  .loader:before,
  .loader:after {
    border-radius: 50%;
  }

  .loader {
    position: relative;
    width: 10em;
    height: 10em;
    margin: 3em auto;
    font-size: 1rem;
    color: $primary-color;
    text-indent: -99999em;
    box-shadow: inset 0 0 0 1em;
    transform: translateZ(0);
  }

  .loader:before,
  .loader:after {
    position: absolute;
    content: '';
    width: 5.4em;
    height: 10.4em;
    background: #fff;
  }

  .loader:before {
    border-radius: 10.4em 0 0 10.4em;
    top: -0.2em;
    left: -0.2em;
    transform-origin: 5.2em 5.2em;
    animation: load2 2s infinite ease 2s;
  }

  .loader:after {
    border-radius: 0 10.4em 10.4em 0;
    top: -0.2em;
    left: 5.2em;
    transform-origin: 0px 5.2em;
    animation: load2 2s infinite ease .5s;
  }

  @keyframes load2 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  
</style>
