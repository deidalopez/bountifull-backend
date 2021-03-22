const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findOneAndUpdate } = require('./../models/user.model');
const User = require('./../models/user.model');
const SECRET_KEY = process.env.SECRET_KEY;

const createUser = async (req, res) => {
    if ((req.body.email) && (req.body.email).length < 1) res.status(400).send({ error, message: "Please enter email"});
    if ((req.body.password).length < 6) res.status(400).send({ error, message: "Password must be at least 6 characters"});
    const user = await User.findOne({ email: req.body.email });
    if (user) res.status(409).send({ error: "409", message: "User already exists " });
    try {
        // if (req.body.password === "") throw new Error();
        // const hash = await bcrypt.hash(req.body.password, 10);
        // const newUser = new User({ ...req.body, password: hash });
        // const { _id } = await newUser.save();
        // const token = jwt.sign({ _id }, SECRET_KEY);
        // res.status(200).send({ token });
        const newUser = await User.create({ email: req.body.email, password: req.body.password});
        res.status(200).send({ newUser });
    } catch (error) {
        res.status(500).send({ error, message: `Could not create user because ${error}` });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) res.status(400).send({ error, message: "User not found"});
        const validatePass = await bcrypt.compare(req.body.password, user.password);
        if (!validatePass) res.status(400).send({ error, message: "Incorrect username and/or password"});
        const token = jwt.sign({ _id: user._id }, SECRET_KEY);
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ error, message: "Could not login" });
    }
}

const profile = async (req, res) => {
    try {
        const { _id, firstName, lastName } = req.user;
        const user = { _id, firstName, lastName };
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error, message: "Could not access profile" })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
        res.status(200);
    } catch (error) {
        res.status(500).send({ error, message: "Could not get all users"});
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = User.findOne({ email: req.body.email });
        if (user) User.deleteOne(user);
    } catch (error) {
        res.status(500).send({ error, message: "Could not get delete user"});
    }
}

const updateUser = async (req, res) => {
    try {
        const user = findOneAndUpdate({email: req.body.email}, req.body, { new: true });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error, message: "Could not update user"});
    }
}

const getUserByEmail = async (req, res) => {
    const user = User.findOne({ email: req.body.email });
    try {
        if (user) res.json(user).status(200);
    } catch (error) {
        res.status(500).send({ error, message: "Could not find user by email"});
    }
}


module.exports = { createUser, login, profile, getAllUsers, deleteUser, getUserByEmail, updateUser };