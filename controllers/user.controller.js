const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Item = require('../models/item.model');
const User = require('./../models/user.model');
// const { getItemsByUserAndDate } = require('./items.controllers');
const SECRET_KEY = process.env.SECRET_KEY;

const createUser = async (req, res) => {
    // if ((req.body.email) && (req.body.email).length < 1) res.status(400).send({ error, message: "Please enter email" });
    // if ((req.body.password).length < 6) res.status(400).send({ error, message: "Password must be at least 6 characters" });
    const user = await User.findOne({ email: req.body.email });
    if (user) res.status(409).send({ error: '409', message: 'User already exists ' });
    try {
        if (req.body.password === '') throw new Error();
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({ ...req.body, password: hash });
        const { _id } = await newUser.save();
        const token = jwt.sign({ _id }, SECRET_KEY);
        res.status(200).send({ user: newUser, token });
    } catch (error) {
        res.status(500).send({ error, message: `Could not create user because ${error}` });
    }
};

const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) res.status(400).send({ message: 'User not found' });
    const today = new Date().toISOString().substring(0, 10);
    const allItems = await Item.find({ user: user._id, dateCreated: today }).exec();
    if (!allItems) allItems = [];
    try {
        const validatePass = await bcrypt.compare(req.body.password, user.password);
        if (!validatePass) res.status(400).send({ error, message: 'Incorrect username and/or password' });
        const token = jwt.sign({ _id: user._id }, SECRET_KEY);
        res.status(200).send({ user: user, token, currentProgress: allItems });
    } catch (error) {
        res.status(500).send({ error, message: 'Could not login' });
    }
};

const profile = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = { _id };
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
    const { _id } = req.body;
    console.log(_id);
    try {
        const deletedUser = await User.deleteOne({ _id: _id });
        res.status(200).send(deletedUser);
    } catch (error) {
        res.status(500).send({ error, message: 'Could not delete user' });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).send({ error, message: 'Could not update user' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        console.log(user);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send('Could not find by id');
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

module.exports = { createUser, login, profile, getAllUsers, deleteUser, getUserByEmail, updateUser, getUserById };