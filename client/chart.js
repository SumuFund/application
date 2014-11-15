var months = ["November","December","January","February","March","April","May"];

var growth = {
  labels : months,
  datasets : [
    {
      fillColor : "rgba(220,220,220,0.5)",
      strokeColor : "rgba(220,220,220,1)",
      pointColor : "rgba(220,220,220,1)",
      pointStrokeColor : "#fff",
      data : [65,59,90,81,56,55,40]
    },
    {
      fillColor : "rgba(151,187,205,0.5)",
      strokeColor : "rgba(151,187,205,1)",
      pointColor : "rgba(151,187,205,1)",
      pointStrokeColor : "#fff",
      data : [28,48,40,19,96,27,100]
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

var prefData = {
  labels: perfLabels,
  datasets: [
    {
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [5, 2, 1, 1, 1, 2, 1]
    },
  ]
};

$( document ).ready(function() {
  //Get the context of the canvas element we want to select
  var growthCtx = document.getElementById("Growth").getContext("2d");
  var growthChart = new Chart(growthCtx).Line(growth, null);

  var prefCtx = document.getElementById("PerformanceMetrics").getContext("2d");
  var prefMetrics = new Chart(prefCtx).Radar(prefData, {
    scaleOverride: false
  });

  $("#button").on("click", function() {
    console.log("Updating!");
    var data2 = [3, 4, 3, 3, 3, 4, 3];
    var length = prefMetrics.datasets[0].points.length;

    console.log(data2);

    for (var i = 0; i < length; i++) {
      prefMetrics.datasets[0].points[i].value = data2[i];
    }
    prefMetrics.update();

    setTimeout(function() {
      // Do nothing for 1 sec
      var data3 = [4, 4, 5, 4, 5, 4, 5];
      console.log(data3);

      for (var i = 0; i < length; i++) {
        prefMetrics.datasets[0].points[i].value = data3[i];
      }
      prefMetrics.update();
    }, 1000);
  });
});
