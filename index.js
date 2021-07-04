//const url = require('./config.js');
const request = require('request');
const express = require('express');
const path = require('path');
const net = require('net');
const client = new net.Socket();


var tcpPort = 7070;
var tcpIP = '127.0.0.1';

const app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send({Connection:"Server is listening"});
});
app.get('/api/calculate', (req, res) => {
   
    const opt1 = req.query.num1;
    const opt2 = req.query.num2;

    client.connect(tcpPort, tcpIP);

    if (opt1 == "q" || opt2 == "q") {
        client.end();
    }
    else{
        client.write("ADD " + opt1 + " " + opt2);
    }


    client.on('data', function(data) {
       client.destroy();
       res.send({result:data.toString()});
    });
    
});


app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
