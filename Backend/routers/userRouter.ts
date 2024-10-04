import express from 'express';
import User from "../models/Users";
import { Error } from 'mongoose';
import bcrypt from "bcrypt";
import crypto, {randomUUID} from "crypto";
import {OAuth2Client} from "google-auth-library";
import config from "../config";


const usersRouter = express.Router();
const googleClientId = new OAuth2Client(config.google.clientId)
usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            displayName:req.body.displayName,
            token:randomUUID(),
        });

        await user.save();
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
    return res.send(user);
});

usersRouter.post("/google",async (req,res,next) => {
    try {
        const ticket = await googleClientId.verifyIdToken({
            idToken: req.body.credential,
            audience:config.google.clientId,
        });

        const payload = ticket.getPayload();
        if(!payload) {
            return res.status(400).send({error:"Google Login Error"});
        }

        const email = payload.email;
        const id = payload.sub;
        const displayName = payload.name;

        if(!email) {
            return res.status(400).send({error:"No email"})
        }

        let user = await User.findOne({username:email}).exec();
        if(!user) {
            const newPassword = crypto.randomUUID();
            user = new User({
                username:email,
                password:newPassword,
                googleId:id,
                token:randomUUID(),
                displayName,
            });
        }
        await user.save();
        return res.send(user)

    } catch (error) {
        return next(error)
    }
});



usersRouter.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const success = {message: 'Success'};
        if (!token) return res.send(success);
        const user = await User.findOne({token});
        if (!user) return res.send(success);

        user.token = "";
        user.save();

        return res.send(success);
    } catch (e) {
        return next(e);
    }
});

export default usersRouter;


