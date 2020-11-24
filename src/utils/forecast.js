const request = require('request');

const forecast = (lat, long, callback) => {
    const url =
        'http://api.weatherstack.com/current?access_key=ada966c90064f98b84883e59bc9437e7&query=' +
        lat +
        ',' +
        long;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback(
                'Unable to connect to weather services.',
                undefined
            );
        } else if (response.body.error) {
            callback(
                'Unable to connect to weather services.',
                undefined
            );
        } else {
            console.log(response.body);
            const res =
                response.body.current.weather_descriptions[0] +
                '. Its currently ' +
                response.body.current.temperature +
                ' degrees out. But it feels like ' +
                response.body.current.feelslike +
                ' degrees.' +
                ' The humidity today is ' +
                response.body.current.humidity +
                '%';

            callback(undefined, res);
        }
    });
};
module.exports = forecast;
