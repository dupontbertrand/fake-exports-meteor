import { Template } from 'meteor/templating';

import { ReactiveDict } from 'meteor/reactive-dict';
import { Exports } from '../api/exports.js';

import './body.html';
import './export.js';
Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('exports.all');
});
Template.body.helpers({
  exports() {
    return Exports.find({}, {sort: {createdAt: -1}});
  }
});
Template.body.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    event.preventDefault();

    Meteor.call('exports.insert', (error) => {
      if (error) {
        alert(error.error);
      }
    });
  }
});
