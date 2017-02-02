'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());

var eventschedule = {
    slamNation:"slamnation_feb03",
    youveGotMail:"yougotmail_feb03",
    collegeGeneralQuiz :"collegequiz_feb03",
    tarkvyuh:"tarkvyuh_feb03",
    spandan:"spandan_feb03",
    yavnika:"yavnika-feb03",
    izraz:"izraz_feb03",
    soloTrioCompetition:"soloandtrio_feb03",
    malhaar:"malhaar_feb03",
    sugam:"Sugam is happening on 3-02-2017 2 PM - 5 PM",
    kairosPhotoExhibition:"Kairos Photo Exhibition is happening on 3-02-2017 9 AM - 6 PM",
    emakimono:"emakimono-feb03",
    spotOn:"Spot On is happening on 3-02-2017 2 PM - 3:30 PM",
    musidora:"Musidora is happening on 3-02-2017 10 AM - 12 PM",
    umbrellaPainting:"Umbrella Painting is happening on 3-02-2017 10 AM - 4 PM",
    hiveexhibition :"Hive Exhibition is happening on 3-02-2017 7 AM - 8 PM",
    jewellerymakingworkshop:"Jewellery Making Workshop is happening on 3-02-2017 9 AM - 4 PM",
    tapestryandgreenquoteboard:"Tapestry and Green Quote Board is happening on 3-02-2017 9 AM - 5 PM"
};

var imageurl = "http://livon.allsocialassets.com/botimages/";

restService.post('/webhook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'Empty Response';
        var imageselector = '';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

                if (requestBody.result.action) {
                    var eventselector=requestBody.result.parameters.Events;                
                    //speech = eventschedule[eventselector];
                    imageselector =  imageurl + eventschedule[eventselector];
                }
            }
        }

        console.log('result: ', speech);
        
        return res.json({
            speech: speech,
            displayText: speech,
            data: {
                facebook: {
                        attachment: {
                            type: 'image',
                            payload: {
                                url: imageselector 
                            }
                        }
                }
            },
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
