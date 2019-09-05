const path = require('path');
const dbname = path.resolve(__dirname,`ConnectFoundation.db`);
const query = {
    createUserTable(){ return `CREATE TABLE IF NOT EXISTS user(
        user_id TEXT PRIMARY KEY,
        user_password TEXT,
        user_name TEXT,
        user_birth TEXT,
        user_gender TEXT,
        user_email TEXT,
        user_phone TEXT,
        user_interests TEXT
    )`},
     checkId(id){
        return `SELECT user_id FROM user WHERE user_id = ?`;
     },
     regtsterUser(){
         return `INSERT INTO user VALUES(?,?,?,?,?,?,?,?)`;
     }    
}
const table = {
    user : "user"
}

module.exports = {
    dbname,
    query,
    table
}