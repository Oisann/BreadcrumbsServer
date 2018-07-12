const Datastore = require('@google-cloud/datastore');
const datastore = Datastore({
    projectId: (process.env.PROJECT_ID || 'missing id')
});

exports.store = (req, res) => {
    let message = req.body || 'nobody';

    if (message == 'nobody') {
        res.status(404).send('Missing body');
        return
    }

    const kind = 'breadcrumb';
    const name = req.body.id + '@' + req.body.index;
    const taskKey = datastore.key([kind, name]);
    const task = {
        key: taskKey,
        data: req.body
    };
    datastore.save(task)
        .then(() => {
            res.status(200).send('saved');
        })
        .catch((err) => {
            res.status(404).send(err);
        });
};
