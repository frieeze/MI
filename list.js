define(["handlebars","jquery","text!templates/list.tpl","text!templates/research.tpl"],
function(Handlebars,$,templList, templResearch) {
    
    var ListController = function(){
        Handlebars.registerHelper('ifColor', function(a, options){
            if(a>=0) {
                return options.fn(this);
            }
            else{
                return options.inverse(this);
            }
        });

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
            //créer compte avec champs
        });
    };
    
    return ListController;
});