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
        
    };
    
    return AccountController;
});