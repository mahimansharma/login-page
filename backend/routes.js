const express = require('express');
const { User } = require("./models");
const { getToken, isAuth } = require('./utils');
const router = express.Router();

router.get('/allUsers', (req, res) => {
    User.find()
        .then(data => {
            console.log("got users")
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
});

router.delete('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id)
    .exec()
    .then(data => {
        if (!data) {
            return res.status(404).end();
        }
        return res.status(204).end();
    })
    .catch(err => next(err));
})

router.put('/:id', isAuth, async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: getToken(updatedUser),
        });
    } else {
        res.status(404).send({ message: 'User Not Found' });
    }
});

router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if (signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser),
        });
    } else {
        res.status(401).send({ message: 'Invalid Email or Password.' });
    }
});

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const newUser = await user.save();
    if (newUser) {
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
        });
    } else {
        res.status(401).send({ message: 'Invalid User Data.' });
    }
});

router.get('/createadmin', async (req, res) => {
    try {
        const user = new User({
            name: 'admin',
            email: 'admin@example.com',
            password: '12345',
            isAdmin: true,
        });
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({ message: error.message });
    }
});


module.exports = router;