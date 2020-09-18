// Dribbble rebound to CodePen crossover: http://drbl.in/jxHT

var w = 780,
  h = 350,
  vis = null,
  g,
  current,
  duration = 700,
  ease = "cubic-out",
  reset = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function draw(id) {
  var data = generateData(),
    other_data = generateOtherData(),
    margin = 30,
    y = d3.scale
      .linear()
      .domain([0, d3.max(data)])
      .range([0 + margin, h - 60]),
    x = d3.scale
      .linear()
      .domain([0, data.length])
      .range([0 + margin, w + 50]),
    line = d3.svg
      .line()
      .x(function (d, i) {
        return x(i);
      })
      .y(function (d) {
        return -1 * y(d);
      });

  console.log(data);

  var vis = d3.select("#entity-chart").select("svg").select("g");

  if (vis.empty()) {
    vis = d3
      .select("#entity-chart")
      .append("svg:svg")
      .attr("width", w)
      .attr("height", h);

    // -- had to remove drop shadows ---
    // -- made transitions all funky :( ---
    // filters go in defs element
    // var defs = vis.append("defs");
    //
    // var filter = defs.append("filter")
    //     .attr("id", "drop-shadow")
    //     .attr("height", "135%");
    //
    // filter.append("feGaussianBlur")
    //     .attr("in", "SourceAlpha")
    //     .attr("stdDeviation", 10)
    //     .attr("result", "blur");
    //
    // filter.append("feOffset")
    //     .attr("in", "blur")
    //     .attr("dx", 0)
    //     .attr("dy", 10)
    //     .attr("result", "offsetBlur");
    //
    // var feMerge = filter.append("feMerge");
    //
    // feMerge.append("feMergeNode")
    //     .attr("in", "offsetBlur");
    // feMerge.append("feMergeNode")
    //     .attr("in", "SourceGraphic");

    g = vis.append("svg:g").attr("transform", "translate(0, 350)");

    g.append("svg:line")
      .attr("x1", x(0))
      .attr("y1", -1 * y(0))
      .attr("x2", x(w))
      .attr("y2", -1 * y(0));

    g.selectAll(".xLabel")
      .data(x.ticks(12))
      .enter()
      .append("svg:text")
      .attr("class", "xLabel")
      .text(String)
      .attr("x", function (d) {
        return x(d - 1);
      })
      .attr("y", 0)
      .attr("text-anchor", "middle");
  }

  g.append("svg:path")
    .attr("class", id)
    .attr("d", line(reset))
    // .style("filter", "url(#drop-shadow)")
    .transition()
    .duration(duration)
    .ease(ease)
    .attr("d", line(data));

  g.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", id)
    .attr("r", 6.5)
    .attr("cx", function (d, i) {
      return x(i);
    })
    .attr("cy", 0)
    .transition()
    .duration(duration)
    .ease(ease)
    .attr("cy", function (d) {
      return -1 * y(d);
    })
    .attr("title", function (d, i) {
      return x(i);
    });

  current = id;
  console.log("current = " + current, "data = " + data);

  $("svg circle").tipsy({
    gravity: "s",
    html: true,
    fade: true,
    opacity: 0.95,
    title: function () {
      var d = this.__data__;
      var pDate = d.date;
      return "Metric: " + Math.floor(d);
    }
  });
}

function removeData(id) {
  d3.selectAll("circle." + id)
    .transition()
    .duration(duration)
    .ease(ease)
    .attr("cy", 0)
    .attr("r", 0)
    .remove();
  d3.selectAll("path." + id).remove();
}

function generateData() {
  var data = [];
  for (var i = 0, l = 12; i < l; i++) {
    data.push(Math.round(Math.random() * l));
  }
  return data;
}
function generateOtherData() {
  var other_data = [3, 9, 3, 1, 5, 4, 4, 5, 6, 9, 4, 2];
  return other_data;
}
function subMetricChange() {
  $(".benchmarks-checkbox").on("change", function (e) {
    id = $(this).attr("id");
    if ($(this).is(":checked")) {
      $(this).parent().addClass("active");
      draw(id);
    } else {
      removeData(id);
      $(this).parent().removeClass("active");
    }
    e.preventDefault();
  });
  $('button[type="submit"]').on("click", function (e) {
    $(".benchmarks-checkbox").prop("checked", false);
    $(".benchmarks-label").removeClass("active");
    id = $(this).attr("id");
    $(".sub-metric-checkbox").parent().removeClass("active");
    d3.selectAll("circle")
      .transition()
      .duration(duration)
      .ease(ease)
      .attr("cy", 0)
      .attr("r", 0)
      .remove();
    d3.selectAll("path").remove();

    $(this).parent().addClass("active");
    draw(id);
    e.preventDefault();
  });
}
function pageInit() {
  $("#Scoring-Metric-1")
    .addClass("first")
    .attr("checked", "checked")
    .parent()
    .addClass("active");
  id = $(".sub-metric-checkbox.first").attr("id");
  draw(id);
}

$(document).ready(function () {
  subMetricChange();
  pageInit();
});
