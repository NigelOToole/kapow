import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    characters: [],
    charactersPopular: []
  },

  actions: {

    // Get the 10 most popular characters that have appeared in the X-Men series
    // X-Men (1991 - 2001); series id = 2265
    loadCharacters: ({ commit }) => {

      fetch('https://gateway.marvel.com:443/v1/public/characters?series=2265&orderBy=-modified&limit=10&apikey=26141e57d1bf781685637a4259a48882')
        .then(resp => resp.json())
        .then(resp => {

          if (typeof resp.data === 'string') {
            resp.data = JSON.parse(resp.data);
          }

          commit('addCharacters', resp.data.results);
            
        })
        .then(resp => {
          commit('sortByPopularity');
        })
        .then(resp => {
          commit('addMoreInfoURL');
        })
        .then(resp => {
          commit('addCharactersPopular');
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  },

  mutations: {

    addCharacters: (state, arg) => {
      state.characters = arg;
    },

    addCharactersPopular: (state) => {
      state.charactersPopular = state.characters;
    },
    
    // Add popularity value based on number of comics the character has appeared in and sort from highest to lowest
    sortByPopularity: (state) => {
      state.characters.forEach((item) => {
        item.popularity = item.comics.available + item.events.available + item.series.available + item.stories.available;
      });

      state.characters = state.characters.sort((a, b) => b.popularity - a.popularity);
    },

    // Add a link to the characters details page on Marvels website
    addMoreInfoURL: (state) => {

      state.characters.forEach((item) => {
        item.moreInfoURL = item.urls.filter((item) => item.type === "detail").pop()["url"];
      });

    }

  },

  getters: {

    getCharacterById: (state) => (id) => {
      return state.characters.find(item => item.id === id);
    }

  },

});
