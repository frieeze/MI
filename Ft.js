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
	solde: {type: Number, default: 0},
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
var comCount=0;
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
	socket.on('accNum', function(info){
		console.log("accNum reçu");
		var query = compteMdl.find({num: info.num});
		var tmpAcc;
		query.exec(function(err, acc){
			tmpAcc = acc;
			console.log(acc);
		});
		console.log(tmpAcc);
		query = allTran.find({num: info.num});
		query.limit(10);
		query.exec(function(err,acc){
			socket.emit('account', {account: tmpAcc, hist: acc});
		});
	});
	socket.on('accName', function(info){
		var query = compteMdl.find({nom: info.name});
		var tmpAcc;
		query.exec(function(err, acc){
			tmpAcc = acc;
		});
		query = allTran.find({num: tmpAcc.num});
		query.limit(10);
		query.exec(function(err,acc){
			socket.emit('account', {account: tmpAcc, hist: acc});
		});
	});
	socket.on('accNFC', function(info){
		var query = compteMdl.find({idCarte: info.carte});
		var tmpAcc;
		query.exec(function(err,acc){
			tmpAcc = acc;
		});
		query = allTran.find({num: tmpAcc.num});
		query.limit(10);
		query.exec(function(err,acc){
			socket.emit('account', {account: tmpAcc, hist: acc});
		});
	});
	socket.on('operation', function(info){
		var query = compteMdl.find({num: number.num});
		var tmpAcc;
		query.exec(function(err, acc){
			tmpAcc = acc;
		});
		var trans = new allTran({num: info.num, soldeAv: tmpAcc.solde, soldeAp: tmpAcc.solde+info.prix, prix: info.prix});
		trans.save();
		tmpAcc.solde += info.prix;
		tmpAcc.save();
	});
	socket.on('accCreate', function(info){
		var comCount;
		compteMdl.count({}, function(err,c){
			comCount = c;
		});
		var newAcc = new compteMdl({nom: info.nom, prenom: info.prenom, promo: info.promo, idCarte: info.carte, num: comCount+1});
		newAcc.save();
		socket.emit('accCreateRep', {num: newAcc.num});
	});
	socket.on('accDelete', function(info){
		compteMdl.remove({num: info.num});
		allTran.remove({num: info.num});
	});
	socket.on('NFC', function(info){
		compteMdl.update({num: info.num}, {idCarte: info.nfc}, function(err){
			if(err) throw err;
			socket.emit('done', {msg: "compte et carte synchronisés"});
		});
	})

});

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});
app.get('*',function(req, res){
	res.sendFile(__dirname + req.url);
});
