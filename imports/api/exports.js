import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
const dayjs = require('dayjs');
export const Exports = new Mongo.Collection('exports');
  if (Meteor.isServer) {
    Meteor.publish('exports.all', function () {
      return Exports.find();
    });
  }

Meteor.methods({
  'exports.insert'() {
    var a = new Date();
    var now = dayjs(a).format('DD/MM/YYYY HH:mm:ss');
    return Exports.insert({
      progress: 0,
      isFinished: false,
      createdAt: now,
    });
  },
});
