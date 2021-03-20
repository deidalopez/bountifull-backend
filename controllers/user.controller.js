const User = require('./../models/user.model');

const createUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    // TODO this await function may not work if the database is empty
    // const user = await User.findOne({ email: email });
    // if (user)
    //     return res
    //         .status(409)
    //         .send({ error: "409", message: "User already exists " });
    try {
        if (password === "") throw new Error();
        const newUser = await User.create({ ...req.body });
        // await newUser.save();
        console.log(newUser)
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send({ error, message: "Could not create user" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email, password: password });
        res.status(200).send(user);
    } catch (error) {
        res.status(401).send({ error, message: "Could not login" });
    }
}
module.exports = { createUser, login };