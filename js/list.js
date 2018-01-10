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
        
        socket.emit('accAll', {num : 2});
        
        function createCookie(name,value,days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        }


        var templateList = Handlebars.compile(templList);
        var templateResearch = Handlebars.compile(templResearch);

        $("#research").html(templateResearch);
    };
    
    return ListController;
});