const path = require('path');
const dbname = path.resolve(__dirname, `../db/ConnectFoundation.db`);

const query = {
    /**
     * user table query문을 만드는 함수
     * @returns {String} query
     */
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
    /**
     * session table을 만드는 함수
     * @returns {String} query
     */
    createSessionTable() {
        return `CREATE TABLE IF NOT EXISTS session(
            session_id TEXT PRIMARY KEY,
            user_id TEXT,
            user_name TEXT,
            timeout TEXT
        )`
    },
     /**
     * id가 db에 있는지 없는지 확인하는 query를 return하는 함수
     * @returns {String} query
     */
    checkId() {
        return `SELECT user_id FROM user WHERE user_id = ?`;
    },
     /**
     * 
     * @returns {String} query
     */
    registerUser() {
        return `INSERT INTO user VALUES(?,?,?,?,?,?,?,?)`;
    },
     /**
     * user의 id와 password를 확인하는 query return 하는 함수
     * @returns {String} query
     */
    checkUser() {
        return `SELECT user_id,user_name FROM user WhERE user_id = ? and user_password = ?`;
    },
     /**
     * session을 확인하는 query
     * @returns {String} query
     */
    findSession(){
        return `SELECT * FROM session WHERE session_id = ?`;
    },
    /**
     * session을 추가하는 query 
     * @param {Number} maxAge Cookie 시간
     * @returns {String} query
     */
    insertSession(maxAge){
        return `INSERT INTO session VALUES(?,?,?, datetime('now', 'localtime', '+${maxAge/1000} seconds'))`;
    },
    /**
     * Session을 삭제하는 query
     * @returns {String} query
     */
    deleteSession(){
        return `DELETE FROM session WHERE session_id = ?`;
    },
    /**
     * 시간초과하는 session을 모두 삭제하는 query 
     * @returns {String} query
     */
    deleteTimeoutSession(){
        return `DELETE FROM session WHERE timeout < datetime('now', 'localtime')`;
    },
    /**
     * Sesion시간을 재설정해주는 query
     * @param {Number} maxAge Cookie 시간
     * @returns {String} query
     */
    updateSessionTime(maxAge){
        return `UPDATE session SET timeout = datetime('now', 'localtime', '+${maxAge/1000} seconds') where session_id = ?`;
    }
}
const table = {
    user: "user",
    session : "session"
}

module.exports = {
    dbname,
    query,
    table
}