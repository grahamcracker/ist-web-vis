function startVisuals(){

  $.getJSON('source', {},

   function(data) {

    $("#waiting").slideUp();
    $(".ctitle,.ctable").slideDown();

    var tips = data.tips;

    $("#tips-count").html("(" + tips.length + " total)");

    /* initialize chart data */

    // chart 1

    var c1_data = [
      ['Phrases']
    ];

    var c1_options = {
      maxFontSize: 14,
      wordtree: {
            format: 'implicit',
            word: 'watch'
          }
     };

    /* main JSON iteration loop */

    $.each(data.tips, function(position, item) {

      // chart 1
      c1_data.push([item.text]);

    });

    /* assembly */

    // chart 1

    var chart1 = new google.visualization.WordTree(document.getElementById('chart1'));
    chart1.draw(google.visualization.arrayToDataTable(c1_data), c1_options);

  });

}
