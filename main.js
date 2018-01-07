require.config({
    baseUrl: '',
    paths: {
        jquery:     'libs/jquery',
        handlebars: 'libs/handlebars',
        text:       'libs/text'
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
    
    Handlebars.registerHelper('ifcolor', function(a, options){
        if(a>0) {
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
          name : "test",
          price : "test"
        },
        {
          name : "test",
          price : "test"
        },
        {
          name : "test",
          price : "test"
        },
        {
          name : "test",
          price : "test"
        },
        {
          name : "test",
          price : "test"
        },
        {
          name : "test",
          price : "test"
        }
    ];
    
    var buttons = {
        formules : [
            {
                name : "test",
                price : "test"
            },
            {
                name : "test",
                price : "test"
            },
            {
                name : "test",
                price : "test"
            }
        ],
        soloProd : products
    };
    
    $(".research").html(templateResearch());
    $(".buttons").html(templateButtons(buttons));
    $(".recap").html(templateRecap(line));
    
});
