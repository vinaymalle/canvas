import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const SECRECTKEY = "canvas";

async function login(req, res) {

    let { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(200).send({ success: false });
        }
        let result = await bcrypt.compare(password, user?.password);
        let token = getToken({ username, password });
        return res.status(200).send({ success: result, token });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err.message });
    }

}

async function register(req, res) {

    let { username, password } = req.body;
    try {
        let salt = await bcrypt.genSalt(10);
        let encrypted = await bcrypt.hash(password, salt);
        let user = await User.findOne({ username });
        if (user) {
            return res.status(200).send({ success: false });
        }
        user = new User({ username, password: encrypted });
        await user.save();
        let token = getToken({ username, password });
        return res.status(201).send({ success: true, token });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err.message });
    }

}

function getToken(data) {
    return jwt.sign(data, SECRECTKEY);
}

export { register, login };