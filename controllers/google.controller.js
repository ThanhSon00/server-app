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
    const members = await memberService.getMembers({ googleId });
    const hasSigned = members[0];
    if (hasSigned) {
        return res.status(StatusCodes.OK).json(members[0]);
    }

    const member = await memberService.createMember({ name, googleId, avatar: picture, accountId: 1 });

    return res.status(StatusCodes.OK).json(member);
}

module.exports = {
    googleLogin,
    googleRegister,
}