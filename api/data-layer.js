const db = require('./postgres-db-provider.js');

/** Kick start function whcih make new db metadata and demo data */ 
module.exports.createDemoDatabase = function() {
    const sql = `
        DROP TABLE IF EXISTS users;
        CREATE TABLE users (id serial PRIMARY KEY, username VARCHAR(500), password VARCHAR(500));
        INSERT INTO users (username, password) VALUES ('demo@demo.com', 'demopass');
    `;
    
    db.executeCommand(sql);
}

/**
 * Add user to db
 * @param {*user object} user 
 */
module.exports.addUser = function(user) {
    const sql = `
        INSERT INTO users (username, pass) VALUES (` + user.username +  `,` + user.password + `);
    `;
    
    db.executeCommand(sql);
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

//var getUsers = function(){
    // var result = [{user: idan},{user:Yoram}];

    // return JSON.stringify(results);
    // const query = 'SELECT * FROM users;';
    // client.query(query)
    // .then(res => {
    //     const rows = res.rows;

    //     rows.map(row => {
    //         console.log(`Read: ${JSON.stringify(row)}`);
    //         result.push(row);
    //     });

    //     //process.exit();
    //     console.log(JSON.stringify(result));
    //     return JSON.stringify(result);
    // })
    // .catch(err => {
    //     console.log(err);
    // });
//}

