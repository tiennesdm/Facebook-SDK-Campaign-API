const express = require('express');
const router = express.Router();
const fbToken = require('../../controller/facebookToken');

router.post('/addToken', fbToken.savedTokenandAccountId);



module.exports = router;