/*
  get the 2d context of an element
*/
function ctx(chartID){
  return $("#" + chartID).get(0).getContext("2d");
}

$(function(){

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

      $.each(data.doctors, function(position, item) {

        /* chart 1 */
        if(item.Gender == "M"){
          c1_data[0].value++;
        }else{
          c1_data[1].value++;
        }

      });

      var chartOne = new Chart(ctx("chartOne")).Pie(c1_data, {legendTemplate: "Chart One"});

    });


  }

});
