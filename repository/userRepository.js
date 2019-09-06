const { query } = require("../db/database.js");
const sqlite3 = require('sqlite3').verbose();
class UserRepository{
    /**
     * @constructor
     * @param {dao} dao can execute query statment
     */
    
    constructor(dao){
        this.dao = dao;
    }
    /**
     * if not exist user table, create user table
     * @return {result} if query is execute correctly, return true. else return err
     * 
     */
    async makeUser() {
        return await this.dao.run(query.createUserTable());
    }
    /**
     * 
     * @param {String} id user's id
     * @returns {String} query result 
     * 
     */
    async checkId(id) {
        return await this.dao.all(query.checkId(), [id]);
    }
    /**
     * insert user in the database
     * @param {Object} user 
     * @returns {Boolean} if query is execute correctly, return true else return error
     * 
     */
    async insertUser(user){
        return await this.dao.run(query.regtsterUser(),[user.id,user.password,user.name,[user.birthYear,user.birthMonth,user.birthDate].join("-"),user.gender,user.email,user.phone,user.interests])
    }
    /**
     * if user want to log in, check id and password
     * 
     * @param {String} id input user's id
     * @param {String} password input user's password
     * @returns {String} if id and password exist in database, return user's object 
     */
    async checkUser(id, password){
        return await this.dao.all(query.checkUser(),[id, password]);
    }
}








module.exports = {
    UserRepository
}