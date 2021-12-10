const cryptoModel = require('./model');
var CronJob = require('cron').CronJob;
const axios = require('axios');
const key = '4b1aa19c-62e5-4caf-bb03-e06f8acb9204';

var job = new CronJob('*/5 * * * * ', function() {
    console.log('You will see this message every second');
    axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        {headers:{'X-CMC_PRO_API_KEY':'4b1aa19c-62e5-4caf-bb03-e06f8acb9204'},
            params:{start:1, limit:100}} )
        .then(function (response) {
            // handle success
            console.log("inside cron");
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}, null, true);
job.start();