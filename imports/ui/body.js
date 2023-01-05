import { Template } from 'meteor/templating';
import { Exports } from '../api/exports.js';
const dayjs = require('dayjs');
const html2pdf = require('html2pdf.js');
import './body.html';
import './export.js';
import './kpis.js';

Template.body.onCreated(function bodyOnCreated() {
  this.subscribe('exports.all');
});
Template.body.helpers({
  exports() {
    return Exports.find({}, {sort: {createdAt: -1}});
  },
  fullDateTime() {
    var a = new Date();
    return dayjs(a).format('DD/MM/YYYY HH:mm:ss');
  }
});
Template.body.events({
  'click button.create'(event, instance) {
    event.preventDefault();
    var status = '';
    if($(event.currentTarget).hasClass("btn-success")){
      status = 'success';
    }
    else if($(event.currentTarget).hasClass("btn-warning")){
      status = 'warning';
    }
    else if($(event.currentTarget).hasClass("btn-danger")){
      status = 'danger';
    }
    Meteor.call('exports.insert', status, (error) => {
      if (error) {
        console.log(error.error);
      }
    });
  },
 "click #downloadPdf": function(event) {
   var elements = Exports.find({}, {sort: {createdAt: -1}}).fetch();
   var html = '<style>table{margin: 0 auto;}td { border:1px solid black;padding:5px;}</style>';
   html += '<table>';
   for (var i = 0; i < elements.length; i++) {
     if (i%2==0) {
       html += '<tr style="background-color:lightgrey">';
     } else {
       html += '<tr>';
     }
     html += '<td>';
     html += i + 1;
     html += '</td>';
     html += '<td>';
     html += elements[i].createdAt;
     html += '</td>';
     html += '<td>';
     html += elements[i].url;
     html += '</td>';
     html += '</tr>';
   }
   html += '</table>';
   html2pdf().from(html).save();
 }
});
