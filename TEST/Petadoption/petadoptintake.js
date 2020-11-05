var intake2019 = [33266,
  33266,
  35022,
  34788,
  36410,
  35756,
  37497,
  39217,
  41986,
  42278,
  43372,
  39731,
  44710,
  43839,
  43650,
  38428,
  41227,
  43725,
  42197,
  45361,
  46125,
  47387,
  46810
  ];



var adoptions2019 = [18295,
  18295,
  18022,
  17656,
  17299,
  17330,
  16087,
  17454,
  17947,
  18152,
  20009,
  17750,
  20687,
  21562,
  21874,
  23254,
  23265,
  24706,
  24233,
  23497,
  24708,
  25654,
  26176
  ];

var intake2020 = [30305,
  22724,
  16253,
  15021,
  14499,
  15857,
  18192,
  20033,
  22907,
  24951,
  27634,
  27352,
  29672,
  31373,
  31487,
  31058,
  24475,
  32474,
  33012,
  33291,
  31037,
  36404,
  36632
  ];

var adoptions2020 = [17931,
  18326,
  13763,
  10829,
  10868,
  10176,
  11488,
  11760,
  11938,
  12959,
  13842,
  12479,
  14986,
  16001,
  17018,
  18509,
  15660,
  19457,
  19761,
  20158,
  17520,
  21009,
  21062
  ];

var weeks = ["13-Mar", "20-Mar", "27-Mar", "3-Apr", "10-Apr", "17-Apr",
"24-Apr",
"1-May",
"8-May",
"15-May",
"22-May",
"29-May",
"5-Jun",
"12-Jun",
"19-Jun",
"3-Jul",
"17-Jul",
"24-Jul",
"8-Aug",
"22-Aug",
"5-Sep",
"11-Sep",
"9-Oct",
];



// Create the Trace
var trace1 = {
  x: weeks,
  y: intake2019,
  name: 'Intake2019',
  type: "bar"
};

var trace2 = {
  x: weeks,
  y: adoptions2019,
  name: 'Adoptions2019',
  type: "bar"
};

var trace3 = {
  x: weeks,
  y: intake2020,
  name: 'Intake2020',
  type: "bar"
};

var trace4 = {
  x: weeks,
  y: adoptions2020,
  name: 'Adoptions2020',
  type: "bar"
};

// Create the data array for the plot
var data = [trace1, trace2, trace3, trace4];

// Define the plot layout
var layout = {
  title: "Covid Trends in Pet Adoption",
  xaxis: { title: "Weeks" },
  yaxis: { title: "Number of Pets" }
};

// Plot the chart to a div tag with id "bar-plot"
Plotly.newPlot("petadoptintake-plot", data, layout);





