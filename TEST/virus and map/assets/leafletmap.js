var svgWidth = 650;
var svgHeight = 450;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100 
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


  var svg = d3
  .select("#lfmap")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


var mapboxAccessToken = {pk.eyJ1IjoibG9yaXdhcmQiLCJhIjoiY2tnaDFiYXZkMHBmMDJ1cXQxczhyd2V6OSJ9.IpxO-oxuJsYnULjTJBkwDA};
var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    attribution: ...,
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

L.geoJson(statesData).addTo(map);



