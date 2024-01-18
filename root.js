const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

const openWeatherAPIkey = 'fb5612f42bb00aad64d3fc473a406d18';
const weatherAPIkey = 'c7d1f9900f424e3db9991055241801';
const cityAPIkey = 'EKXTz/4Q1444PYhzZpiVHw==zwoap5okxNpAYJy4';
app.use(express.static('public'));

app.get('/forecast', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${openWeatherAPIkey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (response.ok) {
            res.json(data);
        } else {
            res.status(response.status).json({ error: data.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/current', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${weatherAPIkey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (response.ok) {
            res.json(data);
        } else {
            res.status(response.status).json({ error: data.error.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/forecast14days', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${weatherAPIkey}&q=${city}&aqi=no&days=14`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (response.ok) {
            res.json(data);
        } else {
            res.status(response.status).json({ error: data.error.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/city-info', async (req, res) => {
    const cityName = req.query.city;

    if (!cityName) {
        return res.status(400).json({ error: 'City name parameter is required' });
    }

    const apiUrl = `https://api.api-ninjas.com/v1/city?name=${cityName}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-Api-Key': cityAPIkey
            }   
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data)
            res.json(data);
        } else {
            console.log(res.status.error)
            res.status(response.status).json({ error: data.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
