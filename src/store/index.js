import Vue from 'vue';
import Vuex from 'vuex';
import localforage from 'localforage';

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
    loadCharacters: ({ commit, state }) => {

      fetch(`${apiURL}${apiCalls[0]}${apiKey}`)
        .then(response => handleResponse(response))
        .then(response => {          
          if (typeof response.data === 'string') {
            response.data = JSON.parse(response.data);
          }

          commit('addCharacters', response.data.results);
        })
        .then(response => {
          commit('sortByPopularity');
          commit('addMoreInfoURL');
        })
        .then(response => {

          // Add the data to local stroage
          localforage.setItem('characters', state.characters)
            .then(data => {
              return data;
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function(error) {
          console.log(error);
        });


        function handleResponse (response) {
          let contentType = response.headers.get('content-type');
          if (contentType.includes('application/json')) {
            return handleJSONResponse(response);
          } else {
            throw new Error(`Sorry, content-type ${contentType} not supported`);
          }
        }

        function handleJSONResponse (response) {
          return response.json()
            .then(json => {
              if (response.ok) {
                return json;
              } else {
                return Promise.reject(Object.assign({}, json, {
                  status: response.status,
                  statusText: response.statusText
                }));
              }
            });
        }

    },

  },

  mutations: {

    addCharacters: (state, arg) => {
      state.characters = arg;
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
