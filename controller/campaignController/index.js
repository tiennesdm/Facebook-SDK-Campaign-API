const campaignModel = require("../../model/campaign");
const faceBookTokenModel = require("../../model/FaceBook")
const adsSdk = require("facebook-nodejs-business-sdk");
const AdAccount = adsSdk.AdAccount;
module.exports = {
    createCampaign: async(req, res) => {
        console.log('Hello from caamp');
        let item = await faceBookTokenModel.findOne({ userId: req.body.userId, accountId: req.body.accountId });
        if (item) {
            let api = adsSdk.FacebookAdsApi.init(item.token);
            let account = new AdAccount(item.accountId);
            // api.setDebug(true);
            const Campaign = adsSdk.Campaign;
            let createCampaigns = await account.createCampaign([], {
                [Campaign.Fields.name]: req.body.campaignName,
                [Campaign.Fields.status]: req.body.status,
                [Campaign.Fields.objective]: req.body.objective,
                [Campaign.Fields.special_ad_category]: req.body.campaignCategory
            })
            if (createCampaigns) {
                console.log(createCampaigns.id);
                new campaignModel({
                    campaignName: req.body.campaignName,
                    campaignStatus: req.body.status,
                    campaignCategory: req.body.campaignCategory,
                    campaignObjective: req.body.objective,
                    campaignId: createCampaigns.id,
                    creatorTokenID: item._id
                }).save().then((result) => {
                    res.status(201).json({ status: 'Created Successfully', result: result });
                }).catch((err) => {
                    res.status(400).json({ status: 'Bad Request' });
                })

            } else {
                res.status(400).json({ status: 'Bad Request' });

            }
        } else {
            res.status(503).json({ status: 'Unavailable' });

        }
    },
    getCampaign: async(req, res) => {
        let campaignArray = [];
        console.log(req.query.limit);
        let item = await faceBookTokenModel.findOne({ userId: req.body.userId, accountId: req.body.accountId });
        if (item) {
            let api = adsSdk.FacebookAdsApi.init(item.token);
            let account = new AdAccount(item.accountId);
            const Campaign = adsSdk.Campaign;
            let campaigns = account.getCampaigns([Campaign.Fields.name], [Campaign.Fields.id]).then((campaigns) => {
                campaigns.forEach((c) => {

                    campaignArray.push({
                        name: c.name,
                        id: c.id
                    })
                });
                res.status(200).json({ status: 'Data Recieved', result: campaignArray });

            }).catch((err) => {
                res.status(503).json({ status: 'Unavailable' });

            });
        } else {
            res.status(500).json({ status: 'Network Error' });
        }


    },
    updateCampaign: async(req, res) => {
        let item = await faceBookTokenModel.findOne({ userId: req.body.userId, accountId: req.body.accountId });
        if (item) {
            let api = adsSdk.FacebookAdsApi.init(item.token);
            let account = new AdAccount(item.accountId);
            const Campaign = adsSdk.Campaign;
            new Campaign(req.params.campaignId, {
                    [Campaign.Fields.id]: req.params.campaignId,
                    [Campaign.Fields.name]: req.body.campaignName,
                })
                .update().then((result) => {
                    console.log(result);
                    campaignModel.updateOne({ campaignId: req.params.campaignId }, {
                        $set: { campaignName: req.body.campaignName }
                    }).then((result) => {
                        console.log(result);
                        res.status(202).json({
                            status: 'Updated Successfully',
                            result: result
                        })
                    }).catch((err) => {
                        res.status(400).json({ status: 'Bad Request' });
                    })

                }).catch((err) => {
                    res.status(400).json({ status: 'Bad Request' });

                })

        } else {
            res.status(500).json({ status: 'Network Error' });
        }

        console.log('deleteCampaign', req.params.campaignId);

    },
    deleteCampaign: async(req, res) => {
        console.log(req.body.userId);
        let item = await faceBookTokenModel.findOne({ userId: req.body.userId, accountId: req.body.accountId });
        if (item) {
            let api = adsSdk.FacebookAdsApi.init(item.token);
            let account = new AdAccount(item.accountId);
            const Campaign = adsSdk.Campaign;
            new Campaign(req.params.campaignId).delete().then((deleteResult) => {
                console.log('delete', deleteResult);
                if (deleteResult.success == true) {
                    campaignModel.deleteOne({ campaignId: req.params.campaignId }).then((result) => {
                        console.log(result);
                        res.status(202).json({ status: 'SuccessFully Deleted' });

                    }).catch((err) => {
                        console.log(err);
                        res.status(400).json({ status: 'Bad Request' });
                    })
                }


            }).catch((err) => {
                res.status(400).json({ status: 'Bad Request' });

            })

        } else {
            res.status(500).json({ status: 'Network Error' });
        }
    },
};