const pg = require('pg');

/* Postgres starter connection */
const config = {
    host: 'azure-postgre-server.postgres.database.azure.com', 
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: 'sqladmin@azure-postgre-server',     
    password: 'qwe123!@#',
    database: 'postgres',  
    port: 5432,
    ssl: true
};

console.log('DB config data');
console.log('**************');
console.log(JSON.stringify(config));
console.log('DB client status');
console.log('****************');
//console.log(JSON.stringify(client));


const client = new pg.Client(config);

function getClient(){
    const client = new pg.Client(config);

    return client;
}

/** execute sql Command */
module.exports.executeCommand = function(sqlCommand) {

    var client = getClient();

    client.connect(err => {
        if (err) throw err;
        else {
            executeClient(client, sqlCommand);
        }
    });
};

/** Kick start function whcih make new db metadata and demo data */ 
function executeClient(client, sqlCommand) {

    client
        .query(sqlCommand)
        .then(() => {
            console.log('sql command successfully executed!' + sqlCommand);
        })
        .catch(err => 
            console.log(err))
        .then(() => {
            client.end(console.log('Closed client connection'));
            console.log('Finished execution, exiting now');
            //process.exit();
        });
};
 
/** execute sql Command */
module.exports.queryCommand = function(sqlCommand,callback) {
    
    var client = getClient();

    client.connect(err => {
        if (err) throw err;
        else {
            queryClient(client, sqlCommand, function(respose){
                return callback(respose);    
            });
        }
    });
};

/** Kick start function whcih make new db metadata and demo data */ 
function queryClient(client, sqlCommand, callback) {

    const query = client.query(sqlCommand, (err, res) => {
        if(err) throw err;
        else{
            console.log(res.rows);
            return callback(res.rows);
        }
      })

};