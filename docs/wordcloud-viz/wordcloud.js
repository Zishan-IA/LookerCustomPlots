const dscc = require('@google/dscc');
const d3 = require('d3');
const cloud = require('d3-cloud');

// Render function
function drawViz(data) {
  const words = data.tables.DEFAULT.map(row => ({
    text: row[0].v,
    size: +row[1].v
  }));

  const width = 500, height = 400;

  d3.select("body").select("svg").remove();  // Clear previous

  const layout = cloud()
    .size([width, height])
    .words(words)
    .padding(5)
    .fontSize(d => d.size * 5)
    .on("end", draw);

  layout.start();

  function draw(words) {
    d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", d => d.size + "px")
      .style("fill", "#69b3a2")
      .attr("text-anchor", "middle")
      .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
      .text(d => d.text);
  }
}

dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });
