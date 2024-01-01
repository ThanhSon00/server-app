const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');
const { memberService } = require("../services");

const googleLogin = async (req, res) => {
}

const googleRegister = async (req, res) => {
    const { credential } = req.body;
    
    if (!credential) {
        return res.status(StatusCodes.BAD_REQUEST).send();
    }

    const { name, email: googleId, picture } = jwt.decode(credential);
    console.log(picture);
    const member = await memberService.createMember({ name, googleId, avatar: picture, accountId: 1 });
    const accessToken = jwt.sign({ id: 1, email: googleId }, process.env.ACCESS_SECRET);
    
    res.cookie('accessToken', accessToken);
    return res.status(StatusCodes.OK).json(member);
}

module.exports = {
    googleLogin,
    googleRegister,
}