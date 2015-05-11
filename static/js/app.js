/*
  get the 2d context of an element
*/
function ctx(chartID){
  return $("#" + chartID).get(0).getContext("2d");
}

function startVisuals(){

  $(".chart").each(function(){

    var width = .5 * $(this).parent().width();

    $(this).attr("width", width);
    $(this).attr("height", width);

  });


  if($("#doctors").length){

    $.getJSON('source', {},

     function(data) {

      $("#waiting").hide();

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

      });

      c2_data = c2_data.sort(function (a, b) {
        return b.number - a.number;
      });

      $.each(c2_data, function(position, item){
        $("#chartTwoBody").append("<tr><td>" + item.name + "</td><td>" + item.number + "</td></tr>");
      });

      var chartOne = new Chart(ctx("chartOne")).Pie(c1_data);

    });


  }

}
