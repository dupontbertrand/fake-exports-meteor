// import '../imports/api/exports.js';
const dayjs = require('dayjs');
import { Exports } from '../imports/api/exports.js';
var urls = ['https://www.lempire.com/',
  'https://www.lemlist.com/',
  'https://www.lemverse.com/',
  'https://www.lemstash.com/'
];
const updateDocuments = Meteor.bindEnvironment(() => {
  var a = new Date();
  var now = dayjs(a).format('DD/MM/YYYY HH:mm:ss');
  Exports.update(
    { isFinished: false, progress: { $gte: 100 }, status: { $ne: 'danger'} },
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
Meteor.publish('exports.all', function () {
  return Exports.find();
})
Meteor.startup(() => {
  if (Exports.find().count() === 0) {
    const exps = [{
        "progress": 100,
        "status": "success",
        "isFinished": true,
        "createdAt": "03/01/2023 20:51:22",
        "finishedAt": "03/01/2023 20:51:42",
        "url": "https://www.lempire.com/"
      },
      {
        "progress": 100,
        "status": "success",
        "isFinished": true,
        "createdAt": "03/01/2023 20:51:22",
        "finishedAt": "03/01/2023 20:51:42",
        "url": "https://www.lemlist.com/"
      },
      {
        "progress": 100,
        "status": "warning",
        "isFinished": true,
        "createdAt": "03/01/2023 20:51:22",
        "finishedAt": "03/01/2023 20:51:42",
        "url": "https://www.lemlist.com/"
      },
      {
        "progress": 100,
        "status": "danger",
        "isFinished": false,
        "createdAt": "03/01/2023 20:51:22"
      },
      {
        "progress": 100,
        "status": "warning",
        "isFinished": true,
        "createdAt": "04/01/2023 20:51:22",
        "finishedAt": "04/01/2023 20:51:42",
        "url": "https://www.lempire.com/"
      },
      {
        "progress": 100,
        "status": "warning",
        "isFinished": true,
        "createdAt": "04/01/2023 20:51:22",
        "finishedAt": "04/01/2023 20:51:42",
        "url": "https://www.lemverse.com/"
      },
      {
        "progress": 100,
        "status": "success",
        "isFinished": true,
        "createdAt": "04/01/2023 20:51:22",
        "finishedAt": "04/01/2023 20:51:42",
        "url": "https://www.lemlist.com/"
      },
      {
        "progress": 100,
        "status": "danger",
        "isFinished": false,
        "createdAt": "05/01/2023 12:51:22"
      },
      {
        "progress": 100,
        "status": "danger",
        "isFinished": false,
        "createdAt": "05/01/2023 12:51:22"
      },
      {
        "progress": 100,
        "status": "warning",
        "isFinished": true,
        "createdAt": "05/01/2023 12:51:22",
        "finishedAt": "05/01/2023 12:51:42",
        "url": "https://www.lemlist.com/"
      },
      {
        "progress": 100,
        "status": "warning",
        "isFinished": true,
        "createdAt": "05/01/2023 12:51:22",
        "finishedAt": "05/01/2023 12:51:42",
        "url": "https://www.lemstash.com/"
      },
      {
        "progress": 100,
        "status": "warning",
        "isFinished": true,
        "createdAt": "05/01/2023 12:51:22",
        "finishedAt": "05/01/2023 12:51:42",
        "url": "https://www.lemlist.com/"
      },
      {
        "progress": 100,
        "status": "success",
        "isFinished": true,
        "createdAt": "05/01/2023 12:51:22",
        "finishedAt": "05/01/2023 12:51:42",
        "url": "https://www.lemstash.com/"
      }
    ];

    exps.forEach(exp => Exports.insert(exp));
  }
});
