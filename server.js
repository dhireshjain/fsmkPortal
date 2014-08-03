var express = require("express");

var expressValidator = require('express-validator');

var http = require("http");

var bodyparser = require("body-parser")

var cookieParser = require("cookie-parser");

var expressSession = require('express-session');

var mongodb = require('mongodb')

var flash = require('connect-flash');

var server = express();

var MongoClient = mongodb.MongoClient;

var Server = mongodb.Server;

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, conn) {
    var db = conn.db("college");
    handle_requests(db);
});


var store = new expressSession.MemoryStore;

server.use(express.static('./public'));

server.use(bodyparser());

server.use(cookieParser());

server.use(expressValidator());

server.use(expressSession({
    secret: 'token',
    store: store
}));

server.set('view engine', 'jade')

server.set('views', './views')

server.use(flash());

server.get('/', function(req, res) {

    if (!req.session.user)
       {	
		res.render('index');
       }
    else
	{
		
        	
	}
});

server.get('/about', function(req, res) {

   	res.render('index', { messages: req.flash() });
    	
});

server.post('/registration', function(req, res) {

    console.log(req.body.name.toString().length);

	req.assert('name', 'Please enter a name').notEmpty();
	req.assert('email', 'Please enter a valid email').len(6,64).isEmail();

   //req.flash('info', 'Field(s) cannot be empty!')

   var errors = req.validationErrors();

   if(errors)
   {	req.flash('info', 'ddd');	
	res.render('signup', { messages: req.flash() }, {ok: 'asd'});
   }
	res.end();
});

server.get('/loggingin', function(req, res) {

    req.flash('info', 'Flash is back!')
    res.redirect('/');

});

server.post('/login', function(req, res) {

    console.log(req.body.username);

    if (req.body.password == "dhiresh" && req.body.username == "dhiresh") {
	
	req.flash('info', 'Flash is back!')

        req.session.user = req.param('username');

        res.redirect('/');
    } else
	{	
        	res.redirect('/signup.html');
	}
});

server.get('/sign', function(req, res) {

    res.render('signup');

});


server.get('/loggedin.html', function(req, res) {

    if (req.session.user)
        res.redirect('/signup.html');
    else
        res.send("HOW DARE THOU!");

});

server.get('/logout', function(req, res) {

    req.session.user = null;

    res.redirect('/home.html');
});

server.post('/almostcreated', function(req, res) {

    if (req.body.college.length != 0 && req.body.date.length != 0 && req.body.event.length != 0 && req.body.location.length != 0) {
        res.send('/');

    }

    res.redirect('/session.html');

});


function handle_requests(db) {
    var user = {}

    server.post('/create', function(req, res) {

    });

}

server.listen(8080);
