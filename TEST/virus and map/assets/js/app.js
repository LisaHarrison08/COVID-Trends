var svgWidth = 450;
var svgHeight = 350;

// VirusPath = VirusPath

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100 
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// var svg2 = d3
//   .select("#virus")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);


  var svg = d3
  .select("#map")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


  // ************************

// MAP PART

// **************************

// Append an SVG group
// var chartGroup = svg.append("g")
// .attr("transform", `translate(${margin.left}, ${margin.top})`);


// // The svg
// var svg = d3.select("svg"),
//     width = +svg.attr("width"),
//     height = +svg.attr("height");

// Map and projection
var projection = d3.geoMercator()
    .scale(350) // This is the zoom
    .translate([850, 440]); // You have to play with these values to center your map

// Path generator
var path = d3.geoPath()
    .projection(projection)

// Load external data and boot
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/us_states_hexgrid.geojson.json", function(data){

  // Draw the map
   var paths = svg.append("g")
      .selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
          .attr("fill", "#69a2a2")
          .attr("d", path)
          .attr("value", function(d){ return d.properties.google_name})
          .attr("stroke", "white")

  // Add the labels
  svg.append("g")
      .selectAll("labels")
      .data(data.features)
      .enter()
      .append("text")
        .attr("x", function(d){return path.centroid(d)[0]})
        .attr("y", function(d){return path.centroid(d)[1]})
        .text(function(d){ return d.properties.iso3166_2})
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .style("font-size", 11)
        .style("fill", "white")
        .attr("value", function(d){ return d.properties.google_name})

  svg.selectAll("path")
    .on("click", function() {
    // get value of selection
    var value = d3.select(this).attr("value");
    console.log(value)
    });

  svg.selectAll("text")
  .on("click", function() { 
  // get value of selection
  var value = d3.select(this).attr("value");
  console.log(value)
  });  
    
    
  
})






















  // ***********
  // VIRUS PATH code
  // ************

//   // Retrieve data from the CSV file and execute everything below
// d3.csv("assets/data/owid-covid-data.csv").then(function(Data) {
  
//   console.log(Data)

//   UsaData = Data.filter(d =>d.iso_code == "USA")

//   console.log(UsaData)

//   const casesMinMax = d3.extent(UsaData, d =>+d.new_cases)
//   console.log(casesMinMax)

//   const SizeScale = d3.scaleLinear().domain(casesMinMax).range([8,15]);

//   const MaxValue = d3.max(UsaData, d => +d.new_cases)
//   console.log(MaxValue)

//   const MaxCircleSize = SizeScale(MaxValue)
//   console.log(MaxCircleSize)

//   console.log(VirusPath)

//   var ChoosenValueForDay = 40000

//   var VirusSize = SizeScale(ChoosenValueForDay)

//   var virusGroup = svg2.append("g").attr("transform", `translate(${width/2}, ${height/2})`);
  

//   virusGroup.selectAll('path')
//     .data([VirusPath])
//     .enter()
//     .append('path')
//     .attr('d', VirusPath)
//     .style("fill", "#90C4E4")    
//     .attr("transform", ` scale(5)`)


//     virusGroup.selectAll("circle")
//     .data([VirusPath])
//     .enter()
//     .append("circle")
//     .attr("cx", 13)
//     .attr("cy", 13)
//     .attr("r", 13)
//     .attr("fill", "pink")
//     .attr("opacity", ".25")
//     .attr("transform", `scale(5)`);  

//     virusGroup.selectAll("circle2")
//     .data([VirusPath])
//     .enter()
//     .append("circle")
//     .attr("cx", 13)
//     .attr("cy", 13)
//     .attr("r", 5)
//     .attr("fill", "red")
//     .attr("opacity", ".25")
//     .attr("transform", `scale(5)`);  

// });


// **********************
// d3 HOMEWORK
// **********************


// ***********************************************************

// // Initial Parameters
// var chosenXAxis = "poverty";
// var chosenYAxis = "healthcare";  


// // function used for updating x-scale var upon click on x axis labels
// function xScale(Data, chosenXAxis) {
//   // create scales
//   var xLinearScale = d3.scaleLinear()
//     .domain([d3.min(Data, d => d[chosenXAxis]) * 0.8,
//       d3.max(Data, d => d[chosenXAxis]) * 1.2
//     ])
//     .range([0, width]);

//   return xLinearScale;

// }

// // function used for updating y-scale var upon click on y axis labels
// function yScale(Data, chosenYAxis) {
//   // create scales
//   var yLinearScale = d3.scaleLinear()
//     .domain([d3.min(Data, d => d[chosenYAxis]) * 0.6,
//       d3.max(Data, d => d[chosenYAxis]) * 1.1
//     ])
//     .range([height,0]);

//   return yLinearScale;

// }

// // function used for updating circles group with new tooltip
// function updateToolTip(chosenXAxis, circlesGroup) {

//   var Labelx;
//   var Labely;

//   if (chosenXAxis === "poverty") {
//     Labelx = "poverty:";
//   } else if (chosenXAxis === "age") {
//     Labelx = "Age Median:";
//   }
//   else {
//     Labelx = "Household Income (Median)";
//   }

//   if (chosenYAxis === "healthcare") {
//     Labely = "Lacks Healthcare (%):";
//   } else if (chosenYAxis === "obese") {
//     Labely = "Obese (%):";
//   }
//   else {
//     Labely = "Smokes:";
//   }


//   var toolTip = d3.tip()
//     .attr("class", "tooltip d3-tip")
//     .offset([80, -60])
//     .html(function(d) {
//       return (`${d.state} <br> ${Labelx}  ${d[chosenXAxis]} <br> ${Labely}  ${d[chosenYAxis]}`);
//     });

