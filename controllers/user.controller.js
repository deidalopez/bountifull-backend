const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findOneAndUpdate } = require('./../models/user.model');
const User = require('./../models/user.model');
const SECRET_KEY = process.env.SECRET_KEY;

const createUser = async (req, res) => {
    if ((req.body.email) && (req.body.email).length < 1) res.status(400).send({ error, message: 'Please enter email' });
    if ((req.body.password).length < 6) res.status(400).send({ error, message: 'Password must be at least 6 characters' });
    const user = await User.findOne({ email: req.body.email });
    if (user) res.status(409).send({ error: '409', message: 'User already exists ' });
    try {
        if (req.body.password === '') throw new Error();
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({ email: req.body.email, password: hash });
        // const { _id } = await newUser.save();
        // const token = jwt.sign({ _id }, SECRET_KEY);
        // res.status(200).send({ token });
        // const newUser = await User.create({ email: req.body.email, password: req.body.password });
        res.status(200).send({ newUser });
    } catch (error) {
        res.status(500).send({ error, message: `Could not create user because ${error}` });
    }
};

const login = async (req, res) => {
    try {
        console.log(req.body.email);
        console.log(req.body.password);
        const user = await User.findOne({ email: req.body.email });
        if (!user) res.status(400).send({ error, message: 'User not found' });
        const validatePass = await bcrypt.compare(req.body.password, user.password);
        if (!validatePass) res.status(400).send({ error, message: 'Incorrect username and/or password' });
        console.log(user.password);
        res.status(200).json({ message: 'loggedin' });
        // const token = jwt.sign({ _id: user._id }, SECRET_KEY);
        // res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ error, message: 'Could not login' });
    }
};

const profile = async (req, res) => {
    try {
        const { _id, name } = req.user;
        const user = { _id, name };
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error, message: 'Could not access profile' });
    }
};

const getAllUsers = async (req, res) => {
    const users = await User.find();
    try {
        res.json(users);
        res.status(200);
    } catch (error) {
        res.status(500).send({ error, message: 'Could not get all users' });
    }
};

const deleteUser = async (req, res) => {
    const { email } = req.body;
    try {
        const deletedUser = await User.deleteOne({ email: email });
        res.status(200).send(deletedUser);
    } catch (error) {
        res.status(500).send({ error, message: 'Could not delete user' });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await findOneAndUpdate({ email: req.body.email }, req.body, { new: true });
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).send({ error, message: 'Could not update user' });
    }
};

const getUserByEmail = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.find({ email: email, password: password });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error, message: 'Could not find user by email' });
    }
};


module.exports = { createUser, login, profile, getAllUsers, deleteUser, getUserByEmail, updateUser };