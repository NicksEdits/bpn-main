const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fs = require('fs');
//authentification

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign( { id }, 'RANDOM_TOKEN_SECRET', { expiresIn: maxAge });
}

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          username: req.body.username,
          password: hash,
          name: 'Not Specified',
          firstname: 'Not Specified',
          sex: 'Not Specified',
          age: 0,
          height: 0,
          weight: 0,
          goal: 'Not Specified',
          profilePicture:'',
          role: 'Not Specified',
          bio: 'Welcome   to   my   profile.'
            });
        user.save()
          .then(() => res.status(201).json({ message: 'User created !' }))
          .catch(() => res.status(400).json({ error : 'Username Already Taken !' }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ username: req.body.username })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'User not found !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Incorrect password !' });
            }
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge});
            res.status(200).json({ userId: user._id });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};


module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

// User fonctions

exports.getOneUser = (req, res, next) => {
  User.findOne({
    _id: req.params.id
  }).then(
    (user) => {
      res.status(200).json(user);
    }
  ).catch(
    (err) => {
      res.status(404).json({
        message: 'CECI EST UNE ERREUR',
        error: err
      });
    }
  );
};

exports.modifyInfos = (req, res, next) => {
  const userInfos = { ...req.body };
  if(req.body.username)
  {
    User.findOne({ username: req.body.username })
    .then((user) => {
      if(!user)
      {
        User.updateOne({ _id: req.params.id }, { ...userInfos, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Informations modified !'}))
        .catch(error => res.status(400).json({ error: error, message: "ERROR BACK" }))
      }
      else {
        res.status(400).json({error: 'Username Already Taken'});}
    })
  }
  else
  {
    User.updateOne({ _id: req.params.id }, { ...userInfos, _id: req.params.id })
     .then(() => res.status(200).json({ message: 'Informations modified !'}))
     .catch(error => res.status(400).json({ error: error, message: "ERROR BACK" }))
  } 
};

// Delete current Profile Picture and add a new one
exports.modifyPP = (req, res, next) => {
  console.log(req.file);
  User.findOne({ _id: req.params.id })
  .then(user => {
    const userInfos = {
      username: user.username,
      firstname: user.firstname,
      name: user.name,
      age: user.age,
      sex: user.sex,
      height: user.height,
      weight: user.weight,
      goal: user.goal,
      bio: user.bio
    }
    const filename = user.profilePicture.split('/images/')[1];
    console.log(filename);
      fs.unlink(`backend/images/${filename}`, () => {
        User.updateOne({ _id: req.params.id },
          { ...userInfos, profilePicture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: 'Informations modified !'});
          })
          .catch(error => res.status(400).json({ error }))
      });   
  })
  .catch(err => res.status(400).json({error: err, message: 'Error modify PP'}))
};

// Delete user and profile picture from backend/images
 exports.deleteUser = (req, res, next) => {
   User.findOne({ _id: req.params.id })
     .then(user => {
       const filename = user.profilePicture.split('/images/')[1];
       fs.unlink(`backend/images/${filename}`, () => {
         User.deleteOne({ _id: req.params.id })
           .then(() => res.status(200).json({ message: 'Account Deleted'}))
           .catch(error => res.status(400).json({ error }));
       });
     })
     .catch(error => res.status(500).json({ error }));
 };