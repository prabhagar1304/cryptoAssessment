const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");
const cryptoModel = require('./model')
const cors = require('cors')

const app = express();
app.use(cors())

app.use(express.json());


mongoose.connect('mongodb://mongo:27017/assessment',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("db Connected successfully");
});
app.use(Router);

var CronJob = require('cron').CronJob;
const axios = require('axios');
const key = '4b1aa19c-62e5-4caf-bb03-e06f8acb9204';
const http = require('http').Server(app);
 const io = require('socket.io')(http,{
    cors: {
        origin: '*',
    }
});
var job = new CronJob('*/5 * * * *', function() {
    console.log('You will see this message every second');
    axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        {headers:{'X-CMC_PRO_API_KEY':'4b1aa19c-62e5-4caf-bb03-e06f8acb9204'},
            params:{start:1, limit:100}} )
        .then(function (response) {
            // handle success
            const data =  JSON.parse(JSON.stringify(response.data.data));
            io.on('connection', client => {
                client.emit('message', data);
                client.on('disconnect', () => {
                    console.log("disconnected")
                });
            });
            cryptoModel.deleteMany().then(r=>{
                cryptoModel.insertMany(data).then(res=>{
                    console.log("saved succesfuly in db")
                }).catch(e=>{
                    console.log(e)
                })
            }).catch(err=>{
                console.log(err)
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}, null, true);
job.start();





http.listen(3001);
