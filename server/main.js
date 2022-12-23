// import '../imports/api/exports.js';
const dayjs = require('dayjs');
import { Exports } from '../imports/api/exports.js';
var urls = ['https://www.lempire.com/',
  'https://www.lemlist.com/',
  'https://www.lemverse.com/',
  'https://www.lemstash.com/'
]
const updateDocuments = Meteor.bindEnvironment(() => {
  var a = new Date();
  var now = dayjs(a).format('DD/MM/YYYY HH:mm:ss');
  Exports.update(
    { isFinished: false, progress: { $gte: 100 } },
    {
      $set: {
        isFinished: true,
        finishedAt: now,
        url: urls[Math.floor(Math.random() * urls.length)]
      }
    },
    { multi: true }
  );

  Exports.update(
    { isFinished: false, progress: { $lt: 100 } },
    { $inc: { progress: 5 } },
    { multi: true }
  );
});
setInterval(updateDocuments, 1000);
