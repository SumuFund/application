
function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
}

$( document ).ready(function() {
  var prefSlider = $("#PerfSlider");

  prefSlider.simpleSlider({
    range : [1,6],
    step : 1,
    snap : true
  });

  var ginView = false;
  var inView = false;

  $(window).scroll(function() {
      if (isScrolledIntoView('#PerfMetrics')) {
          //console.log(isScrolledIntoView('#PerfMetrics'))
          if (inView) { return; }
          inView = true;

          function updatePrefGraph (sliderVal) {
            for (var i = 0; i < prefMetricsLength; i++) {
              prefMetrics.datasets[0].points[i].value = prefData[sliderVal - 1][i];
            }
            prefMetrics.update();
          }

          function animateSlider(val) {
            prefSlider.simpleSlider("setValue", val);
          }

          prefSlider.bind("slider:changed", function (event, data) {
            updatePrefGraph(data.value);
          });

          //Get the context of the canvas element we want to select
          var prefCtx = document.getElementById("PerfChart").getContext("2d");
          var prefMetrics = new Chart(prefCtx).Radar(prefChart, {
            scaleShowLabels : true,
          });

          var prefMetricsLength = prefMetrics.datasets[0].points.length;

          var animateCounter = 0;

          var interval = setInterval(function() {
            animateSlider(animateCounter);
            animateCounter++;
            if(animateCounter === 7) {
              clearInterval(interval);
            }
          }, 300);

          //new Chart(document.getElementById("canvas").getContext("2d")).Pie(data);
      }

        else if (isScrolledIntoView('#Growth')) {
          //console.log(isScrolledIntoView('#PerfMetrics'))
          if (ginView) { return; }
          ginView = true;

          var growthCtx = document.getElementById("Growth").getContext("2d");
          var growthChart = new Chart(growthCtx).Line(growth, null);
        }
    });

    var staffCtx = document.getElementById("StaffSize").getContext("2d");
    var staffChart = new Chart(staffCtx).Line(growth, null);

    var capitalCtx = document.getElementById("Capitalization").getContext("2d");
    var capitalChart = new Chart(capitalCtx).Line(growth, null);

    var ipCtx = document.getElementById("IP").getContext("2d");
    var ipChart = new Chart(ipCtx).Line(growth, null);

    var pipelineCtx = document.getElementById("Pipeline").getContext("2d");
    var pipelineChart = new Chart(pipelineCtx).Line(growth, null);

    var sphereCtx = document.getElementById("Sphere").getContext("2d");
    var sphereChart = new Chart(sphereCtx).Line(growth, null);

    var centerCtx = document.getElementById("Center").getContext("2d");
    var centerChart = new Chart(centerCtx).Line(growth, null);

    var platformDevCtx = document.getElementById("PlatDev").getContext("2d");
    var platformDevChart = new Chart(platformDevCtx).Line(growth, null);

});

var months = ["November","December","January","February","March","April"];
var users = [10, 10, 50, 200, 300, 500];
var revenue = [0, -10, 250, 400, 800, 900];

var growth = {
  labels : months,
  datasets : [
    {
      fillColor : "rgba(220,220,220,0.5)",
      strokeColor : "rgba(220,220,220,1)",
      pointColor : "rgba(220,220,220,1)",
      pointStrokeColor : "#fff",
      data : revenue
    },
    {
      fillColor : "rgba(151,187,205,0.5)",
      strokeColor : "rgba(151,187,205,1)",
      pointColor : "rgba(151,187,205,1)",
      pointStrokeColor : "#fff",
      data : users
    }
  ]
}

var perfLabels = [
    "Staff Size",
    "Caplitalization",
    "IP",
    "Pipeline",
    "Sphere of Influence",
    "Centers of Influence",
    "Platform Development"
    ];

var prefData = [
  [5, 2, 1, 1, 1, 2, 1],
  [4, 3, 2, 2, 1, 2, 1],
  [4, 3, 2, 2, 1, 2, 3],
  [3, 4, 3, 3, 3, 4, 3],
  [4, 2, 3, 3, 3, 4, 3],
  [4, 4, 5, 4, 5, 4, 5]
]

var prefChart = {
  labels: perfLabels,
  datasets: [
    {
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: prefData[0]
    },
  ]
};

