const path = require('path');
const express = require('express');

const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const hbs = require('hbs');

const app = express();

const PORT = process.env.PORT || 3000;

// Paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

// Setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Setup directory location
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Neeraj',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Neeraj',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App',
        message: 'This is help message.',
        name: 'Neeraj',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No location provided.',
        });
    }

    geoCode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error,
                });
            }
            forecast(
                latitude,
                longitude,
                (error, forecastData) => {
                    if (error) {
                        return res.send({
                            error,
                        });
                    }
                    res.send({
                        location,
                        forecast: forecastData,
                        address: req.query.address,
                    });
                }
            );
        }
    );
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'No search string passed?',
        });
    }
    console.log(req.query);
    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neeraj',
        errorMessage: 'Help topic not found!',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neeraj',
        errorMessage: 'Page not found',
    });
});

app.listen(PORT, () => {
    console.log('Server running on port 3000');
});
