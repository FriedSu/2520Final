const userModel = require("../models/userModel").userModel;

let database = require("../database")

const getUserByEmailAndPassword = (email, password) => {
    let user = userModel.findOne(email);
    if (user) {
        if (user.password === password) {
            return user;
        }
    }
    return null;
};

const getUserByID = (id) => {
    let user = userModel.findById(id);
    if (user) {
        console.log(user)
        return user;
    }
    return null;
};

module.exports = {
    getUserByEmailAndPassword,
    getUserByID,
}