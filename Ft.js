var http = require('http');
var server = require('express')();
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/MI');
var app = http.Server(server);
var io = require('socket.io')(app);
mongoose.connection.once('connected', function(){
	console.log("Database connected successfully");
});

var comCount = 0;
var tplCompte = new mongoose.Schema({
	prenom: String,
	nom: String, 
	promo: Number, 
	solde: Number,
	num: Number,
	idCarte: {type: String, default: null},
});

var hisTran = new mongoose.Schema({
	num: Number,
	date: {type: Date, default:Date.now},
	soldeAv: Number,
	soldeAp: Number,
	prix: Number
});

var compteMdl = mongoose.model('compteMdl', tplCompte);
var allTran = mongoose.model('allTran', hisTran);

allTran.remove({}, function(err,c){console.log("erased");});
compteMdl.remove({}, function(err,c){console.log("erase");});
compteMdl.count({}, function(err,c){
	comCount = c;
});

/*var testC = new compteMdl({prenom: "alexis", nom: "surbayrole", promo: 61, solde: 1000, num: comCount+1});
testC.save();
var testCom = new allTran({num: 1,soldeAv: 1000, prix: 12, soldeAp: 1000-12});
testCom.save();
testCom = new allTran({num: 1,soldeAv: 1000, prix: 12, soldeAp: 1000-12-12});
testCom.save();
testCom = new allTran({num: 1,soldeAv: 1000, prix: 12, soldeAp: 1000-12*3});
testCom.save();*/

io.sockets.on('accNum',function(socket){
	var query = compteMdl.find({num: socket});
	query.exec(function(err, acc){
		socket.emit('account', acc);
	});
	query = allTran.find({num: socket});
	query.limit(10);
	query.exec(function(err,acc){
		socket.emit('accHist', acc);
	})
});


server.get('/',function(req, res){
	res.sendFile(__dirname + "/index.html");
});
server.get('/index.html',function(req, res){
	res.sendFile(__dirname + "/index.html");
});
server.get('/account', function(req, res){
	res.sendFile(__dirname + "/account.html");
});
server.get('/account.html', function(req, res){
	res.sendFile(__dirname + "/account.html");
});
server.get('/list', function(req, res){
	res.sendFile(__dirname + "/list.html");
});
server.get('/list.html', function(req, res){
	res.sendFile(__dirname + "/list.html");
});
server.get('/stocks', function(req, res){
	res.sendFile(__dirname + "/stocks.html");
});
server.get('/stocks.html', function(req, res){
	res.sendFile(__dirname + "/stocks.html");
});
server.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

server.listen(8080);