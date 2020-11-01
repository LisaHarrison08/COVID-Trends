// Google Mobility Plotly Chart Selected By State

Plotly.d3.json('./data/data_us.json', function (err, rows) {

    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }

    function byState(state) {
        return rows.filter(function (row) { return row.states === state; });
    }
    //1. get all the states from json  

    //2. populate the dropdown with states

    //3. listen for changes to the dropdown, triggering drawing graph
    function drawPlot(rows) {
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
        var data = [trace1, trace2, trace3, trace4];

        var layout = {
            title: 'VA Mobility Trends',
        };

        Plotly.newPlot('myDiv', data, layout);
    }
})