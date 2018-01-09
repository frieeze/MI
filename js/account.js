define(["handlebars","jquery","text!templates/histo.tpl","text!templates/research.tpl"],
function(Handlebars,$,templHisto, templResearch) {
    
    var AccountController = function(){
        var templateHisto = Handlebars.compile(templHisto);
        var templateResearch = Handlebars.compile(templResearch);

        $("#research").html(templateResearch);
        $("#histo").html(templateHisto/*(currentAccount.histo)*/);

        if(admin == false){
            $("#suppr").hide();
        }

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
    };
    
    return AccountController;
});