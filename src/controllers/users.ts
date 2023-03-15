import { RequestHandler } from "express";
import { errMsg, successMsg } from "../util/responseMsg";
import User from "../models/User";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res) => {
    const user = await User.findById(req.session.userId).select("+email").exec();
    if (!user) {
         return errMsg(401, 'error', 'user not authenticated', res)
    }
        successMsg(200, 'success', user, res);
    }

export const signUp: RequestHandler = async (req, res) => {
    const username = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

        const existingUsername = await User.findOne({ username: username }).exec();

        if (existingUsername) {
           return errMsg(409, 'error', 'username already exist', res)
        }

        const existingEmail = await User.findOne({ email: email }).exec();

        if (existingEmail) {
            return errMsg(409, 'error', 'email already exist', res)
        }

        const passwordHashed = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: username,
            email: email,
            password: passwordHashed,
        });
        const payload = {
        name: newUser.username,
        email: newUser.email
         }
        
        
        req.session.userId = newUser._id;
         console.log(req.session);
         
       successMsg(200, 'success', payload, res)
    }

export const login: RequestHandler = async (req, res) => {
    const username = req.body.userName;
    const password = req.body.password;

        const user = await User.findOne({ username: username }).select("+password +email").exec();

        if (!user) {
            return errMsg(400, 'error', 'invalid username', res)
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
             return errMsg(400, 'error', 'invalid password', res)
        }
    req.session.userId = user._id;

    const payload = {
        name: user.username,
        email: user.email
    }
        
        successMsg(200, 'success', payload, res)
};

export const logout: RequestHandler = (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return errMsg(500, 'error', error, res)
        } else {
            successMsg(200, 'success', 'successfully logged out', res)
        }
    });
};