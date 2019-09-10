const {dbname} = require("../db/database.js");
const sqlite3 = require('sqlite3').verbose();

const appDAO = {
    db : new sqlite3.Database(dbname),
    /**
     * returns appropriate results for the query statement
     * 
     * @param {String} query sql grammar
     * @param {Array} parmas array of variables
     * @returns {Promise} promise with results
     * 
     */
    get(query, params = []){
       return new Promise((resolve,reject)=>{
           this.db.get(query,params, (err, result)=>{
                if(err) reject(err);
                resolve(result);
           });
       }) ;
        
    },
    /**
     * return objects correspond to the query statement
     * query문의 모든 row를 반환해주는 함수
     * 
     * @param {String} query sql grammar
     * @param {Array} parmas array of variables
     * @returns {Promise} promise with results
     * 
     */
    all(query, params = []){
        return new Promise((resolve,reject)=>{
            this.db.all(query, params, function(err, rows){
                if(err) reject(err);
                resolve(rows);
            });
        });
    },
    /**
     * 
     * execute query statemet (결과값이 없는 insert, update)
     * 
     * @param {String} query sql grammar
     * @param {Array} parmas array of variables
     * @returns {Promise} if query is execute correctly, return true else return error
     * 
     */
    run(query, params = []){
        return new Promise((resolve, reject)=>{
            this.db.run(query, params, function(err){
                if(err) reject(err);
                resolve(true);
            })
        });
    }
}

module.exports = {
    appDAO
}