/*
  get the 2d context of an element
*/
function ctx(chartID){
  return $("#" + chartID).get(0).getContext("2d");
}

function startVisuals(){

  $.getJSON('source', {},

   function(data) {

    $("#waiting").slideUp();
    $(".ctitle,.ctable").slideDown();

    var doctors = data.doctors;

    $("#doctor-count").html("(" + doctors.length + " total)");

    var c1_data = [
      {
        value: 0,
        color: "blue",
        label: "Male"
      },
      {
        value: 0,
        color: "red",
        label: "Female"
      }
    ];

    var c2_data = [];

    var c3_data = [
      ['Year', '# Members']
    ];
    var c3_options = {
      height: 350,
        chart: {
          title: '',
          subtitle: 'darker dots indicate higher density'
        },
        hAxis: {title: 'Graduation year', format: '0'},
        vAxis: {title: '# of Practice Members', format: 'decimal'}
      };

    $.each(data.doctors, function(position, item) {

      /* chart 1 */
      if(item.Gender == "M"){
        c1_data[0].value++;
      }else{
        c1_data[1].value++;
      }

      /* chart 2 */
      var ms = item["Medical school name"];
      var index = c2_data.map(function(e) { return e.name; }).indexOf(ms);

      if(index != -1){
        c2_data[index].number++;
      }else if(ms != "OTHER"){
        c2_data.push({name: ms, number: 1});
      }

      /* chart 3 */
      var grad_year = item["Graduation year"];
      var num_members = item["Number of Group Practice members"];
      c3_data.push([grad_year, num_members]);

    });

    /* chart 1 assembly */

    var chartOne = new Chart(ctx("chartOne")).Pie(c1_data);

    /* chart 2 assembly */

    c2_data = c2_data.sort(function (a, b) {
      return b.number - a.number;
    });

    $.each(c2_data, function(position, item){
      $("#chartTwoBody").append("<tr><td>" + item.name + "</td><td>" + item.number + "</td></tr>");
    });

    /* chart 3 assembly */
    var c3_gdata = google.visualization.arrayToDataTable(c3_data);
    var chartThree = new google.charts.Scatter(document.getElementById('chartThree'));
    chartThree.draw(c3_gdata, google.charts.Scatter.convertOptions(c3_options));

  });

}
