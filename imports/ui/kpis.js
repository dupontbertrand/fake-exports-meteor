import { Template } from 'meteor/templating';
import { Exports } from '../api/exports.js';
const dayjs = require('dayjs');
import './kpis.html';
import Chart from 'chart.js/auto';
var buildCharts = function() {
  var exps = Exports.find().fetch();
  var labelsStatus = [];
  var datasUrls = [];
  var lempireCount = 0;
  var lemlistCount = 0;
  var lemverseCount = 0;
  var lemstashCount = 0;
  exps.forEach(function(exp) {
    if (exp.url == "https://www.lempire.com/") {
      lempireCount++;
    } else if (exp.url == "https://www.lemlist.com/") {
      lemlistCount++;
    } else if (exp.url == "https://www.lemverse.com/") {
      lemverseCount++;
    } else if (exp.url == "https://www.lemstash.com/") {
      lemstashCount++;
    }
    var a = dayjs(exp.createdAt).format('DD/MM/YYYY');
    if (!labelsStatus.includes(a)) {
      labelsStatus.push(a);
    }
  });
  datasUrls.push(lempireCount, lemlistCount, lemverseCount, lemstashCount);
  var successData = [];
  var dangerData = [];
  var warningData = [];
  labelsStatus.forEach(function(date) {
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
  var chartStatus = new Chart(document.getElementById('statusChart'), {
    type: 'line',
    data: {
      labels: labelsStatus,
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
          text: 'Type d\'exports par jour'
        }
      }
    }
  })
  const data = {
  labels: ['https://www.lempire.com/',
    'https://www.lemlist.com/',
    'https://www.lemverse.com/',
    'https://www.lemstash.com/'
  ],
  datasets: [{
    label: 'Nbre d\'exports',
    data: datasUrls,
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(110, 201, 54)'
    ],
    hoverOffset: 4
  }]
};
  var chartUrl = new Chart(document.getElementById('urlsChart'), {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'URLs'
        }
      }
    }
  })
};
Template.kpis.onRendered(function kpisOnRendered() {
  this.subscribe('exports.all', () => {
    Tracker.afterFlush(() => {
      buildCharts();
    })
  });
});
