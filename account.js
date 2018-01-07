define(["handlebars","jquery","text!templates/histo.tpl","text!templates/research.tpl"],
function(Handlebars,$,templHisto, templResearch) {
    
    var templateHisto = Handlebars.compile(templHisto);
    var templateResearch = Handlebars.compile(templResearch);
    
    $("#research").html(templateResearch());
    $("#histo").html(templateHisto());
});