const {dbname} = require("../db/database.js");
const sqlite3 = require('sqlite3').verbose();

const appDAO = {
    db : new sqlite3.Database(dbname),
    get(query, params = []){
       return new Promise((resolve,reject)=>{
           this.db.get(query,params, (err, result)=>{
                if(err) reject(err);
                resolve(result);
           });
       }) ;
        
    },
    all(query, params = []){
        return new Promise((resolve,reject)=>{
            this.db.all(query, params, function(err, rows){
                console.log(query,params, rows);
                if(err) reject(err);
                resolve(rows);
            });
        });
    },
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