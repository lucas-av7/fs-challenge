const axios = require('axios');

const api =  axios.create({ baseURL: 'http://www.omdbapi.com/?apikey=75a7cb8b&'});

module.exports = api;