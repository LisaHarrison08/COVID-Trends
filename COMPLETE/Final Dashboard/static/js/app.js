
   // Google Mobility Plotly Chart Selected By State

Plotly.d3.json('./data/Merged_data.json', function (err, rows) {

    console.log(rows)

    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }

    function byState(state) {
        return rows.filter(function (row) { return row.states === state; });
    }
    //1. get all the states from json  
    var statesArray = rows.map(function(row){ return row.states; }); //all states, but with duplicates
    var stateSet = new Set(statesArray); //remove all duplicates!!!!
    var uniqueStates = Array.from(stateSet); //convert back into an array

    //2. populate the dropdown with states
    var select = document.getElementById("selDataset");
    for (var state of uniqueStates){ //1. state = "Alabama", 2. state = "Alaska"
        var option = document.createElement("option");
          option.setAttribute("value", state);
          option.textContent = state;
          select.appendChild(option);
    }

    //3. listen for changes to the dropdown, triggering drawing graph
    select.addEventListener("change", function(event){ getData(event.target.value) });
    function getData(state){
        let data = byState(state);
          drawPlot(data, state);
          drawPlotSBrevenu(data, state);
          drawPlotCovid(data, state);
    }
      
    //4. by default, trigger graph for "Alabama"
    getData("Alabama"); //default state
    

    // **********
    // Change in the drawPlot Function. 
    // Adding the state as a value the function takes, 
    // and use it in the title, so with each plot the title will change
    // **********
    function drawPlot(rows, state) {
        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: 'Retail & Recreation',
            x: unpack(rows, 'dates'),
            y: unpack(rows, 'SMA_retail_recreation'),
            line: { color: '#00CED1' }
        }
        var trace2 = {
            type: "scatter",
            mode: "lines",
            name: 'Parks',
            x: unpack(rows, 'dates'),
            y: unpack(rows, 'SMA_parks'),
            line: { color: '#708090'}
        }
        var trace3 = {
            type: "scatter",
            mode: "lines",
            name: 'Grocery & Pharmacy',
            x: unpack(rows, 'dates'),
            y: unpack(rows, 'SMA_grocery_pharmacy'),
            line: { color: '#FF7F50' }
        }
        var trace4 = {
            type: "scatter",
            mode: "dotted-lines",
            name: 'Transit',
            x: unpack(rows, 'dates'),
            y: unpack(rows, 'SMA_transit'),
            line: { color: '#00FF00' }
        }
        var trace5 = {
            type: "scatter",
            mode: "dotted-lines",
            name: 'Workplaces',
            x: unpack(rows, 'dates'),
            y: unpack(rows, 'SMA_workplaces'),
            line: { color: '#9932CC'}
        }
        var trace6 = {
            type: "scatter",
            mode: "dotted-lines",
            name: 'Residential',
            x: unpack(rows, 'dates'),
            y: unpack(rows, 'SMA_residential'),
            line: { color: '#C71585' }
        }
        var data = [trace1, trace2, trace3, trace4, trace5, trace6];

        var layout = {
            title: `${state} Mobility Trends`,
        };

        Plotly.newPlot('myDiv', data, layout);
    }


// ********************************************
// MAP
// ********************************************

// Define the Svg size and margins
var svgWidth = 450;
var svgHeight = 350;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100 
  };

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;  

//   Selecting the SVG location in the HTML
  var svg = d3
  .select("#map")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Map and projection
var projection = d3.geoMercator()
    .scale(350) // This is the zoom
    .translate([850, 440]); // You have to play with these values to center your map

// Path generator
var path = d3.geoPath()
    .projection(projection)  

// Load external Map data and boot
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
    var EndCut = value.search("United")
    var value1 = value.slice(0, EndCut-2);
    console.log(value1)
    // value1 is the name of the state in a string
    // The byState function filters the data by state ...return rows.filter(function (row) { return row.states === state; })
    // drawPlot, simply draws the plot fit the filtered data
    drawPlot(byState(value1), value1);
    drawPlotSBrevenu(byState(value1), value1);
    drawPlotCovid(byState(value1), value1);
    });

// The map has two part, the path (blue colour) and the text. this is event listener for the text 
  svg.selectAll("text")
  .on("click", function() { 
  // get value of selection
  var value = d3.select(this).attr("value");
  var EndCut = value.search("United")
  var value1 = value.slice(0, EndCut-2);
  console.log(value1)
  drawPlot(byState(value1), value1);
  drawPlotSBrevenu(byState(value1), value1);
  drawPlotCovid(byState(value1), value1);
  });  
    
    
  
}) //Ends the data load and function for the map   


// function for plottyng SB revenue
function drawPlotSBrevenu(rows, state) {
    var trace1 = {
        type: "scatter",
        mode: "lines",
        name: 'Small Business Revenu',
        x: unpack(rows, 'dates'),
        y: unpack(rows, 'revenue_all'),
        line: { color: '#00CED1' }
    }
    var data = [trace1];

    var layout = {
        title: `Small Business Revenue for ${state}`,
    };

    Plotly.newPlot('plot-revenue', data, layout);
}//Ends the Drow plot for SB revenu

// Function for plottying covid cases

function drawPlotCovid(rows, state) {

    var trace1 = {
        x: unpack(rows, 'dates'),
        y: unpack(rows, 'new_case_count'),
        name: 'Daily Covid Cases',
        marker: {color: 'rgb(55, 83, 109)'},
        type: 'bar'
      };
      
      var trace2 = {
        x: unpack(rows, 'dates'),
        y: unpack(rows, 'case_count'),
        name: 'Total Covid Case Count',
        marker: {color: 'rgb(26, 118, 255)'},
        type: 'bar'
      };
      
      var data = [trace1, trace2];
      
      var layout = {
        title: `Covid Cases, daily and total for ${state}`,
        xaxis: {tickfont: {
            size: 14,
            color: 'rgb(107, 107, 107)'
          }},
        yaxis: {
          title: 'Number of Cases',
          titlefont: {
            size: 16,
            color: 'rgb(107, 107, 107)'
          },
          tickfont: {
            size: 14,
            color: 'rgb(107, 107, 107)'
          }
        },
        legend: {
          x: 0,
          y: 1.0,
          bgcolor: 'rgba(255, 255, 255, 0)',
          bordercolor: 'rgba(255, 255, 255, 0)'
        },
        barmode: 'group',
        bargap: 0.15,
        bargroupgap: 0.1
      };
      
      Plotly.newPlot('plot-covid', data, layout);


};


}) //Ends the Promise 