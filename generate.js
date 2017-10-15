var fs = require('fs')
var createHTML = require('create-html')
var jsdom = require('jsdom');
var { JSDOM } = jsdom;
var jquery = require('jquery');
var eventList = require('./sample.json')

const TEMPLATE_NAME = 'template.html';
const OUTPUT_NAME = 'output_email.html';

fs.readFile(TEMPLATE_NAME, 'utf8', function (err, data) {
    if (err) {
        throw err;
    } else {
        generateEmailFileFrom(data);
    }
});

function insertEventSummaries($) {
    var $ = $
    var count = 0
    var container = $('#event-summaries-container')
    var newEventSummaryRowContainer = undefined

    for (var event of eventList) {
        count++

        if (count % 3 == 1)
            newEventSummaryRowContainer = $('#event-summaries-row-container').clone().css('display', '').removeAttr('id')

        var newEventSummary = $('#event-summary-template').clone().css('display', '').attr('id', count)
        
        // modify content of new event summary
        newEventSummary.find('.event-title').text(event.title)
        newEventSummary.find('.organization').find('i').text(event.organization)
        newEventSummary.find('.short-description').text(event.description)
        newEventSummary.find('.thumbnail-img').attr('src', event.thumbnail_link)
    
        // append summary to row
        newEventSummaryRowContainer.append(newEventSummary)
        
        // append a complete row (3 events) to container
        if (count % 3 == 0)
            container.append(newEventSummaryRowContainer)
    }

    // last row
    if (count % 3 != 0)
        container.append(newEventSummaryRowContainer)
}

function insertEventDetails($) {
    var $ = $
    var container = $('#event-details-container')
    for (var event of eventList) {
        var newEventDetail = $('#event-1').clone().removeAttr('id')
        newEventDetail.find('.event-title').text(event.title)
        newEventDetail.find('.organization').text(event.organization)
        newEventDetail.find('.poster-link').attr('src', event.poster_link)
        container.append(newEventDetail)
    }
}

function generateEmailFileFrom(data) {
    const dom = new JSDOM(data, { runScripts: "outside-only" });
    var document = dom.window.document;
    var $ = jquery(dom.window);

    /* ------------------ manipulate logic here ----------- */
    insertEventSummaries($)
    insertEventDetails($)

    // saveToFile($('html')[0].outerHTML);
    saveToFile(document.documentElement.outerHTML);
}

function saveToFile(htmlContent) {
    // console.log(htmlContent);
    fs.writeFile(OUTPUT_NAME, htmlContent, function(err) {
        if (err) throw err;
        // console.log('It\'s saved!');
    });
}



