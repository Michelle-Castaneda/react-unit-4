require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Creates a JSON Web Token (JWT) with a payload containing the username and id, set to expire in 2 days.
const createToken = (username, id) => {
    return jwt.sign(
        { username, id },
        SECRET,
        { expiresIn: '2 days' }
    ); 
}

module.exports = {
    login: async (req, res) => {
        try {
            let { username, password } = req.body;
            let foundUser = await User.findOne({ where: { username: username } });
            
            if (foundUser) {
                const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass);
                
                if (isAuthenticated) {
                    let token = createToken(foundUser.dataValues.username, foundUser.dataValues.id);
                    const exp = Date.now() + 1000 * 60 * 60 * 48;
                    const data = {
                        username: foundUser.dataValues.username,
                        userId: foundUser.dataValues.id,
                        token: token,
                        exp: exp
                    };
                    res.status(200).send(data);
                } else {
                    res.status(400).send("Password is incorrect");
                }
            } else {
                res.status(400).send("User does not exist.");
            }
        } catch (error) {
            console.error(error);
            res.status(400).send(error);
        }
    },

    register: async (req, res) => {
        try {
            let { username, password } = req.body;
            let foundUser = await User.findOne({ where: { username: username } });
            
            if (foundUser) {
                res.status(400).send('Username not available');
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                let newUser = await User.create({ username: username, hashedPass: hash });
                let token = createToken(newUser.dataValues.username, newUser.dataValues.id);
                const exp = Date.now() + 1000 * 60 * 60 * 48;
                const data = {
                    username: newUser.dataValues.username,
                    userId: newUser.dataValues.id,
                    token: token,
                    exp: exp
                };
                res.status(200).send(data);
            }
        } catch(error) {
            console.error(error);
            res.status(400).send(error);
        }
    }
};
