// http://api.weatherstack.com/current?access_key=25ef414c5f200cec0a4220c8a37ee596&query=37.8267,-122.4233

/* api.weatherstack.com */

import request from 'postman-request';

const url = 'http://api.weatherstack.com/current?access_key=25ef414c5f200cec0a4220c8a37ee596&query=37.8267,-122.4233';

request({url: url}, (error, response) => {
    const data = JSON.parse(response.body);
    console.log(data.current);
});
