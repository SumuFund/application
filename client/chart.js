$( document ).ready(function() {
  //Get the context of the canvas element we want to select
  var growthCtx = document.getElementById("Growth").getContext("2d");
  var growthChart = new Chart(growthCtx).Line(growth, null);

  var prefCtx = document.getElementById("PerfMetrics").getContext("2d");
  var prefMetrics = new Chart(prefCtx).Radar(prefChart, {
    scaleShowLabels : true,
    scaleOverride : false
  });

  var prefMetricsLength = prefMetrics.datasets[0].points.length;
  var prefSlider = $("#PerfSlider")

  function updatePrefGraph (sliderVal) {
    console.log("Updating!");
    console.log(sliderVal);
    for (var i = 0; i < prefMetricsLength; i++) {
      prefMetrics.datasets[0].points[i].value = prefData[sliderVal - 1][i];
    }
    prefMetrics.update();
  }

  function animateSlider(val) {
      prefSlider.simpleSlider("setValue", val);
  }

  prefSlider.simpleSlider({
    range : [1,6],
    step : 1,
    snap : true
  });

  prefSlider.bind("slider:changed", function (event, data) {
    updatePrefGraph(data.value);
  });

  var animateCounter = 0;

  var interval = setInterval(function() {
    animateSlider(animateCounter);
    animateCounter++;
    if(animateCounter === 7) {
      clearInterval(interval);
    }
  }, 300);
});

var months = ["November","December","January","February","March","April"];

var growth = {
  labels : months,
  datasets : [
    {
      fillColor : "rgba(220,220,220,0.5)",
      strokeColor : "rgba(220,220,220,1)",
      pointColor : "rgba(220,220,220,1)",
      pointStrokeColor : "#fff",
      data : [65,59,90,81,56,55]
    },
    {
      fillColor : "rgba(151,187,205,0.5)",
      strokeColor : "rgba(151,187,205,1)",
      pointColor : "rgba(151,187,205,1)",
      pointStrokeColor : "#fff",
      data : [28,48,40,19,96,27]
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

