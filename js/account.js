define(["handlebars","jquery","text!templates/histo.tpl","text!templates/research.tpl","text!templates/account.tpl","socketio"],
function(Handlebars,$,templHisto, templResearch, templAccount, io) {
    
    var AccountController = function(){
        var templateHisto = Handlebars.compile(templHisto);
        var templateAccount = Handlebars.compile(templAccount);
        var templateResearch = Handlebars.compile(templResearch);

        
        $("#research").html(templateResearch);
        $("#histo").html(templateHisto);
        
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

        if(readCookie('admin') == 'false'){
            $("#suppr").hide();
        }
        var socket = io.connect('http://localhost:80');
        socket.emit('accNum', {num : readCookie('numAccCurr')});

        $("#ajoutRetrait").keypress(function(event){
            if(event.keyCode == 13){
                if(currentAccount.solde - $('input[name=entry]').val() > -4){
                    let date = new Date();
                    let temp = {
                        date: date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" - "+date.getHours()+":"+date.getMinutes(),
                        soldeBefore: currentAccount.solde,
                        soldeAfter: currentAccount.solde - $('input[name=entry]').val(),
                        price : $('input[name=entry]').val()
                    }
                    currentAccount.solde = currentAccount.solde - $('input[name=entry]').val();
                    currentAccount.histo.push(temp);
                    $("#histo").html(templateHisto(currentAccount.histo));
                    $("#entry").val('');
                }
                else{
                    window.alert("Impossible, ce compte passera sous les -4€ de négatif !");
                    $("#entry").val('');
                }
            }
        }); //mettre emit pour changer le solde BDD
        
        
        //fonction suppression
        $("#suppr").on('click', function(){
            //emit suppression
            //vider cookie
            //redirection
        });
        
        //fonction ajout NFC
        $("#addNFC").on('click', function(){
            //juste emit NFC
        });
    };
    
    return AccountController;
});