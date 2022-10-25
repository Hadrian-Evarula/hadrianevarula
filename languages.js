var movies = {
    0: {
      movieName: "HTML",
      moviePercentage: 100
    },
    1: {
      movieName: "CSS",
      moviePercentage: 80
    },
    2: {
      movieName: "JAVA",
      moviePercentage: 92
    },
    3: {
      movieName: "JAVASCRIPT",
      moviePercentage: 60
    },
    4: {
      movieName: "SQL",
      moviePercentage: 78
    },
    5: {
      movieName: "PHP",
      moviePercentage: 50
    },
    6: {
      movieName: "PYTHON",
      moviePercentage: 70
    }
  };
  var moviesLength = Object.keys(movies).length;
  
  var callBarChart = function() {
    var barLine = null;
  
    $("canvas#HorizontalBarWithLines").remove();
    $("div.bar-line").append(
      '<canvas id="HorizontalBarWithLines" width="700"></canvas>'
    );
  
    var canvas = document.getElementById("HorizontalBarWithLines");
    canvas.height = moviesLength * 50;
  
    var movieName = [];
    var moviePercentage = [];
  
    for (var i = 0; i < moviesLength; i++) {
      movieName.push(movies[i]["movieName"]);
      moviePercentage.push(movies[i]["moviePercentage"]);
    }
  
    var data = {
      labels: movieName,
      datasets: [
        {
          label: "Percentage",
          backgroundColor: "#0EBEFF",
          fill: true,
          data: moviePercentage
        }
      ]
    };
  
    var ctx = document.getElementById("HorizontalBarWithLines").getContext("2d");
  
    const verticalLine = {
      renderVerticalLine: function(chartInstance, pointIndex, i) {
        const xaxis = chartInstance.scales["x-axis-0"];
        const yaxis = chartInstance.scales["y-axis-0"];
        const context = chartInstance.chart.ctx;
  
        // render vertical line
        context.beginPath();
  
        if (i === 0) {
          context.strokeStyle = "#DA1726";
        } else if (i === 1) {
          context.strokeStyle = "#FFDD40";
        } else if (i === 2) {
          context.strokeStyle = "#47CF73";
        }
  
        context.moveTo(xaxis.getPixelForValue(pointIndex), yaxis.top);
        context.lineTo(xaxis.getPixelForValue(pointIndex), yaxis.bottom);
        context.stroke();
      },
  
      afterDatasetsDraw: function(chart, easing) {
        if (chart.config.lineAtIndex) {
          var index = [];
          index = chart.config.lineAtIndex;
          for (i = 0; i < index.length; i++) {
            this.renderVerticalLine(chart, index[i], i);
          }
        }
      }
    };
  
    Chart.plugins.register(verticalLine);
  
    if (barLine != null) {
      barLine.remove();
    }
  
    barLine = new Chart(ctx, {
      type: "horizontalBar",
      data: data,
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              display: true,
              ticks: {
                display: true,
                fontColor: "#fff",
                beginAtZero: true,
                stepSize: 10,
                max: 100
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              barPercentage: 0.4,
              ticks: {
                display: true,
                fontColor: "#fff"
              },
              gridLines: {
                display: false
              }
            }
          ]
        }
      },
      label: "Progress",
      lineAtIndex: [40, 60, 80]
    });
  };
  
  callBarChart();
  