//   circlesGroup.call(toolTip);

//   circlesGroup.on("mouseover", function(data) {
//     toolTip.show(data, this);
//   })
//     // onmouseout event
//     .on("mouseout", function(data, index) {
//       toolTip.hide(data);
//     });

//   return circlesGroup;
// }

// // function used for updating xAxis var upon click on axis label
// function renderAxes(newXScale, xAxis) {
//   var bottomAxis = d3.axisBottom(newXScale);

//   xAxis.transition()
//     .duration(1000)
//     .call(bottomAxis);

//   return xAxis;
// }

// // function used for updating the text in the circles upon click on axis label

// function renderText(textGroup, chosenXAxis, chosenYAxis, xLinearScale, yLinearScale) {

//   // Append Text to Circles
//    textGroup.transition()
//    .duration(1000)
//    .attr("x", d => xLinearScale(d[chosenXAxis]))
//    .attr("y", d => yLinearScale(d[chosenYAxis] * .97))
//    .text(d => (d.abbr));
  
//   return textGroup;  
// }



// // function used for updating circles group with a transition to
// // new circles
// function renderCircles(circlesGroup, newXScale, chosenXAxis) {

//   circlesGroup.transition()
//     .duration(1000)
//     .attr("cx", d => newXScale(d[chosenXAxis]));

//   return circlesGroup;
// }


// // Retrieve data from the CSV file and execute everything below
// d3.csv("assets/data/data.csv").then(function(Data) {
  

//   // parse data into Int
//     Data.forEach(function(data) {
//       data.age = +data.age;
//       data.healthcare = +data.healthcare;
//       data.income = +data.income;
//       data.obesity = +data.obesity;
//       data.poverty = +data.poverty;
//       data.smokes = +data.smokes;
//   });



//   // xLinearScale function above csv import
//   var xLinearScale = xScale(Data, chosenXAxis);
//   var yLinearScale = yScale(Data, chosenYAxis);
  

//   // Create initial axis functions
//   var bottomAxis = d3.axisBottom(xLinearScale);
//   var leftAxis = d3.axisLeft(yLinearScale);

//   // append x axis
//   var xAxis = chartGroup.append("g")
//     .classed("x-axis", true)
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//   // append y axis
//   var yAxis = chartGroup.append("g")
//   .classed("y-axis", true)
//   .call(leftAxis);

//   // Append initial circles
//   var circlesGroup = chartGroup.selectAll(".circle")
//     .data(Data)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d[chosenXAxis]))
//     .attr("cy", d => yLinearScale(d[chosenYAxis]))
//     .attr("r", 16)
//     .attr("class", "circle")
//     .attr("fill", "blue")
//     .attr("opacity", ".5");


//   // Append Text to Circles
//   var textGroup = chartGroup.selectAll(".stateText")
//     .data(Data)
//     .enter()
//     .append("text")
//     .attr("x", d => xLinearScale(d[chosenXAxis]))
//     .attr("y", d => yLinearScale(d[chosenYAxis] * .97))
//     .text(d => (d.abbr))
//     .attr("class", "stateText");

//   // xAxis Labels
//   var xLabel = svg.append("g")
//     .attr("class", "x aText")
//     .style("font-size", "16")
//     .attr("transform", `translate(${svgWidth / 2},${height})`);
//   var incomeLabel = xLabel
//     .append("text")
//     .text("Household Income (Median)")
//     .attr("value", "income")
//     .attr("class", "inactive")
//     .attr("y", height * .17);
//   var ageLabel = xLabel
//     .append("text")
//     .text("Age (Median)")
//     .attr("value", "age")
//     .attr("class", "inactive")
//     .attr("y", height * .22);
//   var povertyLabel = xLabel
//     .append("text")
//     .text("Poverty (%)")
//     .attr("value", "poverty")
//     .attr("class", "active")
//     .attr("y", height * .12);

//   // yAxis Labels
//   var yLabel = svg.append("g")
//     .attr("class", "y aText")
//     .style("font-size", "16")
//     .attr("transform", `translate(0, ${height / 2}) rotate(-90)`);
//   yLabel
//     .append("text")
//     .text("Obese (%)")
//     .attr("value", "obese")
//     .attr("class", "inactive")
//     .attr("y", height * .05);
//   yLabel
//     .append("text")
//     .text("Smokes (%)")
//     .attr("value", "smokes")
//     .attr("class", "inactive")
//     .attr("y", height * .10);
//   yLabel
//     .append("text")
//     .text("Lacks Healthcare (%)")
//     .attr("value", "healthcare")
//     .attr("class", "active")
//     .attr("y", height * .15);


//   // updateToolTip function above csv import
//   var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);



//   // x axis labels event listener
//   xLabel.selectAll("text")
//     .on("click", function() {
//       // get value of selection
//       var value = d3.select(this).attr("value");
//       console.log(value)
//       if (value !== chosenXAxis) {

//         // replaces chosenXAxis with value
//         chosenXAxis = value;

//         console.log(chosenXAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xScale(Data, chosenXAxis);

//         // updates x axis with transition
//         xAxis = renderAxes(xLinearScale, xAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

//         // updates text with new values
//         textGroup = renderText(textGroup, chosenXAxis, chosenYAxis, xLinearScale, yLinearScale);

//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//         // changes classes to change bold text
//         if (chosenXAxis === "poverty") {
//           povertyLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           ageLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           incomeLabel
//             .classed("active", false)
//             .classed("inactive", true);  
//         } else if (chosenXAxis === "age"){
//           povertyLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           ageLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           incomeLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else {
//           povertyLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           ageLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           incomeLabel
//             .classed("active", true)
//             .classed("inactive", false);
          
//         }
//       }
//     });  

  

// });

