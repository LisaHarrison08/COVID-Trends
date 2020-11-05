Plotly.d3.csv('/data/google_mob_US.csv', function(err, rows){

    function unpack(rows, key) {
    return rows.map(function (row) { return row[key]; });
}



var trace1 = {
    x: unpack(rows, 'dates'),
    y: unpack(rows, 'SMA_retail_recreation'),
    name: 'Trace1',
    type: 'bar'
  };

  var trace2 = {
    x: unpack(rows, 'dates'),
    y: unpack(rows, 'SMA_parks'),
    name: 'Trace2',
    type: 'bar'
  };

  var trace3 = {
    x: unpack(rows, 'dates'),
    y: unpack(rows, 'SMA_grocery_pharmacy'),
    name: 'Trace3',
    type: 'bar'
   };
  
   var trace4 = {
    x: unpack(rows, 'dates'),
    y: unpack(rows, 'SMA_transit'),
    name: 'Trace4',
    type: 'bar'
   };
  
  var data = [trace1, trace2, trace3, trace4];
  var layout = {
    xaxis: {title: 'X axis'},
    yaxis: {title: 'Y axis'},
    barmode: 'relative',
    title: 'Relative Barmode'
  };
  
  Plotly.newPlot('myDiv', data, layout);

