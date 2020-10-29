d3.csv("/data/google_us.csv").then(function(data) {

    var x = data.forEach(row => row.states === "Alabama")
    console.log(x); 
    });
