
const {appDAO} = require("../dao/appdao.js");
const {query} =require("../db/database.js");
class SessionRepository{
    constructor(dao){
        this.dao = dao;
        this.makeSessionTable();
    }
    async makeSessionTable(){
        return await this.dao.run(query.createSessionTable());
    }
    async insertSession(sessionid,id,name){
        return await this.dao.run(query.insertSession(),[sessionid,id,name]);
    }
    async deleteSession(sessionid){
        return await this.dao.run(query.deleteSession(),[sessionid]);
    }
    async selectSession(sessionid){
        if(!sessionid)
            return [];
        return await this.dao.run(query.findSession(),[sessionid]);
    }

}

module.exports = new SessionRepository(appDAO);