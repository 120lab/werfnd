const db = require('./postgres-db-provider.js');

/** Kick start function whcih make new db metadata and demo data */ 
module.exports.createDemoDatabase = function(callback) {
    const sql = `
        DROP TABLE IF EXISTS users;
        CREATE TABLE users (id serial PRIMARY KEY, username VARCHAR(500), password VARCHAR(500));
        INSERT INTO users (username, password) VALUES ('demo@demo.com', 'demopass');
    `;
    
    
    db.executeCommand(sql , function(respose){
        return callback(respose);
    });
}

/**
 * Add user to db
 * @param {*user object} user 
 */
module.exports.addUser = function(user, callback) {
    const sql = `
        INSERT INTO users (username, password) VALUES ('` + user.username +  `','` + user.password + `');
    `;
    
    db.executeCommand(sql , function(respose){
        return callback(respose);
    });
}

/**
 * get all users
 * @param {*return value} callback 
 */
module.exports.getUsers = function(callback) {

    const sql = `SELECT * FROM users;`;

    db.queryCommand(sql, function(respose){
        return callback(respose);    
    });

}
