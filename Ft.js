var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/MI');
mongoose.connection.once('connected', function(){
	console.log("Database connected successfully");
});
server.listen(80);


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

var testC = new compteMdl({prenom: "alexis", nom: "surbayrole", promo: 61, solde: 1000, num: comCount+1});
testC.save();
var testCom = new allTran({num: 1,soldeAv: 1000, prix: 12, soldeAp: 1000-12});
testCom.save();
testCom = new allTran({num: 1,soldeAv: 1000, prix: 12, soldeAp: 1000-12-12});
testCom.save();
testCom = new allTran({num: 1,soldeAv: 1000, prix: 12, soldeAp: 1000-12*3});
testCom.save();


io.on('connection', function(socket){
	socket.on('accNum', function(number){
		console.log("accNum reçu");
		var query = compteMdl.find({num: number.num});
		let tmpAcc;
		query.exec(function(err, acc){
			tmpAcc = acc;
		});
		query = allTran.find({num: number.num});
		query.limit(10);
		query.exec(function(err,acc){
			socket.emit('account', {account: tmpAcc, hist: acc});
		});
	});
	socket.on('accName', function(name){
		var query = compteMdl.find({nom: name.tpl});
		let tmpAcc;
		query.exec(function(err, acc){
			tmpAcc = acc;
		});
		query = allTran.find({num: tmpAcc.num});
		query.limit(10);
		query.exec(function(err,acc){
			socket.emit('account', {account: tmpAcc, hist: acc});
		});
	});
	socket.on('accNFC', function(serial){
		var query = compteMdl.find({idCarte: serial.carte});
		let tmpAcc;
		query.exec(function(err,acc){
			tmpAcc = acc;
		});
		query = allTran.find({num: tmpAcc.num});
		query.limit(10);
		query.exec(function(err,acc){
			socket.emit('account', {account: tmpAcc, hist: acc});
		});
	});
	socket.on('operation', function(data){
		var query = compteMdl.find({num: number.num});
		let tmpAcc;
		query.exec(function(err, acc){
			tmpAcc = acc;
		});
		var trans = new allTran({num: data.num, soldeAv: tmpAcc.solde, soldeAp: tmpAcc.solde-data.prix, prix: data.prix});
		trans.save();
		tmpAcc.solde += data.prix;
		tmpAcc.save();
	});
	socket.on('accCreate', function(info){
		let comCount;
		compteMdl.count({}, function(err,c){
			comCount = c;
		});
		var newAcc = new compteMdl({nom: info.nom, prenom: info.prenom, promo: info.promo, idCarte: info.carte, num: comCount+1});
		newAcc.sace();
		socket.emit('accCreateRep', {num: newAcc.num});
	})
});

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});
app.get('*',function(req, res){
	res.sendFile(__dirname + req.url);
});
