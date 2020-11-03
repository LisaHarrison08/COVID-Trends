// the state dropdown is not ordered alphabetically - data is correct viewed overtime
// the covid_us_state data is ordered by state but then not date 

    Plotly.d3.json('./data/covid_states.json', function(err, rows){

        function unpack(rows, key) {
            return rows.map(function (row) { return row[key]; });
        }
      
          function byState(state){
            return rows.filter(function(row){ return row.state === state; });
        }
          
    //1. get all the states from json
    var statesArray = rows.map(function(row){ return row.state; }); //all states, but with duplicates
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
        var data = byState(state);
          drawPlot(data);
    }
      
    //4. by default, trigger graph for "Alabama"
    getData("Alabama"); //default state
    
    function drawPlot(rows){
        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: 'Cases',
            x: unpack(rows, 'date'),
            y: unpack(rows, 'cases'),
            line: { color: '#17BECF' }
        }
    
        var trace2 = {
            type: "scatter",
            mode: "lines",
            name: 'Deaths',
            x: unpack(rows, 'date'),
            y: unpack(rows, 'deaths'),
            line: { color: '#9932CC' }
        }
       
        var data = [trace1, trace2];
    
        var layout = {
            title: 'U.S COVID Cases & Deaths',
        };
    
        Plotly.newPlot('myDiv', data, layout);
    }
      
    })

    ////// Plot 2 /////////
    
    Plotly.d3.json('./data/covid_states.json', function(err, rows){

        function unpack(rows, key) {
            return rows.map(function (row) { return row[key]; });
        }
      
          function byState(state){
            return rows.filter(function(row){ return row.state === state; });
        }
          
    //1. get all the states from json
    var statesArray = rows.map(function(row){ return row.state; }); //all states, but with duplicates
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
        var data = byState(state);
          drawPlot(data);
    }
      
    //4. by default, trigger graph for "Alabama"
    getData("Alabama"); //default state
    
    function drawPlot(rows){
        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: 'Cases',
            x: unpack(rows, 'date'),
            y: unpack(rows, 'cases'),
            line: { color: '#17BECF' }
        }
    
        var trace2 = {
            type: "scatter",
            mode: "lines",
            name: 'Deaths',
            x: unpack(rows, 'date'),
            y: unpack(rows, 'deaths'),
            line: { color: '#9932CC' }
        }
       
        var data = [trace1, trace2];
    
        var layout = {
            title: 'U.S COVID Cases & Deaths',
        };
    
        Plotly.newPlot('myDiv2', data, layout);
    }
      
    })