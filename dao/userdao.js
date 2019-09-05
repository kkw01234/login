const { db, query, dbname, table } = require("../db/database.js");
const sqlite3 = require('sqlite3').verbose();
const userdao = {
    async makeUser() {
        const db = new sqlite3.Database(dbname);
        db.each(query.createUserTable());

        db.close();
    },
    async checkId(id) {
      
        const db = new sqlite3.Database(dbname);

        return new Promise((resolve) => {
            db.all(query.checkId(), [id], function (err, rows) {
                resolve(rows.length > 0 ? true : false);
            });
        });
        /*비동기*/


    }
}








module.exports = {
    userdao
}