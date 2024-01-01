const Member = require("../models/Member")

const getMember = (id) => {
    return Member.findByPk(id);
}

const getMembers = (conditions) => {
    return Member.findAll({ where: conditions });
}

const createMember = (memberAttrs) => {
    return Member.create(memberAttrs);
}

const updateMember = async (id, memberAttrs) => {
    const member = await getMember(id);
    member.set(memberAttrs);
    await member.save();
    return member;
}
module.exports = {
    updateMember,
    getMember,
    getMembers,
    createMember,
}