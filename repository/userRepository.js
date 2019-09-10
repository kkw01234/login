const {appDAO} = require("../dao/appdao.js");
const { query } = require("../db/database.js");

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
     * find id
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
        if(user.id == null || user.password == null || user.name==null || user.birth==null || user.gender==null || user.email == null || user.interests == null){
            return false;
        }
        return await this.dao.run(query.registerUser(),[user.id,user.password,user.name,user.birth.join("-"),user.gender,user.email,user.phone,user.interests.join(",")])
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







module.exports = new UserRepository(appDAO);