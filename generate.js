var fs = require('fs')
var createHTML = require('create-html')
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var jquery = require("jquery");


fs.readFile("test.html", 'utf8', function (err, data) {
    if (err) {
        throw err;
    } else {
        generateEmailFileFrom(data);
    }
});

function generateEmailFileFrom(data) {
    const dom = new JSDOM(data, { runScripts: "outside-only" });
    
    var document = dom.window.document;

    var $ = jquery(dom.window);

    console.log($("body").html())

    // saveToFile(document.documentElement.outerHTML);
}

function saveToFile(htmlContent) {
    console.log(htmlContent)
}



