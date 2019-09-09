const path = require('path');
const dbname = path.resolve(__dirname, `ConnectFoundation.db`);

const query = {
    createUserTable() {
        return `CREATE TABLE IF NOT EXISTS user(
        user_id TEXT PRIMARY KEY,
        user_password TEXT,
        user_name TEXT,
        user_birth TEXT,
        user_gender TEXT,
        user_email TEXT,
        user_phone TEXT,
        user_interests TEXT
    )`
    },
    createSessionTable() {
        return `CREATE TABLE IF NOT EXISTS session(
            session_id TEXT PRIMARY KEY,
            user_id TEXT,
            user_name TEXT,
            timeout TEXT
        )`
    },
    checkId() {
        return `SELECT user_id FROM user WHERE user_id = ?`;
    },
    regtsterUser() {
        return `INSERT INTO user VALUES(?,?,?,?,?,?,?,?)`;
    },
    checkUser() {
        return `SELECT user_id,user_name FROM user WhERE user_id = ? and user_password = ?`;
    },
    findSession(){
        return `SELECT * FROM session WHERE session_id = ?`;
    },
    insertSession(maxAge){
        return `INSERT INTO session VALUES(?,?,?, datetime('now', 'localtime', '+${maxAge/1000} seconds'))`;
    },
    deleteSession(){
        return `DELETE FROM session WHERE session_id = ?`;
    },
    deleteTimeoutSession(){
        return `DELETE FROM session WHERE timeout < datetime('now', 'localtime')`;
    },
    updateSessionTime(maxAge){
        return `UPDATE session SET timeout = datetime('now', 'localtime', '+${maxAge/1000} seconds') where session_id = ?`;
    }
}
const table = {
    user: "user"
}

module.exports = {
    dbname,
    query,
    table
}