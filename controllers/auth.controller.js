const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const sequelize = require('../database/connect');
const { accountService, memberService } = require('../services')
const nodemailer = require('nodemailer');
const { renderFileAsync, sendMail } = require('../utils/mail');

const login = async (req, res) => {
    const accounts = await accountService.getAccounts(req.body);
    if (!accounts[0]) {
        return res.status(StatusCodes.BAD_REQUEST).send()
    }
    const member = await memberService.getMembers({ accountId: accounts[0].id });
    return res.status(StatusCodes.OK).send(member);
}

const register = async (req, res) => {
    const { password, confirmPassword, email } = req.body;
    if (!email) {
        return res.status(StatusCodes.BAD_REQUEST).send('Email is required');
    }

    if (password != confirmPassword) {
        return res.status(StatusCodes.BAD_REQUEST).send('Passwords are not matched');
    }

    const accounts = await accountService.getAccounts({ email });
    const account = accounts[0];

    if (account) {
        return res.status(StatusCodes.BAD_REQUEST).send('Email has been used');
    }
    sequelize.transaction(async (t) => {
        const account = await accountService.createAccount(req.body);
        const member = await memberService.createMember({ accountId: account.dataValues.id, ...req.body });
        return res.status(StatusCodes.CREATED).json({ member });     
    })
}

const verification = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(StatusCodes.BAD_REQUEST).send();

    const accounts = await accountService.getAccounts({ email });

    if (!accounts[0]) {
        return res.status(StatusCodes.BAD_REQUEST).send('Email not found');
    }
    
    const resetPwdForm = await renderFileAsync("./views/request-reset-password.ejs", { id: accounts[0].id });
    const hasSent = await sendMail(email, resetPwdForm);

    if (!hasSent) return res.status(StatusCodes.NOT_FOUND).send("Email not found"); 
    const message = `Password Reset Mail has been sent to ${email}. Please check your email.`;

    return res.status(StatusCodes.OK).send(message);
}

const resetPassword = async (req, res) => {
    const { password, confirmPassword, id } = req.body;
    if (!password || !confirmPassword) {
        return res.status(StatusCodes.BAD_REQUEST).send('Passwords are not matched');
    } 
    if (password != confirmPassword) {
        return res.status(StatusCodes.BAD_REQUEST).send('Passwords are not matched');
    }
    await accountService.updateAccount(id, { password });
    return res.status(StatusCodes.OK).send();
}

const authenticateUser = async (req, res) => {
    const { access_token: accessToken } = req.cookies;
    const payload = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    return res.status(StatusCodes.OK).json(payload);
}

module.exports = {
    login,
    register,
    verification,
    resetPassword,  
    authenticateUser,
}