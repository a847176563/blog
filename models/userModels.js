const db = require('./db');

module.exports = {
    getUserByNameAndPwd(username, password){
        return db.query('SELECT * FROM t_user where username = ? and password = ? ', [username, password])
    },
    saveUserData({ username, password, nickname }){
        console.log('regist',{ username, password, nickname });
        return db.query('INSERT INTO t_user set ?', { username, password, nickname })
    },
    getUserDataByName(username){
        return db.query('SELECT * FROM t_user where username = ? ', [username])
    }


};