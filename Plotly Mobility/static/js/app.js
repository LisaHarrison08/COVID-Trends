// Google Mobility Plotly Chart Selected By State

Plotly.d3.csv('/data/google_mob_US.csv', function(err, rows){

        function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }
      
      
      var trace1 = {
    type: "scatter",
    mode: "lines",
    name: 'Retail & Recreation',
    x: unpack(rows, 'dates'),
    y: unpack(rows, 'SMA_retail_recreation'),
    line: { color: '#17BECF' }
}

var trace2 = {
    type: "scatter",
    mode: "lines",
    name: 'Parks',
    x: unpack(rows, 'dates'),
    y: unpack(rows, 'SMA_parks'),
    line: { color: 'red' }
}
var trace3 = {
    type: "scatter",
    mode: "lines",
    name: 'Grocery & Pharmacy',
    x: unpack(rows, 'dates'),
    y: unpack(rows, 'SMA_grocery_pharmacy'),
    line: { color: 'green' }
}

var trace4 = {
    type: "scatter",
    mode: "dotted-lines",
    name: 'Transit',
    x: unpack(rows, 'dates'),
    y: unpack(rows, 'SMA_transit'),
    line: { color: '#7F7F7F' }
}
var data = [trace1, trace2,trace3, trace4];

var layout = {
    title: 'VA Mobility Trends',
};

Plotly.newPlot('myDiv', data, layout);
      })