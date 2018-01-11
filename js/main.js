require.config({
    baseUrl: '',
    paths: {
        jquery:     'libs/jquery',
        handlebars: 'libs/handlebars',
        text:       'libs/text',
        socketio:   '/socket.io/socket.io'
    },
    shim: {
        socketio: {
            export: 'io'
        },
        jquery: {
            exports: '$'
        },
        handlebars: {
            exports: 'Handlebars'
        }

    }
});




require(["socketio","handlebars","jquery","text!templates/buttons.tpl","text!templates/count.tpl","text!templates/histo.tpl","text!templates/recap.tpl","text!templates/research.tpl","text!templates/account.tpl","js/account.js","js/list.js"/*,"js/stocks.js"*/],
function(io,Handlebars,$,templButtons, templCount, templHisto, templRecap, templResearch, templAccount, AccountController, ListController/*, StocksController*/) {
    
    var socket = io.connect('http://localhost:80'); 
    var password = "MaisonISEN";
    
    Handlebars.registerHelper('ifColor', function(a, options){
        if(a>=0) {
            return options.fn(this);
        }
        else{
            return options.inverse(this);
        }
    });
    
    //-------------------Fonction cookies-------------------------
    function createCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name,"",-1);
    }
    //-----------------------------------------------------

    if(readCookie('admin') == null || readCookie('admin') == 'false'){
        admin = false;
    }
    else if(readCookie('admin') == 'true'){
        admin = true;
        $("#logged").empty();
        $("#logged").html("Administrateur");
        $("#password").val('');
        $("#password").hide();
        $("#mdp").hide();
        $("#delog").show();
        if(document.location.href.substring(document.location.href.lastIndexOf( "/" )+1 ) == "account.html"){
            $("#suppr").show();
        }
    }
    
    if(readCookie('numAccCurr') != null){
        //socket.emit('accNum', {num: readCookie('numAccCurr')});
    }
    
    var templateButtons = Handlebars.compile(templButtons);
    var templateCount = Handlebars.compile(templCount);
    var templateAccount = Handlebars.compile(templAccount);
    var templateHisto = Handlebars.compile(templHisto);
    var templateRecap = Handlebars.compile(templRecap);
    var templateResearch = Handlebars.compile(templResearch);
    
    if(document.location.href.substring(document.location.href.lastIndexOf( "/" )+1 ) == "account.html"){
        var accountView = new AccountController();
        console.log("test");
    }
    
    if(document.location.href.substring(document.location.href.lastIndexOf( "/" )+1 ) == "list.html"){
        var listView = new ListController();
    }
    
    var line = new Array();
    
    var products = [ //ajouter tag a chaque produit
        {
          name : "Coca",
          tag : "coca",
          price : 0.8,
		  priceS : 0.5
        },
        {
          name : "Coca Zero",
          tag : "cocaZ",
          price : 0.8,
		  priceS : 0.5
        },
        {
          name : "Coca Cherry",
          tag : "cocaC",
          price : 0.8,
		  priceS : 0.5
        },
        {
          name : "Fanta",
          tag : "fanta",
          price : 0.8,
		  priceS : 0.5
        },
		{
          name : "Fanta Citron",
          tag : "fantaC",
          price : 0.8,
		  priceS : 0.5
        },
        {
          name : "Minute Maid",
          tag : "minuteMP",
          price : 0.8,
		  priceS : 0.5
        },
        {
          name : "Oasis",
          tag : "oasis",
          price : 0.8,
		  priceS : 0.5
        },
        {
          name : "Oasis PCF",
          tag : "oasisPCF",
          price : 0.8,
		  priceS : 0.5
        },
        {
          name : "7UP",
          tag : "7up",
          price : 0.8,
		  priceS : 0.5
        },
        {
          name : "Ice Tea",
          tag : "iceTea",
          price : 0.8,
		  priceS : 0.5
        },
        {
          name : "Schweppes",
          tag : "schwp",
          price : 0.8,
		  priceS : 0.5
        },
        {
          name : "Cacolac",
          tag : "cacolac",
          price : 0.8,
		  priceS : 0.5
        },
		{
          name : "Eau",
          tag : "eau",
          price : 0.5,
		  priceS : 0.3
        },
        {
          name : "Granola",
          tag : "granola",
          price : 0.8,
		  priceS : 0.6
        },
        {
          name : "Bueno",
          tag : "bueno",
          price : 0.8,
		  priceS : 0.6
        },
        {
          name : "Bueno White",
          tag : "buenoW",
          price : 0.8,
		  priceS : 0.6	
        },
        {
          name : "KitKat",
          tag : "kitkat",
          price : 0.6,
		  priceS : 0.3
        },
        {
          name : "Skittles",
          tag : "skittles",
          price : 0.7,
		  priceS : 0.5
        },
        {
          name : "M&M's",
          tag : "mms",
          price : 0.6,
		  priceS : 0.3	
        },
        {
          name : "Twix",
          tag : "twix",
          price : 0.6,
		  priceS : 0.3
        },
        {
          name : "Snickers",
          tag : "snickers",
          price : 0.6,
		  priceS : 0.3
        },
        {
          name : "Chips BBQ",
          tag : "chipsB",
          price : 0.7,
		  priceS : 0.5
        },
        {
          name : "Chips Poulet",
          tag : "chipsP",
          price : 0.7,
		  priceS : 0.5
        },
        {
          name : "Chips",
          tag : "chips",
          price : 0.7,
		  priceS : 0.5
        },
        {
          name : "Sandwich",
          tag : "sandwich",
          price : 2,
		  priceS : 1.5
        },
        {
          name : "Panini",
          tag : "panini",
          price : 2,
		  priceS : 1.5
        },
        {
          name : "Croque",
          tag : "croque",
          price : 1,
		  priceS : 0.5
        },
		{
          name : "Hot Dog",
          tag : "hotdog",
          price : 1,
		  priceS : 0.5
        },
		{
          name : "Croque Raclette",
          tag : "croqueRa",
          price : 1,
		  priceS : 0.5
        },
		{
          name : "Croque Rosette",
          tag : "croqueRo",
          price : 1,
		  priceS : 0.5
        },
        {
          name : "Pasta Box",
          tag : "pasta",
          price : 2,
		  priceS : 1.5
        },
		{
          name : "Ramen",
          tag : "ramen",
          price : 2,
		  priceS : 1.5
        }
    ];
    
    var buttons = {
        formules : [
            {
                name : "Menu Sandwich",
                tag : "formSand",
                price : 3,
		  		priceS : 2
            },
            {
                name : "Menu Panini",
                tag : "formPan",
                price : 3,
		  		priceS : 2
            },
            {
                name : "Menu Croques",
                tag : "formCroq",
                price : 3,
		  		priceS : 2
            },
			{
                name : "Menu Croques Raclette",
                tag : "formCroqRa",
                price : 3,
		  		priceS : 2.3
            },
            {
                name : "Menu Hot Dogs",
				tag : "formHD",
                price : 3,
		  		priceS : 2
            },
            {
                name : "Menu Pasta Box",
				tag : "formPB",
                price : 3,
		  		priceS : 2
            }
            
        ],
        soloProd : products
    };
    
    var price = 0;
    
    var currentAccount = {
        
    };
    
    
    if(document.location.href.substring(document.location.href.lastIndexOf( "/" )+1 ) == "index.html"){ //les autres pages js s'occupent de leur propres templates
        $("#research").html(templateResearch);
        $("#buttons").html(templateButtons(buttons));
        $("#recap").html(templateRecap(line));
        $("#histo").html(templateHisto(currentAccount.histo));
        //$("#account").html(templateCount(currentAccount));
    }
    
    $(".formule").on('click', function(){ //prix serveur si cochés 
        let temp = {
            name : $("#"+$(this).attr('id')+"Name").text(),
            price : $("#"+$(this).attr('id')+"Price").text(),
            quantity : 1
        };
        function isInArray(a){
            return temp.name === a.name;
        }
        if($("#serveur").is('checked')){
            temp.price = buttons.find(isInArray).priceS;
			console.log(temp.price);
        }
        if(line.find(isInArray)){
            line.find(isInArray).quantity++;
        }
        else{
           line.push(temp);
        }
        price = parseFloat(price) + parseFloat(temp.price);
        $("#total").empty();
        $("#total").html(price);
        $("#recap").html(templateRecap(line));
    });
    
    $(".prod").on('click', function(){ //prix serveur si cochés 
        let temp = {
            name : $("#"+$(this).attr('id')+"Name").text(),
            price : $("#"+$(this).attr('id')+"Price").text(),
            quantity : 1
        };
        function isInArray(a){
            return temp.name === a.name;
        }
        if($("#serveur").is('checked')){
            temp.price = products.find(isInArray).priceS;
        }
        if(line.find(isInArray)){
            line.find(isInArray).quantity++;
        }
        else{
           line.push(temp);
        }
        price = parseFloat(price) + parseFloat(temp.price);
        $("#total").empty();
        $("#total").html(price);
        $("#recap").html(templateRecap(line));
    });
    
    $("#cancel").on('click', function(){
        price = 0;
        $("#total").empty();
        $("#total").html(price);
        delete line;
        line = new Array();
        $("#recap").html(templateRecap(line));
    });
    
    $("#liquide").on('click', function(){
        window.alert('Payé en liquide');
        price = 0;
        $("#total").empty();
        $("#total").html(price);
        delete line;
        line = new Array();
        if($("input[name=serveur]").is('checked')){
            $("input[name=serveur]").prop('checked', false);
        }
        $("#recap").html(templateRecap(line));
    });
    
    $("#payer").on('click', function(){
        if(currentAccount == undefined){
            window.alert("Impossible, pas de compte choisi");
            price = 0;
            $("#total").empty();
            $("#total").html(price);
            delete line;
            line = new Array();
            if($("input[name=serveur]").is('checked')){
                $("input[name=serveur]").prop('checked', false);
            }
            $("#recap").html(templateRecap(line));
            $("#histo").html(templateHisto(currentAccount.histo));
            return;
        }
        if(parseFloat(currentAccount.solde) - parseFloat(price) < -4){
            window.alert("Impossible, ce compte passera sous les -4€ de négatif !");
            price = 0;
            $("#total").empty();
            $("#total").html(price);
            delete line;
            line = new Array();
            if($("input[name=serveur]").is('checked')){
                $("input[name=serveur]").prop('checked', false);
            }
            $("#recap").html(templateRecap(line));
            $("#account").html(templateCount(currentAccount));
            $("#histo").html(templateHisto(currentAccount.histo));
            return;
        }
        let date = new Date();
        let temp = {
            date: date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" - "+date.getHours()+":"+date.getMinutes(),
            soldeBefore: currentAccount.solde,
            soldeAfter: 0,
            price : price
        }
        currentAccount.solde = parseFloat(currentAccount.solde) - parseFloat(price);
        temp.soldeAfter = currentAccount.solde;
        price = 0;
        $("#total").empty();
        $("#total").html(price);
        delete line;
        line = new Array();
        currentAccount.histo.push(temp);
        if($("input[name=serveur]").is('checked')){
            $("input[name=serveur]").prop('checked', false);
        }
        $("#recap").html(templateRecap(line));
        $("#soldeSpan").html(currentAccount.solde);
        $("#histo").html(templateHisto(currentAccount.histo));
    }); //mettre emit pour changer le solde BDD
    
    $("#linkAccount").on('click', function(){
        document.location.href="./account.html";
    });
    
    $("#password").keypress(function(event){
        if(event.keyCode == 13){
            if($('input[name=password]').val() == password){
                admin = true;
                $("#logged").empty();
                $("#logged").html("Administrateur");
                $("#password").val('');
                $("#password").hide();
                $("#mdp").hide();
                $("#delog").show();
                if(document.location.href.substring(document.location.href.lastIndexOf( "/" )+1 ) == "account.html"){
                    $("#suppr").show();
                }
                createCookie('admin','true',0);
            }
        }
    });
    

    socket.on('account',function(socket){
        delete currentAccount;
        currentAccount = {
            name : socket.account[0].prenom + " " + socket.account[0].nom,
            promo : socket.account[0].promo,
            solde : socket.account[0].solde, 
            numberAccount : socket.account[0].num,
            histo : new Array()
        };
        if(document.location.href.substring(document.location.href.lastIndexOf( "/" )+1 ) == "index.html"){
           $("#account").html(templateCount(currentAccount));
        }
        else if(document.location.href.substring(document.location.href.lastIndexOf( "/" )+1 ) == "account.html"){
            console.log("test");
            $("#info").html(templateAccount(currentAccount));
        }
        $("#closeAccount").on('click', delog);
        $("#linkAccount").on('click', function(){
            document.location.href="./account.html";
        });
        $("#histo").html(templateHisto());
        createCookie('numAccCurr', currentAccount.numberAccount, 0);
    })
    
    socket.on('accHist',function(socket){
        console.log('reception');
        console.log(socket);
        
        $("#histo").html(templateHisto());
    })
    
    $("#numberSearch").keypress(function(event){
        if(event.keyCode == 13){
            socket.emit('accNum', {num: $('input[name=numberSearch]').val()});
            $("#numberSearch").val('');
        }
    });
    
    
    
    $("#delog").on('click', function(){
        admin = false;
        $("#logged").empty();
        $("#logged").html("Vendeur");
        $("#password").show();
        $("#mdp").show();
        $("#delog").hide();
        if(document.location.href.substring(document.location.href.lastIndexOf( "/" )+1 ) == "account.html"){
            $("#suppr").hide();
        }
        createCookie('admin','false',0);
    });
    
    
    var delog = function(){
        currentAccount = undefined;
        createCookie('numAccCurr', null, 0);
        //mettre cookie a null
        $("#histo").html(templateHisto());
        $("#account").empty();
    }
    $("#closeAccount").on('click', delog);
    
});