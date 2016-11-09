



$(document).ready(function() {

    var A = [];

    $.ajax({
        type: "GET",
        url: "posts/_the_list.txt",
        dataType: "text",
        success: function(data) {
            processData(data);
            fillItems();
        }
    });

    // Let's process the data from the data file
    function processData(data) {
        var lines = data.split(/\r\n|\n/);

        var headings = lines[0].split('|');
        for (var i = 0; i < headings.length; i++) {
            headings[i] = trim(headings[i]);
        }

        for (var j = 1; j < lines.length; j++) {
            var obj = {};
            var values = lines[j].split('|');
            for (var k = 0; k < values.length; k++) {
                obj[headings[k]] = trim(values[k]);
            }

           A.push(obj);

        }

        console.log(A);

    }


    function fillItems(){

        var template = $("#itemtemplate");

        for (var i = 0; i < A.length; i++) {
            var obj = A[i];
            var nitem = template.clone();

            nitem.attr("id", "_item_" + obj.key);
            nitem.find("h2.entry-title > a").html(obj.title);
            nitem.find("h2.entry-title > a").attr("href", "/post.html?key=" + obj.key);
            nitem.find("time.published").html(obj.time);
            nitem.find("div.entry-content > p").html(obj.summary);
            nitem.css("display", "block");

            // console.log(nitem);

            template.parent().append(nitem);
        }
    }


});