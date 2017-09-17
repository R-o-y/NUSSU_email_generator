var fs = require('fs')
var createHTML = require('create-html')
// var jsdom = require('jsdom');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

fs.readFile("test.html", 'utf8', function (err, data) {
    if (err) throw err;

    const dom = new JSDOM(data, { runScripts: "outside-only" });
    
    var document = dom.window.document;

    // document.querySelector("div").textContent = "asdfadfasdfa"
    // console.log(document.querySelector("div").textContent)



    console.log(document.documentElement.outerHTML)

    // jsdom.env(
    //     data, ["http://code.jquery.com/jquery.js"],
    //     function (errors, window) {
    //         var $ = window.jQuery;
    //         console.log($("body").text());
    //     }
    // );
});

function saveToFile() {

}



