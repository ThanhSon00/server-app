const { Vote } = require('../models');

const getVotes = (conditions) => {
    return Vote.findAll({ where: [conditions]});
}

const createVote = (data) => {
    return Vote.create(data);
}

const deleteVote = (conditions) => {
    return Vote.destroy({ where: [conditions], individualHooks: true });
}

const updateVote = async (conditions, attrs) => {
    const votes = await getVotes(conditions);
    const vote = votes[0];
    
    if (!vote) {
        return null;
    }
    vote.set(attrs);

    await vote.save();
    return vote;
    
}
module.exports = {
    getVotes,
    createVote,
    deleteVote,
    updateVote,
}