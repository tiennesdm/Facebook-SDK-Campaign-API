const express = require('express');
const router = express.Router();
const campaignController = require('../../controller/campaignController');

router.post('/myCampaign', campaignController.createCampaign);
router.put('/myCampaign/:campaignId', campaignController.updateCampaign);
router.delete('/myCampaign/:campaignId', campaignController.deleteCampaign);
router.get('/myCampaign', campaignController.getCampaign);


module.exports = router;