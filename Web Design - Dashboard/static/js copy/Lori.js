Plotly.d3.csv('/data/google_mob_US.csv', function(err, rows){

    function unpack(rows, key) {
    return rows.map(function (row) { return row[key]; });
}


var trace1 = {
    x: unpack(rows, 'dates'),
    y: unpack(rows, 'SMA_retail_recreation'),
    mode: 'markers',
    name: 'North America',
    text: ['United States', 'Canada'],
    marker: {
      color: 'rgb(164, 194, 244)',
      size: 12,
      line: {
        color: 'white',
        width: 0.5
      }
    },
    type: 'scatter'
  };
  
  
  
  var data = [trace1];
  
  var layout = {
    title: 'Quarter 1 Growth',
    xaxis: {
      title: 'GDP per Capita',
      showgrid: false,
      zeroline: false
    },
    yaxis: {
      title: 'Percent',
      showline: false
    }
  };
  
  Plotly.newPlot('myDiv', data, layout);