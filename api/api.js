const express = require('express');
const bodyParser = require('body-parser');
const dataLayer = require('./data-layer.js');
const users = require('./entities/user.js');
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
    // const u = new users.user(req.username, req.pass);
    // dataLayer.addUser( err => function(respose){
    //     res.send(respose);
    // });
    console.log(req.params);
    res.send('ok');
})

app.post('/demodb', function(req, res){
    dataLayer.createDemoDatabase();
    res.send('ok');//.json(await (queryDatabase()))
     //queryDatabase();
})

app.post('/users', function(req, res){
    
    dataLayer.getUsers( function(respose){
        res.send(respose);
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
