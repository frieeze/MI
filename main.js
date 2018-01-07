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
    
    Handlebars.registerHelper('ifColor', function(a, options){
        if(a>=0) {
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
          name : "A",
          price : "p1"
        },
        {
          name : "B",
          price : "p2"
        },
        {
          name : "C",
          price : "p3"
        },
        {
          name : "D",
          price : "p4"
        },
        {
          name : "E",
          price : "p5"
        },
        {
          name : "F",
          price : "p6"
        }
    ];
    
    var buttons = {
        formules : [
            {
                name : "f1",
                price : "P1"
            },
            {
                name : "f2",
                price : "P2"
            },
            {
                name : "f3",
                price : "P3"
            }
        ],
        soloProd : products
    };
    
    $("#research").html(templateResearch());
    $("#buttons").html(templateButtons(buttons));
    $("#recap").html(templateRecap(line));
    $("#histo").html(templateHisto());
    
});
