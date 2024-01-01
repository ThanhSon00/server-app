const { Account } = require("../models")

const getAccount = (id) => {
    return Account.findByPk(id);
}

const getAccounts = (conditions) => {
    return Account.findAll({ where: conditions });
}

const createAccount = (accountAttrs) => {
    return Account.create(accountAttrs);
}

const updateAccount = async (id, accountAttrs) => {
    const account = await getAccount(id);
    account.set(accountAttrs);
    
    await account.save();
    return account;
}

module.exports = {
    getAccount,
    getAccounts,
    createAccount,
    updateAccount,
}