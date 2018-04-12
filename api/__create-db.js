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

const client = new pg.Client(config);
client.connect(err => {
    if (err) throw err;
    else {
        CreateDemoDatabase();
    }
});

function CreateDemoDatabase() {
    const query = `
        DROP TABLE IF EXISTS users;
        CREATE TABLE users (id serial PRIMARY KEY, username VARCHAR(500), pass VARCHAR(500));
        INSERT INTO users (username, pass) VALUES ('demo@demo.com', 'demopass');
    `;

    client
        .query(query)
        .then(() => {
            console.log('Table created successfully!');
            client.end(console.log('Closed client connection'));
        })
        .catch(err => console.log(err))
        .then(() => {
            console.log('Finished execution, exiting now');
            process.exit();
        });
}

