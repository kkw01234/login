
const {appDAO} = require("../dao/appdao.js");
const {query} =require("../db/database.js");
const {setCookieTime} = require("../utils/utils.js");
class SessionRepository{
     /**
     * @constructor
     * @param {dao} dao can execute query statment
     */
    constructor(dao){
        this.dao = dao;
        this.makeSessionTable();
    }
    /**
     * session table이 없을 경우 만들어주는 함수
     * 
     * @returns {Boolean} 잘 실행되면 True 실행되지 않으면 False  
     */
    async makeSessionTable(){
        return await this.dao.run(query.createSessionTable());
    }
    /**
     * Session을 db에 저장
     * @param {String} session_id session id
     * @param {String} user_id 유저의 id
     * @param {String} user_name 유저의 name
     * @returns {Boolean}  잘 실행되면 True 실행되지 않으면 False 
     */
    async insertSession(session_id,user_id,user_name){
        return await this.dao.run(query.insertSession(setCookieTime()),[session_id,user_id,user_name]);
    }
    /**
     * Session을 삭제하는 함수
     * @param {String} session_id session id
     * @returns {Boolean} 잘 실행되면 True 실행되지 않으면 False 
     */
    async deleteSession(sessionid){
        return await this.dao.run(query.deleteSession(),[session_id]);
    }
    /**
     * Sessionid에 맞는 Session을 받아오는 함수
     * @param {String} sessionid session_id
     * @returns {Array} sessionid와 일치하는 배열
     */
    async selectSession(sessionid){
        if(!sessionid)
            return [];
        return await this.dao.all(query.findSession(),[sessionid]);
    }
    /**
     * 접속할 때마다 Timeout을 변경하는 함수
     * @param {Object} session session id
     * @returns {Boolean} 현재시간으로 update해주는 함수
     */
    async updateSessionTime(session){//주기변경
        if(!session)
            return false;
        return await this.dao.run(query.updateSessionTime(setCookieTime()),[session.session_id]);
    }
    /**
     * Session이 Timeout이 되면 삭제하는 함수
     * @returns {Boolean} 삭제가 잘 실행되면 true
     */
    async deleteTimeoutSession(){
        await this.dao.run(query.deleteTimeoutSession());
    }

}

module.exports = new SessionRepository(appDAO);