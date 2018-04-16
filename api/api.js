const express = require('express');
const bodyParser = require('body-parser');
const dataLayer = require('./data-layer/data-layer-db.js');
const users = require('./models/user.js');
/**
 * Init express package
 */
var app = express();

/** Parsing the request's body as json */
app.use(bodyParser.json());

/**
 * Handle CORS
 */
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    console.log(req.body);

    next();
});

app.post('/register', function(req,res){
    const u = new users.user(req.body.username, req.body.password);
    
    dataLayer.addUser( u , function(response) {
        res.status(200).json(u);
    });
})

app.post('/demodb', function(req, res){

    dataLayer.createDemoDatabase( function(respose){
        res.status(200).send('ok');
    });
})

app.post('/users', function(req, res){
    
    dataLayer.getUsers( function(respose){
        res.status(200).send(respose);
    });
}) 

/**
 * LISTENER 
 * ======== */
var server = app.listen(3000,function(){

    var ts_hms = new  Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    //ts_hms.format("%Y-%m-%d %H:%M:%S");
    console.log('api.js listening on :' + server.address().port + ' Started listening at : ' + ts_hms);
})


// const asyncMiddleware = fn =>
//   (req, res, next) => {
//     Promise.resolve(fn(req, res, next))
//       .catch(next);
//   };

// app.use(function(err, req, res, next) {
//     console.error(err)
//     res.status(500).json({message: 'an error occurred'})
//   });


// app.get('/users/:id', asyncMiddleware(async function(req, res, next){
//     res.json(await getUser(req.params.id))
//   }))
