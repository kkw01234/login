const { query } = require("../db/database.js");
const sqlite3 = require('sqlite3').verbose();
class UserRepository{
    constructor(dao){
        this.dao = dao;
    }
    async makeUser() {
        return this.dao.run(query.createUserTable());
    }
    async checkId(id) {
        return this.dao.all(query.checkId(), [id]);
    }
    async insertUser(user){
        return this.dao.run(query.regtsterUser(),[user.id,user.password,user.name,[user.birthYear,user.birthMonth,user.birthDate].join("-"),user.gender,user.email,user.phone,user.interests])
    }
    async checkUser(id, password){
        return this.dao.all(query.checkUser(),[id, password]);
    }
}








module.exports = {
    UserRepository
}