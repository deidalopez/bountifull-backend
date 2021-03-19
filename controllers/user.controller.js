const User = require('./../models/user.model');

const createUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user)
        return res
            .status(409)
            .send({ error: "409", message: "User already exists " });
    try {
        if (password === "") throw new Error();
        const newUser = new User({ ...req.body });
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send({ error, message: "Could not create user" });
    }
};

module.exports = { createUser };