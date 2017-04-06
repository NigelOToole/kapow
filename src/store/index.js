import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const apiURL = 'https://gateway.marvel.com:443/v1/public/';
const apiKey = '&apikey=26141e57d1bf781685637a4259a48882';

const apiCalls = ['characters?series=2265&limit=100', 'characters?series=2265&limit=100&offset=100'];

export default new Vuex.Store({
  state: {
    characters: [],
    charactersPopular: []
  },

  actions: {

    // Get the 10 most popular characters that have appeared in the X-Men series
    // X-Men (1991 - 2001); series id = 2265
    loadCharacters: ({ commit }) => {

      // Version 1 - Muliple API calls
      // const apiCall1 = 
      //   fetch(`${apiURL}${apiCalls[0]}${apiKey}`)
      //   .then(response => response.json())
      //   .then(response => {
      //     if (typeof response.data === 'string') {
      //       response.data = JSON.parse(response.data);
      //     }
      //     return response.data.results;
      // });

      // const apiCall2 = 
      //   fetch(`${apiURL}${apiCalls[1]}${apiKey}`)
      //   .then(response => response.json())
      //   .then(response => {
      //     if (typeof response.data === 'string') {
      //       response.data = JSON.parse(response.data);
      //     }
      //     return response.data.results;
      // });

      // Promise.all([apiCall1, apiCall2]).then(function(values){
      //   const combinedData = values[0].concat(values[1]);
      //   return combinedData;
      // });

      fetch(`${apiURL}${apiCalls[0]}${apiKey}`)
        .then(resp => resp.json())
        .then(resp => {

          if (typeof resp.data === 'string') {
            resp.data = JSON.parse(resp.data);
          }
          // console.log(resp.data.results);
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
