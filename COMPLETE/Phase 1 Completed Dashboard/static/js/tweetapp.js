
// console.log(rows)
var populateTable = function (csv, columns, filterDt=null) {
  //alert(data);
  var data=[]
  //alert(filterDt);
  for (var i in csv)
  {
    //id,date,text,favorites,retweets
    var cnt=0;
    if (filterDt=== null || filterDt==csv[i].date)
    {
        ++cnt;
        var row = {
          id:csv[i].id,
          date:csv[i].date,
          text:csv[i].text
        }
        data.push(row);
    }
  }
  //alert(cnt);
  //console.log(data[0].date);
  d3.selectAll("tbody > *").remove();
  d3.selectAll("thead > *").remove();
  var table = d3.select('body').append('table')
  var thead = table.append('thead')
  var tbody = table.append('tbody')
  
  thead.append('tr')
    .selectAll('th')
    .data(columns)
    .enter()
    .append('th')
    .text(function (d) { return d })

  var rows = tbody.selectAll('tr')
    .data(data)
    .enter()
    .append('tr')

  var cells = rows.selectAll('td')
    .data(function (row) {
      return columns.map(function (column) {
      return { column: column, value: row[column] }
      })
    })
    .enter()
    .append('td')
    .text(function (d) { return d.value })

  return table;
}
function filterDate()
{
  const dt = document.getElementById("filterDt").value;
  
 // alert(document.getElementById("tbodyId").innerHTML);
  document.getElementById("tbodyId").innerHTML="";
  //return;
  d3.csv('data/tweet_datesIndex.csv', function (data) {
    var columns = ['date', 'text']
    populateTable(data, columns, dt)
  })
}

d3.csv('data/tweet_datesIndex.csv', function (data) {
  var columns = ['date', 'text']
  populateTable(data, columns, null)
})

