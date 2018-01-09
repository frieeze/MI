require.config({
    baseUrl: '',
    paths: {
        jquery:     'libs/jquery',
        handlebars: 'libs/handlebars',
        text:       'libs/text',
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


require(["handlebars","jquery","text!templates/buttons.tpl","text!templates/count.tpl","text!templates/histo.tpl","text!templates/recap.tpl","text!templates/research.tpl"],
function(Handlebars,$,templButtons, templCount, templHisto, templRecap, templResearch) {
    
    var password = "MaisonISEN";
    admin = false;
    
    Handlebars.registerHelper('ifColor', function(a, options){
        if(a>=0) {
            return options.fn(this);
        }
        else{
            return options.inverse(this);
        }
    });

    var templateButtons = Handlebars.compile(templButtons);
    var templateCount = Handlebars.compile(templCount);
    var templateHisto = Handlebars.compile(templHisto);
    var templateRecap = Handlebars.compile(templRecap);
    var templateResearch = Handlebars.compile(templResearch);
    
    var line = new Array();
    
    var products = [
        {
          name : "A",
          price : 1
        },
        {
          name : "B",
          price : 2
        },
        {
          name : "C",
          price : 3
        },
        {
          name : "D",
          price : 4
        },
        {
          name : "E",
          price : 5
        },
        {
          name : "F",
          price : 6
        }
    ];
    
    var buttons = {
        formules : [
            {
                name : "f1",
                price : 7
            },
            {
                name : "f2",
                price : 8
            },
            {
                name : "f3",
                price : 9
            }
        ],
        soloProd : products
    };
    
    var price = 0;
    
    var currentAccount = {
        name : "Jean-Michel Truc",
        promo : 61,
        solde : 100,
        numberAccount : 001,
        histo : new Array()
    };
    
    $("#research").html(templateResearch());
    $("#buttons").html(templateButtons(buttons));
    $("#recap").html(templateRecap(line));
    $("#histo").html(templateHisto(currentAccount.histo));
    $("#account").html(templateCount(currentAccount));
    
    
    $(".formule").on('click', function(){
        let temp = {
            name : $(this).attr('id'),
            price : $("#"+$(this).attr('id')+"Price").text(),
            quantity : 1
        };
        function isInArray(a){
            return temp.name === a.name;
        }
        if(line.find(isInArray)){
            console.log(line.find(isInArray));
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
    
    $(".prod").on('click', function(){
        let temp = {
            name : $(this).attr('id'),
            price : $("#"+$(this).attr('id')+"Price").text(),
            quantity : 1
        };
        function isInArray(a){
            return temp.name === a.name;
        }
        if(line.find(isInArray)){
            console.log(line.find(isInArray));
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
        $("#account").html(templateCount(currentAccount));
        $("#histo").html(templateHisto(currentAccount.histo));
    });
    
    $("#linkAccount").on('click', function(){
        document.location.href="./account.html";
    });
    
    $("#password").keypress(function(event){
        if(event.keyCode == 13){
            console.log($('input[name=password]').val());
            console.log(password);
            if($('input[name=password]').val() == password){
                admin = true;
                $("#logged").empty();
                $("#logged").html("Accès Admin");
            }
        }
    });
    
});
