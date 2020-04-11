const faceBookTokenModel = require('../../model/FaceBook');


module.exports = {
    savedTokenandAccountId: async(req, res) => {
        const item = await faceBookTokenModel.findOne({ userId: req.body.userId, accountId: req.body.accountId });
        if (item) {
            faceBookTokenModel.updateOne({ userId: req.body.userId, accountId: req.body.accountId }, {
                $set: { accountId: req.body.accountId, token: req.body.token, status: req.body.status }
            }).then((result) => {
                console.log(result);
                res.status(202).json({
                    status: 'Updated Successfully',
                    result: item
                })
            }).catch((err) => {
                res.status(400).json({ status: 'Bad Request' });
            })
        } else {
            new faceBookTokenModel({ userId: req.body.userId, accountId: req.body.accountId, token: req.body.token, status: req.body.status }).save()
                .then((result) => {
                    res.status(201).json({ status: 'Created Successfully', result: result });
                }).catch((err) => {
                    console.log(err);
                    res.status(400).json({ status: 'Bad Request' });
                })
        }
    }
}