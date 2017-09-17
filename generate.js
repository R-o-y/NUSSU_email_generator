var fs = require('fs')
var createHTML = require('create-html')
// var jsdom = require('jsdom');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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

    // document.querySelector("div").textContent = "asdfadfasdfa"
    // console.log(document.querySelector("div").textContent)

    saveToFile(document.documentElement.outerHTML);
}

function saveToFile(htmlContent) {
    console.log(htmlContent)
}



