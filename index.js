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
    emakimono:"emakimono-feb03",
};


var eventschedule_noimage = {
    sugam:"Sugam is happening on 3-02-2017 2 PM - 5 PM",
    kairosPhotoExhibition:"Kairos Photo Exhibition is happening on 3-02-2017 9 AM - 6 PM",
    spotOn:"Spot On is happening on 3-02-2017 2 PM - 3:30 PM",
    musidora:"Musidora is happening on 3-02-2017 10 AM - 12 PM",
    umbrellaPainting:"Umbrella Painting is happening on 3-02-2017 10 AM - 4 PM",
    exhibition :"Exhibition is happening on 3-02-2017 7 AM - 8 PM",
    jewellerymakingworkshop:"Jewellery Making Workshop is happening on 3-02-2017 9 AM - 4 PM",
    tapestryandgreenquoteboard:"Tapestry and Green Quote Board is happening on 3-02-2017 9 AM - 5 PM",
    writeMeATale:"Write Me A Tale is happening on  04-02-2017  from 9 am - 12 pm in Upper Seminar Room",
    popCultureQuiz:"Pop Culture Quiz is happening on  04-02-2017  from 1:30-4pm in 27 + 28",
    indiaQuiz:"India Quiz is happening on  04-02-2017  from 10am - 1pm in 27 + 28",
    harf:"Harf is happening on  04-02-2017  from 9 am - 4 pm in G2 , G3",
    acapella :"Acapella event  is happening on  04-02-2017  from 9 - 11:30 am in Auditorium ",
    saaz:"Saaz is happening on  04-02-2017  from 9 am- 1 pm in Bamboo Hut",
    amalgam:"Amalgam is happening on  04-02-2017  from 3 pm - 6 pm in Auditorium",
    mudra:"Mudra is happening on  04-02-2017  from 12 pm - 3 pm in Auditorium",
    chalchitraKaManchitra:"Chalchitra ka Manchitra is happening on  04-02-2017  from 10 am - 12 pm in Media Lab",
    musicInterpretationCompetition:"Music Interpretation Competition is happening on  04-02-2017  from 10am - 2pm in New Common Room",
    potteryWorkshop:"Pottery workshop is happening on  04-02-2017  from 9 am - 4 pm in Outside Nescafe",
    storytellingCompetition:"Storytelling competition is happening on  05-02-2017  from  10 am - 1 pm in Room 8 ",
    thingsOnlyGetVerse:"Things Only Get Verse is happening on  05-02-2017  from  9 am - 12 pm in Upper Seminar Room",
    flamesQuiz:"FLAMES Quiz is happening on  05-02-2017  from  10am - 11 am in Room 27 + Room 28",
    battleOfBands :"Battle of Bands  is happening on  05-02-2017  from  9 am - 2 pm in The Stage",
    sangam:"Sangam is happening on  05-02-2017  from  9 am - 2 pm in Auditorium",
    jugalGaayan:"Jugal Gaayan is happening on  05-02-2017  from  2 pm - 5 pm in NCR",
    nukkad:"Nukkad is happening on  05-02-2017  from  9 am - 5 pm in Amphitheatre",
    baila:"Baila is happening on  05-02-2017  from  3 pm - 6 pm in Auditorium",
    adMakingCompetition:"Ad Making Competition is happening on  05-02-2017  from  10 am - 12 pm in Media Lab",
    stillLifePainting:"Still Life Painting is happening on  05-02-2017  from  9 am - 1 pm in New Common Room",
    exhibition:"Exhibition is happening on  05-02-2017  from  8 am - 6 pm in Amphitheatre top part",
    treasureHunt :"Treasure hunt  is happening on  05-02-2017  from  12 pm- 3 pm in Outside Nescafe"
};

var imageurl = "http://livon.allsocialassets.com/botimages/";

restService.post('/webhook', function (req, res) {

    console.log('hook request');

    try {
        var speech = '';
        var imageselector = '';

        if (req.body) {
            var requestBody = req.body;
            var eventselector=requestBody.result.parameters.Events;            
            console.log('Event Selector: ' + eventselector);
            if (requestBody.result) {
                speech = '';

/*comment when all images come in
                
                if (requestBody.result.action) {
                    var eventselector=requestBody.result.parameters.Events;                
                    //speech = eventschedule[eventselector];
                    imageselector =  imageurl + eventschedule[eventselector] + ".png";
                }
*/
                if (requestBody.result.action) {
                    if (eventschedule.hasOwnProperty(requestBody.result.parameters.Events)) {             
                        imageselector =  imageurl + eventschedule[eventselector] + ".png";
                    }
                    else {
                        speech = eventschedule_noimage[eventselector];                        
                    }
                }
            }
        }

        console.log('result: ', speech);
//remove this section after images come in        
        if (speech == '') {

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

        } else if (typeof speech !== 'undefined') {
            return res.json({
                speech: speech,
                displayText: speech,
                data: {},
                contextOut: [{
                    name: 'schedule-given',
                    lifespan: 5,
                    parameters: {
                        eventidentified: requestBody.result.action
                    },
                }],
                source: 'gsgbot'
            });        
        }

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
