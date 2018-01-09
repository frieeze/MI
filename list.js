define(["handlebars","jquery","text!templates/list.tpl","text!templates/research.tpl"],
function(Handlebars,$,templList, templResearch) {
    
    Handlebars.registerHelper('ifColor', function(a, options){
        if(a>=0) {
            return options.fn(this);
        }
        else{
            return options.inverse(this);
        }
    });
    
    var accounts = new Array();

    var templateList = Handlebars.compile(templList);
    var templateResearch = Handlebars.compile(templResearch);
    
    $("#research").html(templateResearch());
    $("#list").html(templateList(accounts));
    
    $("#create").on('click', function(){
        //créer compte avec champs
    });
});