
   // Google Mobility Plotly Chart Selected By State

Plotly.d3.json('./data/Merged_data.json', function (err, rows) {

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
          drawPlot(data);
    }
      
    //4. by default, trigger graph for "Alabama"
    getData("Alabama"); //default state

    function drawPlot(rows) {
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
            title: 'Mobility Trends',
        };

        Plotly.newPlot('myDiv', data, layout);
    }
})

// Google Mobility Plotly Chart 2 Selected By State

Plotly.d3.json('./data/Merged_data.json', function (err, rows) {

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
    var select = document.getElementById("selDataset2");
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
          drawPlot(data);
    }
      
    //4. by default, trigger graph for "Alabama"
    getData("Alabama"); //default state

    function drawPlot(rows) {
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
            title: 'Mobility Trends',
        };

        Plotly.newPlot('myDiv2', data, layout);
    }
})
