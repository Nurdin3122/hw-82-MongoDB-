import express from 'express';
import User from "../models/Users";
import { Error } from 'mongoose';
import bcrypt from "bcrypt";
import {randomUUID} from "crypto";
const usersRouter = express.Router();
usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            token:randomUUID(),
        });

        await user.save();
        console.log(user)
        return res.send(user);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }

});

usersRouter.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).send({error: 'Username not found'});
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(400).send({error: 'Password is wrong'});
    }
    user.token = randomUUID();
    await user.save()
    console.log(user,"sessions")
    return res.send(user);
});

usersRouter.post('/secret', async (req, res) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).send({error: 'No token present'});
    }
    console.log(token)
    const user = await User.findOne({token});
    console.log(user)
    if (!user) {
        return res.status(401).send({error: 'Wrong token!'});
    }
    return res.send({
        message: 'Secret message',
        username: user.username
    });
});



export default usersRouter;

