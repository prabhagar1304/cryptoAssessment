const express = require("express");

const   app = express();
const axios = require('axios');
const key = '4b1aa19c-62e5-4caf-bb03-e06f8acb9204';

module.exports = app;

app.get("/crypto", async (request, response) => {
    try {
      axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
          {headers:{'X-CMC_PRO_API_KEY':'4b1aa19c-62e5-4caf-bb03-e06f8acb9204'},
              params:{start:1, limit:100}} )
          .then(function (respons) {
              const data =  JSON.parse(JSON.stringify(respons.data.data));
              response.status(200).send(data);
              // handle success
              console.log(response);
          })
          .catch(function (error) {
              // handle error
              response.status(400).send({message:"error"})
              console.log(error);
          })
    } catch (error) {
        response.status(500).send(error);
    }
})
