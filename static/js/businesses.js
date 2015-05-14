function startVisuals(){

  $.getJSON('source', {},

   function(data) {

    $("#waiting").slideUp();
    $(".ctitle,.ctable").slideDown();

    var businesses = data.businesses;

    $("#businesses-count").html("(" + businesses.length + " total)");

    /* initialize chart data */

    // chart 1

    var c1_data = [
      ['Stars', 'Review Count']
    ];

    var c1_options = {
      height: 1000,
      hAxis: {title: 'Stars'},
      vAxis: {title: 'Review Count'}
     };

     // chart 2

     var c2_data = [
       ['Stars', 'Review Count', 'Price Range']
     ];

     var c2_options = {
      height: 400,
      series: {
            0: {axis: 'review count'},
            1: {axis: 'price range'}
          },
          axes: {
            y: {
              'review count': {label: 'Review Count'},
              'price range': {label: 'Price Range'}
            }
          }
      };

    /* main JSON iteration loop */

    $.each(data.businesses, function(position, item) {

      // chart 1
      var stars = item.stars;
      var rc = item.review_count;
      c1_data.push([stars, rc]);

      // chart 2
      if(position < 1000){
        var price_range = item.attributes["Price Range"];
        c2_data.push([stars, rc, price_range]);
      }

    });

    /* assembly */

    // chart 1

    var chart1 = new google.charts.Scatter(document.getElementById('chart1'));
    chart1.draw(google.visualization.arrayToDataTable(c1_data), google.charts.Scatter.convertOptions(c1_options));

    // chart 2

    var chart2 = new google.charts.Scatter(document.getElementById('chart2'));
    chart2.draw(google.visualization.arrayToDataTable(c2_data), google.charts.Scatter.convertOptions(c2_options));

  });

}
