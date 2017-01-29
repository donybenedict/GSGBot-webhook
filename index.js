'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());

var eventschedule = {
    slamNation:"SlamNation is happening on 3-02-2017 9 AM - 12 PM in Room 8",
    youveGotMail:"You've Got Mail is happening on 3-02-2017 9 AM - 12 PM in Upper Seminar Room",
    collegeGeneralQuiz :"College General Quiz prelims is happening on 3-02-2017 10 AM - 11 AM and finals on 3-02-2017 11 AM - 3 PM",
    tarkvyuh:"Tarkvyuh is happening on 3-02-2017 9 AM - 5 PM",
    spandan:"Spandan is happening on 3-02-2017 9 AM - 4 PM",
    yavnika:"Yavnika is happening on 3-02-2017 9 AM - 2:30 PM",
    izraz:"Izraz is happening on 3-02-2017 3 PM - 6 PM",
    soloTrioCompetition:"Solo & Trio Competition is happening on 3-02-2017 9 AM - 12 PM",
    malhaar:"Malhaar is happening on 3-02-2017 9 AM - 1 PM",
    sugam:"Sugam is happening on 3-02-2017 2 PM - 5 PM",
    kairosPhotoExhibition:"Kairos Photo Exhibition is happening on 3-02-2017 9 AM - 6 PM",
    emakimono:"Emakimono is happening on 3-02-2017 10 AM - 2 PM",
    spotOn:"Spot On is happening on 3-02-2017 2 PM - 3:30 PM",
    musidora:"Musidora is happening on 3-02-2017 10 AM - 12 PM",
    umbrellaPainting:"Umbrella Painting is happening on 3-02-2017 10 AM - 4 PM",
    hiveexhibition :"Hive Exhibition is happening on 3-02-2017 7 AM - 8 PM",
    jewellerymakingworkshop:"Jewellery Making Workshop is happening on 3-02-2017 9 AM - 4 PM",
    tapestryandgreenquoteboard:"Tapestry and Green Quote Board is happening on 3-02-2017 9 AM - 5 PM"
};

restService.post('/webhook', function (req, res) {

    console.log('hook request');

    try {
        var speech = '';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

                if (requestBody.result.action) {
                    var eventselector=requestBody.result.parameters.Events;                
                    speech = eventschedule[eventselector];
                }
            }
        }

        console.log('result: ', speech);
        
        return res.json({
            speech: speech,
            displayText: speech,
            data: [{}],
            contextOut: [{
                name: 'schedule-given',
                lifespan: 5,
                parameters: {
                    eventidentified: requestBody.result.action
                },
            }],
            source: 'gsgbot'
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
