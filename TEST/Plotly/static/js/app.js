
// Function to get the data  and build the initial/start up page with graphs shown for Id 940,
// as well as build a options menu for the different IDs
function BuildStartUpPage() {
  d3.json("./data/samples.json").then(function(data) {
    var names = data.names;

    // ***Build the options menu
    var select = d3.select("#selDataset");
    // For each Id in the names array, creates a option tag and adds the ID as a text
    names.forEach(id => {
      var option = select.append("option");
      option.text(id);
    })

// Call the function that builds the Bar Chart, giving the Id value of 940
  buildBarChart(data, 940);
// Call the function that builds the Bubble Chart, giving the Id value of 940
  BuildBubbleChart(data, 940);
// Call the function that builds the Meta data panel, giving the Id value of 940
  buildMDataPanel(data, 940);
// Call the function that builds the Meta data panel, giving the Id value of 940
  BuildGauge (data, 940);
  
  });
};

BuildStartUpPage();


// Creating a function that creates the Bar chart
function buildBarChart(data, variableID){

  // Extract the needed data from the data(JSON), and save it as a variables
  var samples = data.samples;   
  var dataId = samples.filter(sample =>sample.id == variableID);
  
  var Ids10 = dataId[0].otu_ids.slice(0,10);
  var IdsAsString = Ids10.map(Id => "OTU "+Id);

  var sample_value10 = dataId[0].sample_values.slice(0,10).reverse();
  
  var sample_labels10 = dataId[0].otu_labels.slice(0,10);

// Create the trace, layout and the plot
var trace1 = {
  x: sample_value10,
  y: IdsAsString,
  type: 'bar',
  orientation : "h",
  text: sample_labels10,
  marker: {
    color: 'rgb(142,124,195)'
  }
};

var data = [trace1];

var layout = {
  title: 'Top 10 OTUs found',
  font:{
    family: 'Raleway, sans-serif'
  },
  showlegend: false,
  yaxis: {
    zeroline: false,
    gridwidth: 2
  },
  bargap: 0.1
};

Plotly.newPlot("bar", data, layout);

};

// Creating a function that creates the Bubble chart
function BuildBubbleChart(data, variableID){

// Extract the needed data from the data(JSON), and save it as a variables
  var samples = data.samples;    
  var dataId = samples.filter(sample =>sample.id == variableID);
  var Ids = dataId[0].otu_ids;
  var sample_value = dataId[0].sample_values;
  var sample_labels = dataId[0].otu_labels;
 
// Create the trace, layout and the plot
var trace1 = {
  x: Ids,
  y: sample_value,
  text: sample_labels,
  mode: 'markers',
  marker: {
    color: Ids,
    size: sample_value
  }
};

var data = [trace1];

var layout = {
  title: 'Bubble chart for each sample',
  showlegend: false,
  height: 500,
  width: 1000,
  xaxis: {
    visible: true,
    title: {
      text: "OTU ID"}
  }
};

Plotly.newPlot("bubble", data, layout);

};


// Creating a function that creates the MetaData panel
function buildMDataPanel (data, variableID){

  var mData = data.metadata.filter( d => d.id == variableID)[0];
  
  var div = d3.select("#sample-metadata");
    // remove any children from the div, 
    div.html("");
  Object.entries(mData).forEach(([key, value]) => {
    var p = div.append("p");
    p.text(`${key}: ${value}`);
  });
};

// Inactive, see index.html
// On change to the DOM, call optionChanged()
// d3.selectAll("#selDataset").on("change", getData);


// Function called by DOM changes
function getData(){

  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var variableID = dropdownMenu.property("value");
  console.log(variableID);
  // Call function to update the chart
  BuildWithFilter(variableID);
};


// Function that builds the plots with the variable Id that is selected.
function BuildWithFilter(variableID) {
  d3.json("./data/samples.json").then(function(data) {
   

  buildBarChart(data, variableID);

  BuildBubbleChart(data, variableID);

  buildMDataPanel(data, variableID);

  BuildGauge (data, variableID);

  });
};

// Function that builds the Gauge for the variable Id that is selected.
function BuildGauge (data, variableID){

  // Idea and base code modified from https://com2m.de/blog/technology/gauge-charts-with-plotly/

  // Set the value for the tip of the arrow
  var mData = data.metadata.filter( d => d.id == variableID)[0];
  var WashFreq = mData.wfreq
  var level = 20 * WashFreq;
  
  // Trig to calc meter point
  var degrees = 180 - level,
       radius = .5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);
  var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
  
  var mainPath = path1,
       pathX = String(x),
       space = ' ',
       pathY = String(y),
       pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);
  
  var data = [{ type: 'scatter',
     x: [0], y:[0],
      marker: {size: 14, color:'850000'},
      showlegend: false,
      name: 'Scrubs',
      text: WashFreq,
      hoverinfo: 'text+name'},
    { values: [1,1,1,1,1,1,1,1,1,9],
    rotation: 90,
    text: ['8-9', '7-8','6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',''],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['#2EC912', '#4CD233','#6AE154','#84E472',
                           '#9DE98F', '#B4ECAA', '#C9ECAA','#DDEAB0','#F4F2B7',
                           'White']},
    hoverinfo: 'none',
    hole: .4,
    type: 'pie',
    showlegend: false
  }];
  
  var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],
      title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week", font: { size: 18 } },  
    height: 500,
    width: 500,
    xaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1]}
  };
  
  Plotly.newPlot("gauge", data, layout);
  };

  