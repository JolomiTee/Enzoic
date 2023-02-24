const express = require('express');
const router = express.Router();
const Enzoic = require('@enzoic/enzoic');

//----------- Enzoic ----------//
router.get('/search', (req, res) => {
    // get the email from the query string
    const email = req.query.email

    // get all exposures for the given user
    enzoic.getExposuresForUser(email || "", function (error, result) {
        if (error) {
            res.render('search', {text: ''});
        } else if (!email || email.trim() === '') {
            // res.render('search', {text: 'Please enter an email'});
            res.send({text: 'Please enter an email'});
        } else {
            // res.render('search', {text: `${result.count} exposures found for ${email}`});
            res.send({text:`${result.count} exposures found for ${email}`});

            // now get the full details for the first exposure returned in the list
            enzoic.getExposureDetails(result.exposures[0], function (error, exposureDetails) {
                if (error) {
                    // res.render('search');
                    res.send("Sorry an error occured");
                } else {
                    // res.render('search', {text: `This email has been breached, Exposure was ${exposureDetails.title}`});
                    res.send({text: `This email has been breached, Exposure was ${exposureDetails.title}`});
                }
            });
        }
    });
})

module.exports = router;