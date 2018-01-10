define(["handlebars","jquery","text!templates/list.tpl","text!templates/research.tpl", "socketio"],
function(Handlebars,$,templList, templResearch, io) {
    
    var ListController = function(){
        Handlebars.registerHelper('ifColor', function(a, options){
            if(a>=0) {
                return options.fn(this);
            }
            else{
                return options.inverse(this);
            }
        });
        
        var socket = io.connect('http://localhost:80');
        
        //de base requete pour afficher tout les comptes
        
        function createCookie(name,value,days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        }


        var accounts = [
            {
                name : "Jean-Michel Truc",
                promo : 61,
                numberAccount : 1,
                solde : 10
            },
            {
                name : "Machine Dupont",
                promo : 61,
                numberAccount : 2,
                solde : 40
            }
        ];

        var templateList = Handlebars.compile(templList);
        var templateResearch = Handlebars.compile(templResearch);

        $("#research").html(templateResearch);
        $("#list").html(templateList(accounts));

        $("#create").on('click', function(){
            //créer compte avec champs -> emit avec les variables
            createCookie('numAccCurr', /*Mettre Num compte*/,0);
            document.location.href="./account.html";
        });
        
        $(".line").on('click', function(){
            createCookie('numAccCurr', this.attr('id'),0);
            document.location.href="./account.html";
        })
        
        
        //fonction de reception de la requete pour stocker les lignes et refresh la vue
        
        $("#all").on('click', function(){  
            //emit avec valeur 0
        });
        $("#pos").on('click', function(){
            //emit avec valeur 1
        });
        $("#neg").on('click', function(){
            //emit avec valeur 2
        });
        
    };
    
    return ListController;
});