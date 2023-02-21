const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config()

const userRoutes = require('./routes/user');
const workoutRoutes = require('./routes/workout');
const {requireAuth, checkUser} = require('./middleware/auth');
const app = express();
//
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB}@cluste0.euocy.mongodb.net/bpn?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB !'))
  .catch(() => console.log('Connection to MongoDB failed !'));

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// FOR HEROKU DON'T DELETE
app.use(express.static('client/build'))


app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cookieParser());

app.use('/user', userRoutes);
app.use('/workout', workoutRoutes);


// jwt
app.get('*', checkUser)

app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});


//Images
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = app;