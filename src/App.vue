<template>
  <div id="app">
  
    <nav class="nav-main">
      <div class="container">
        <a href="/" class="logo">Kapow!</a>
      </div>
    </nav>

    <router-view :charactersPopular="charactersPopular"></router-view>

    <footer class="container footer"><a href="http://marvel.com">Data provided by Marvel. © 2017 MARVEL</a></footer>

  </div>
</template>


<script>

export default {
  name: 'app',

  data: function () {
    return {
      characters: [],
      charactersPopular: []
    };
  },

  created: function () {

    // Get the 10 most popular characters that have appeared in the X-Men series
    // X-Men (1991 - 2001); series id = 2265
    fetch('https://gateway.marvel.com:443/v1/public/characters?series=2265&orderBy=-modified&limit=10&apikey=26141e57d1bf781685637a4259a48882')
      .then(resp => resp.json())
      .then(resp => {
        if (typeof resp.data === 'string') {
          resp.data = JSON.parse(resp.data);
        }
        this.characters = resp.data.results;

        // Add popularity value based on number of comics the character has appeared in
        this.characters.forEach((item) => {
          item.popularity = item.comics.available + item.events.available + item.series.available + item.stories.available;
        });

        // Sort from highest to lowest
        this.charactersPopular = this.characters.sort((a, b) => b.popularity - a.popularity);
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
