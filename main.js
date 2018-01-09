require.config({
    baseUrl: '',
    paths: {
        jquery:     'libs/jquery',
        handlebars: 'libs/handlebars',
        text:       'libs/text'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        handlebars: {
            exports: 'Handlebars'
        }

    }
});


require(["handlebars","jquery","text!templates/buttons.tpl","text!templates/count.tpl","text!templates/histo.tpl","text!templates/recap.tpl","text!templates/research.tpl","account.js","list.js"/*,"stocks.js"*/],
function(Handlebars,$,templButtons, templCount, templHisto, templRecap, templResearch, AccountController, ListController/*, StocksController*/) {
    
    //var socket = io.connect('http://localhost:8080');
    
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
        $("#password").val('');
        $("#password").hide();
        $("#mdp").hide();
        $("#delog").show();
        if(document.location.href.substring(document.location.href.lastIndexOf( "/" )+1 ) == "account.html"){
            $("#suppr").show();
        }
    }
    
    
    
    if(document.location.href.substring(document.location.href.lastIndexOf( "/" )+1 ) == "index.html"){ //les autres pages js s'occupent de leur propres templates
        var templateButtons = Handlebars.compile(templButtons);
        var templateCount = Handlebars.compile(templCount);
        var templateHisto = Handlebars.compile(templHisto);
        var templateRecap = Handlebars.compile(templRecap);
        var templateResearch = Handlebars.compile(templResearch);
    }
    
    if(document.location.href.substring(document.location.href.lastIndexOf( "/" )+1 ) == "account.html"){
        var accountView = new AccountController();
    }
    
    if(document.location.href.substring(document.location.href.lastIndexOf( "/" )+1 ) == "list.html"){
        var listView = new ListController();
    }
    
    var line = new Array();
    
    var products = [ //ajouter tag a chaque produit
        {
          name : "Coca",
          tag : "coca",
          price : 0.8
        },
        {
          name : "Fanta",
          price : "0,8"
        },
        {
          name : "Oasis",
          price : "0,8"
        },
        {
          name : "Kinder Bueno",
          tag : "kinderbueno",
          price : 0.8
        },
        {
          name : "7UP",
          price : "0,8"
        },
        {
          name : "Coca",
          price : "0,8"
        },
        {
          name : "Fanta",
          price : "0,8"
        },
        {
          name : "Oasis",
          price : "0,8"
        },
        {
          name : "Kinder Bueno",
          price : "0,8"
        },
        {
          name : "7UP",
          price : "0,8"
        },
        {
          name : "M&M's",
          price : "0,8"
        },
        {
          name : "Granola",
          price : "0,8"
        },
        {
          name : "Minute Maid",
          price : "0,8"
        },
        {
          name : "KitKat",
          price : "0,8"
        },
        {
          name : "Fanta",
          price : "0,8"
        },
        {
          name : "Oasis",
          price : "0,8"
        },
        {
          name : "Kinder Bueno",
          price : "0,8"
        },
        {
          name : "7UP",
          price : "0,8"
        },
        {
          name : "M&M's",
          price : "0,8"
        },
        {
          name : "Granola",
          price : "0,8"
        }
        ,
        {
          name : "Minute Maid",
          price : "0,8"
        },
        {
          name : "KitKat",
          price : "0,8"
        },
        {
          name : "M&M's",
          price : "0,8"
        },
        {
          name : "Granola",
          price : "0,8"
        },
        {
          name : "Minute Maid",
          price : "0,8"
        },
        {
          name : "KitKat",
          price : "0,8"
        },
        {
          name : "Sandwich",
          tag : "sandwich",
          price : 2
        },
        {
          name : "Panini",
          tag : "panini",
          price : 2
        },
        {
          name : "Croque",
          tag : "croque",
          price : 1
        },
        {
          name : "Hot Dog",
          tag : "hot dog",
          price : 1
        },
        {
          name : "Pasta Box",
          tag : "pasta",
          price : 2
        }
    ];
    
    var buttons = {
        formules : [
            {
                name : "Formule Sandwich",
                tag : "formSand",
                price : 1
            },
            {
                name : "Formule Panini",
                tag : "formPan",
                price : 2
            },
            {
                name : "Formule Croques",
                tag : "formCroq",
                price : 3
            },
            {
                name : "Formule Hot Dogs",
                price : 4
            },
            {
                name : "Formule Pasta-Box",
                price : 5
            }
            
        ],
        soloProd : products
    };
    
    var price = 0;
    
    var currentAccount = {
        name : "Jean-Michel Truc",
        promo : 61,
        solde : 100,
        histo : [
            {
               date : "01/01/18 10:01",
               soldeBefore : 100,
               price : 15,
               soldeAfter: 85
            },
            {
                date : "03/01/18 20:02",
               soldeBefore : 20,
               price : 17,
               soldeAfter: 3
            }
        ],
        numberAccount : 1
    };
    
    
    if(document.location.href.substring(document.location.href.lastIndexOf( "/" )+1 ) == "index.html"){ //les autres pages js s'occupent de leur propres templates
        $("#research").html(templateResearch);
        $("#buttons").html(templateButtons(buttons));
        $("#recap").html(templateRecap(line));
        $("#histo").html(templateHisto(currentAccount.histo));
        $("#account").html(templateCount(currentAccount));
    }
    
    $(".formule").on('click', function(){ //prix serveur si cochés 
        console.log($("#"+$(this).attr('id')+"Price").text());
        let temp = {
            name : $(this).attr('id'),
            price : $("#"+$(this).attr('id')+"Price").text(),
            quantity : 1
        };
        function isInArray(a){
            return temp.name === a.name;
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
        console.log($("#"+$(this).attr('id')+"Price").text());
        let temp = {
            name : $(this).attr('id'),
            price : $("#"+$(this).attr('id')+"Price").text(),
            quantity : 1
        };
        function isInArray(a){
            return temp.name === a.name;
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
        rpice = 0;
        $("#total").empty();
        $("#total").html(price);
        delete line;
        line = new Array();
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
            $("#recap").html(templateRecap(line));
            $("#account").html(templateCount(currentAccount));
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
    
    /*socket.on('accNum',function(socket){
        console.log('reception');
        console.log(socket);
    })
    
    $("#numberSearch").keypress(function(event){
        if(event.keyCode == 13){
            console.log('emit');
            socket.emit('accNum', $('input[name=numberSearch]').val())
            $("#numberSearch").val('');
        }
    });*/
    
    
    
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
    
    $("#closeAccount").on('click', function(){
        currentAccount = undefined;
        //mettre cookie a null
        $("#histo").html(templateHisto());
        $("#account").empty();
    });
    
});
