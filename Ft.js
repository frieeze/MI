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
	exist: {type: Boolean, default: 1},
	prenom: String,
	nom: String, 
	promo: Number, 
	solde: {type: Number, default: 0},
	num: Number,
	idCarte: {type: String, default: null},
});

var hisTran = new mongoose.Schema({
	num: Number,
	date: String,
	soldeAv: Number,
	soldeAp: Number,
	prix: Number,
	negatif: Boolean
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
		});
		query = allTran.find({num: info.num});
		query.limit(10);
		query.exec(function(err,acc){
			socket.emit('account', {account: tmpAcc, hist: acc});
		});
	});
	socket.on('accName', function(info){
		console.log("name");
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
		console.log("operation");
		var query = compteMdl.find({num: number.num});
		var tmpAcc;
		query.exec(function(err, acc){
			tmpAcc = acc;
		});
		var trans = new allTran({num: info.num, soldeAv: tmpAcc.solde, soldeAp: tmpAcc.solde+info.prix, prix: info.prix, date: info.date});
		trans.save();
		tmpAcc.solde += info.prix;
		if(tmpAcc.solde <0){
			tmpAcc.negatif = 1;
		}else{tmpAcc.negatif = 0;}
		tmpAcc.save();
	});
	socket.on('accCreate', function(info){
		console.log("create");
		var comCount;
		compteMdl.count({}, function(err,c){
			comCount = c;
		});
		var newAcc = new compteMdl({nom: info.nom, prenom: info.prenom, promo: info.promo, num: comCount+1});
		newAcc.save();
		socket.emit('accCreateRep', {num: newAcc.num});
		console.log(newAcc);
	});
	socket.on('accDelete', function(info){
		console.log("delete");
		compteMdl.remove({num: info.num});
		allTran.remove({num: info.num});
	});
	socket.on('NFC', function(info){
		compteMdl.update({num: info.num}, {idCarte: info.nfc}, function(err){
			if(err) throw err;
			socket.emit('done', {msg: "compte et carte synchronisés"});
		});
	});
	socket.on('accAll', function(info){
		console.log('comptes');
		if(info.num == 2){
			console.log('tous');
			var query = compteMdl.find({exist: 1});
			query.exec(function(err, acc){
				socket.emit('allAccount', {account: acc});
			});	
		}
		else {
			var query = compteMdl.find({negatif: info.num});
			query.exec(function(err, acc){
				socket.emit('allAccount', {account: acc});
			});
		}
	});

});

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});
app.get('*',function(req, res){
	res.sendFile(__dirname + req.url);
});
