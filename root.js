const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const ejs = require('ejs');
const path = require('path');
const axios = require('axios');
const PDFDocument = require('pdfkit');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { connectDB } = require('./config/db.js'); 
const { User } = require('./config/user_entity.js');
const { History } = require('./config/history_entity.js'); 
const session = require('express-session');



const openWeatherAPIkey = 'fb5612f42bb00aad64d3fc473a406d18';
const weatherAPIkey = 'c7d1f9900f424e3db9991055241801';
const weatherAPIkeyPremium = 'cd00d51ad3fd41089ed190903240602';

const cityAPIkey = 'EKXTz/4Q1444PYhzZpiVHw==zwoap5okxNpAYJy4';


const app = express();
const port = 3000;


app.use(cors());
app.use(session({
    secret: 'heyheyhey', 
    resave: false,
    saveUninitialized: true,
}));

app.set('view engine', 'ejs'); 
app.use(express.static('public'));
app.use(express.static(__dirname + '/assets'));

app.use(express.urlencoded({ extended: true }));

connectDB()

app.get('/', (req, res) => {
    if (req.session.username) {
        res.redirect('/weather');
    } else {
        res.sendFile(path.join(__dirname, 'views', 'register_page.html'));
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login_page.html'));
});

app.get('/history', async (req, res) => {
    const userId = req.session.userId; 

    if (!userId) {
        return res.status(403).send('User not logged in');
    }

    try {
        const userHistory = await History.find({ userId: userId }).sort({ timestamp: -1 });
        res.render('history', { history: userHistory,username: req.session.username });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/charts', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }

    res.render('charts', { username: req.session.username });
});

app.get('/about', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }

    res.render('about', { username: req.session.username });
});
app.get('/weather', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }

    res.render('index', { username: req.session.username });
});

app.post('/signout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

app.post('/signup', async (req, res) => {
    const { Username, email, password } = req.body;

    if (!Username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            name: Username,
            email,
            password: hashedPassword,
            userId: generateRandomUserId(), 
            creationDate: new Date(),
            updateDate: null,
            deletionDate: null,
            adminStatus: false 
        });

        await newUser.save();

        req.session.username = Username;
        req.session.email = email;
        req.session.userId = newUser._id; 

        res.redirect('/weather');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/login', async (req, res) => {
    const { Username, password } = req.body;

    if (!Username || !password) {
        return res.send(`<script>
            document.addEventListener('DOMContentLoaded', function() {
                const errorMessage = 'Username and password are required';
                document.getElementById('errorMessage').innerText = errorMessage;
                new bootstrap.Modal(document.getElementById('loginErrorModal')).show();
            });
        </script>`);
    }

    try {
        const user = await User.findOne({ name: Username }); 

        if (!user) {
            return res.send('<script>alert("No user found with this username"); window.location.href = "/login"; </script>');
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.send('<script>alert("Password is incorrect"); window.location.href = "/login"; </script>');
        }

        req.session.username = user.name;
        req.session.email = user.email;
        req.session.userId = user._id; 


        if (user.adminStatus) {
            res.redirect('/admin'); 
        } else {
            res.redirect('/weather');
        }
    } catch (err) {
        console.error('Error:', err);
        return res.send('<script>alert("Internal Server Error"); window.location.href = "/login"; </script>');
    }
});



app.get('/admin', async (req, res) => {
    const users = await User.find();
    res.render('admin', { users }); 
});

app.get('/delete-user/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
});

app.get('/edit-user/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('edit_user', { user });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/update-user/:id', async (req, res) => {
    const { name, email, password, adminStatus } = req.body;

    try {
        const updates = {
            name,
            email,
            adminStatus: adminStatus === 'on',
            updateDate: new Date(),
        };

        if (password) {
            updates.password = await bcrypt.hash(password, saltRounds);
        }

        await User.findByIdAndUpdate(req.params.id, updates);

        res.redirect('/admin');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/download-history-record/:recordId', async (req, res) => {
    const { recordId } = req.params; 
    const userId = req.session.userId; 

    if (!userId) {
        return res.status(403).send('User not logged in or session not established.');
    }

    try {
        const record = await History.findOne({ _id: recordId, userId: userId });

        if (!record) {
            return res.status(404).send('Record not found or does not belong to the current user.');
        }

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="History_Record_${recordId}.pdf"`);

        doc.fontSize(16).text('Weather History Record', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`City: ${record.city}`);
        doc.text(`Request Type: ${record.requestType}`);
        doc.text(`Date: ${new Date(record.timestamp).toLocaleString()}`);
        doc.text('Details:');
        const details = record.responseData;
        for (const key in details) {
            if (details.hasOwnProperty(key)) {
                doc.moveDown(0.5);
                doc.fontSize(10).text(`${key}: ${JSON.stringify(details[key], null, 2)}`, {
                    indent: 20,
                    align: 'left',
                    continued: false
                });
            }
        }
        doc.end();
        doc.pipe(res); 
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Internal Server Error');
    }
});


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
    const userId = req.session.userId; 
    if (!userId) {
        return res.status(403).send('User not logged in or session not established.');
    }
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${weatherAPIkey}&q=${city}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        const newHistoryEntry = new History({
            userId,
            city,
            requestType: 'current',
            responseData: data
        });
        await newHistoryEntry.save();

        res.json(data);
    } catch (error) {
        console.error("Error saving history:", error);

        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/forecast14days', async (req, res) => {
    const city = req.query.city;
    const userId = req.session.userId; 
    if (!userId) {
        return res.status(403).send('User not logged in or session not established.');
    }
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${weatherAPIkeyPremium}&q=${city}&aqi=no&days=14`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        const newHistoryEntry = new History({
            userId,
            city,
            requestType: 'forecast14days',
            responseData: data
        });
        await newHistoryEntry.save();

        res.json(data);
    } catch (error) {
        console.error("Error saving history:", error);

        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/forecastChart', async (req, res) => {
    const city = req.query.city;
    const userId = req.session.userId; 
    if (!userId) {
        return res.status(403).send('User not logged in or session not established.');
    }
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${weatherAPIkeyPremium}&q=${city}&aqi=no&days=14`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        res.json(data);
    } catch (error) {
        console.error("Error saving history:", error);

        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/city-info', async (req, res) => {
    const cityName = req.query.city;
    const userId = req.session.userId;
    if (!userId) {
        return res.status(403).send('User not logged in or session not established.');
    }

    if (!cityName) {
        return res.status(400).json({ error: 'City name parameter is required' });
    }

    const apiUrl = `https://api.api-ninjas.com/v1/city?name=${cityName}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'X-Api-Key': cityAPIkey
            }
        });

        const data = response.data; 

        const newHistoryEntry = new History({
            userId,
            city: cityName, 
            requestType: 'city-info',
            responseData: data
        });
        await newHistoryEntry.save();

        res.json(data);
    } catch (error) {
        console.error("Error fetching city info:", error);
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            res.status(error.response.status).json({ error: error.response.data.message || 'Error fetching city info' });
        } else if (error.request) {
            console.log(error.request);
            res.status(500).json({ error: 'No response received from city info API' });
        } else {
            console.log('Error', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


function generateRandomUserId() {
    const length = 10;
    let randomUserId = '';

    for (let i = 0; i < length; i++) {
        const randomDigit = Math.floor(Math.random() * 10); 
        randomUserId += randomDigit.toString();
    }

    return parseInt(randomUserId, 10); // Convert the string to an integer
}