$("document").ready(function () {
    //

    var topics = ["robots", "electronics", "art", "movies", "novels", "fish","woodworking"]
    console.log("ready")
    var query = "";
    function populateButtons() {
        console.log("populate buttons")
        $("#topic-buttons").html("");
        for (i in topics) {
            $("#topic-buttons").append("<button value='" + i + "' type='button' class='btn btn-success topics'>" + topics[i] + "</button>");
        };
    };
    // funciton before this point
    // first thing to happen in the program
    populateButtons();
    // when we click
    $("#submit").on("click", function () {
        // camputeres the stuffs 
        var query = $("#search-input");
        if (query.val() !== "") {
            if (topics.indexOf(query.val()) === -1) {
                topics.push(query.val());
                populateButtons();
                console.log(topics);
            }
            query.val("");
        }
        //---------------------------------------------------------------------------
    });
    // when you press one of the topics buttons
    $(document).on({
        "click": function () {
            event.preventDefault();
            //this clear the viewer
            $("#gif-images").html("");

            console.log("you pressed    " + $(this).text());
            var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + $(this).text() + "&api_key=9bupvNJ1prCoKCFOTWY89t66bySXJDH9&limit=10";

            // this be the request for data from giphy
            $.ajax({
                url: queryUrl,
                method: "GET"
            })
                .done(function (response) {
                    console.log("success got data", response);
                    for (i in response.data) {
                        img = response.data[i].images.fixed_height_still.url
                        imgAnimate = response.data[i].images.fixed_height.url
                        $("#gif-images").append("<div class='image-div'><p class='name'>" + response.data[i].title + "</p><img src='" + img + "' id='generated-gif' data-state='still' data-still='" + img + "' data-animate='" + imgAnimate + "' ><p class='rating' >" + response.data[i].rating + "</p></div>")
                        console.log(response.data[i].images)
                    }
                });
            //

        }
    }, ".topics")

    $(document).on({
        "click": function () {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        }
    }, "#generated-gif")

});





