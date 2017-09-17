var fs = require('fs')
var createHTML = require('create-html')
var jsdom = require('jsdom');
var { JSDOM } = jsdom;
var jquery = require('jquery');

const TEMPLATE_NAME = 'template.html';
const OUTPUT_NAME = 'output_email.html';

fs.readFile(TEMPLATE_NAME, 'utf8', function (err, data) {
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

    /* ------------------ manipulate logic here ----------- */



    // saveToFile($('html')[0].outerHTML);
    saveToFile(document.documentElement.outerHTML);
}

function saveToFile(htmlContent) {
    console.log(htmlContent);
    fs.writeFile(OUTPUT_NAME, htmlContent, function(err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
}



