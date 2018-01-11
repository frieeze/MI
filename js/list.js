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
        

        var templateList = Handlebars.compile(templList);
        var templateResearch = Handlebars.compile(templResearch);

        $("#research").html(templateResearch);
    };
    
    return ListController;
});