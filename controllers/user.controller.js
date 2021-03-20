const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/user.model');
const SECRET_KEY = process.env.SECRET_KEY;

const createUser = async (req, res) => {
    console.log("controllercreate");
    console.log(req.body);
    // const user = await User.findOne({ email: req.body.email });
    // if (user)
    //     return res
    //         .status(409)
    //         .send({ error: "409", message: "User already exists " });
    try {
        if (req.body.password === "") throw new Error();
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({ ...req.body, password: hash });
        const { _id } = await newUser.save();
        const token = jwt.sign({ _id }, SECRET_KEY);
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ error, message: `Could not create user because ${error}` });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const validatePass = await bcrypt.compare(req.body.password, user.password);
        if (!validatePass) throw new Error();
        const token = jwt.sign({ _id: user._id }, SECRET_KEY);
        res.status(200).send({ token });
    } catch (error) {
        res.status(401).send({ error, message: "Could not login" });
    }
}

const profile = async (req, res) => {
    try {
        const { _id, firstName, lastName } = req.user;
        const user = { _id, firstName, lastName };
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send({ error, message: "Could not access profile" })
    }
}
module.exports = { createUser, login, profile };