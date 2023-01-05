import { Template } from 'meteor/templating';
import { Exports } from '../api/exports.js';
const dayjs = require('dayjs');
import './kpis.html';
import Chart from 'chart.js/auto';
var buildChart = function() {
  var exps = Exports.find().fetch();
  console.log(exps);
  var labels = [];
  exps.forEach(function(exp) {
    var a = dayjs(exp.createdAt).format('DD/MM/YYYY');
    if (!labels.includes(a)) {
      labels.push(a);
    }
  });
  var successData = [];
  var dangerData = [];
  var warningData = [];
  labels.forEach(function(date) {
    var countSuccess = 0;
    var countWarning = 0;
    var countDanger = 0;
    for (var i = 0; i < exps.length; i++) {
      var a = dayjs(exps[i].createdAt).format('DD/MM/YYYY');
      if (date == a) {
        if(exps[i].status == 'success') countSuccess++;
        if(exps[i].status == 'warning') countWarning++;
        if(exps[i].status == 'danger') countDanger++;
      }
    }
    successData.push(countSuccess);
    dangerData.push(countDanger);
    warningData.push(countWarning);
  });
  var chart = new Chart(document.getElementById('buttonClicksChart'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Failed',
        backgroundColor: 'rgb(220, 53, 69)',
        borderColor: 'rgb(220, 53, 69)',
        data: dangerData
      },
      {
        label: 'Warning',
        backgroundColor: 'rgb(247, 193, 11)',
        borderColor: 'rgb(247, 193, 11)',
        data: warningData
      },
      {
        label: 'Success',
        backgroundColor: 'rgb(48, 135, 85)',
        borderColor: 'rgb(48, 135, 85)',
        data: successData
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        }
      }
    }
  })
};
Template.kpis.onRendered(function kpisonRendered() {
  this.subscribe('exports.all', () => {
  Tracker.afterFlush(() => {
    buildChart();
  })
});
});
