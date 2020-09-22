// Uncomment to style it like Apple Watch
/*
if (!Highcharts.theme) {
  Highcharts.setOptions({
    chart: {
      backgroundColor: 'black'
    },
    colors: ['#F62366', '#9DFF02', '#0CCDD6'],
    title: {
      style: {
        color: 'silver'
      }
    },
    tooltip: {
      style: {
        color: 'silver'
      }
    }
  });
}
// */

/**
 * In the chart render event, add icons on top of the circular shapes
 */
function renderIcons() {
  // Move icon
  if (!this.series[0].icon) {
    this.series[0].icon = this.renderer
      .path(["M", -8, 0, "L", 8, 0, "M", 0, -8, "L", 8, 0, 0, 8])
      .attr({
        stroke: "#303030",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": 2,
        zIndex: 10
      })
      .add(this.series[2].group);
  }
  this.series[0].icon.translate(
    this.chartWidth / 2 - 10,
    this.plotHeight / 2 -
      this.series[0].points[0].shapeArgs.innerR -
      (this.series[0].points[0].shapeArgs.r -
        this.series[0].points[0].shapeArgs.innerR) /
        2
  );

  // Exercise icon
  if (!this.series[1].icon) {
    this.series[1].icon = this.renderer
      .path([
        "M",
        -8,
        0,
        "L",
        8,
        0,
        "M",
        0,
        -8,
        "L",
        8,
        0,
        0,
        8,
        "M",
        8,
        -8,
        "L",
        16,
        0,
        8,
        8
      ])
      .attr({
        stroke: "#ffffff",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": 2,
        zIndex: 10
      })
      .add(this.series[2].group);
  }
  this.series[1].icon.translate(
    this.chartWidth / 2 - 10,
    this.plotHeight / 2 -
      this.series[1].points[0].shapeArgs.innerR -
      (this.series[1].points[0].shapeArgs.r -
        this.series[1].points[0].shapeArgs.innerR) /
        2
  );

  // Stand icon
  if (!this.series[2].icon) {
    this.series[2].icon = this.renderer
      .path(["M", 0, 8, "L", 0, -8, "M", -8, 0, "L", 0, -8, 8, 0])
      .attr({
        stroke: "#303030",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": 2,
        zIndex: 10
      })
      .add(this.series[2].group);
  }

  this.series[2].icon.translate(
    this.chartWidth / 2 - 10,
    this.plotHeight / 2 -
      this.series[2].points[0].shapeArgs.innerR -
      (this.series[2].points[0].shapeArgs.r -
        this.series[2].points[0].shapeArgs.innerR) /
        2
  );
}
