import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
const dayjs = require('dayjs');
export const Exports = new Mongo.Collection('exports');
Meteor.methods({
  'exports.insert'(status) {
    var a = new Date();
    var now = dayjs(a).format('DD/MM/YYYY HH:mm:ss');
    return Exports.insert({
      progress: 0,
      status: status,
      isFinished: false,
      createdAt: now
    });
  },
});
