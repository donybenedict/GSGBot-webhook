'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());
var timing = ["3-02-2017 9 AM - 12 PM","3-02-2017 9 AM - 12 PM","3-02-2017 10 AM - 11 AM","3-02-2017 11 AM - 3 PM","3-02-2017 9 AM - 5 PM","3-02-2017 9 AM - 4 PM","3-02-2017 9 AM - 2:30 PM","3-02-2017 3 PM - 6 PM","3-02-2017 9 AM - 12 PM","3-02-2017 9 AM - 1 PM","3-02-2017 2 PM - 5 PM","3-02-2017 9 AM - 6 PM","3-02-2017 10 AM - 2 PM","3-02-2017 2 PM - 3:30 PM","3-02-2017 10 AM - 12 PM","3-02-2017 10 AM - 4 PM","3-02-2017 7 AM - 8 PM","3-02-2017 9 AM - 4 PM","3-02-2017 9 AM - 5 PM"]

restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

                if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }

                if (requestBody.result.action) {
                    speech += 'action: ' + requestBody.result.action;
                }
            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            source: 'GSGbot'
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
