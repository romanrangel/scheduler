$(function () {
    //Adds current day to currentDay Head
    var currentdayEl = $("#currentDay");
    currentdayEl.text(moment().format("MMM Do YY"));
    //Retrieves current hour in 24 hour format and store as int. e.g. 3pm = 15
    var currentHourTime = parseInt(moment().format('k'));
    //Change color depending on time
    for (var hourCount = 9; hourCount < 18; hourCount++) {
        if (hourCount < currentHourTime) {
            $("#hour-" + hourCount).attr("class", "row time-block past");
        }
        else if (hourCount === currentHourTime) {
            $("#hour-" + hourCount).attr("class", "row time-block present");
        }
        else {
            $("#hour-" + hourCount).attr("class", "row time-block future");
        }
    };
    //Saving description with hour as key and description as value. Then save to local storage
    var descriptionArray = {};
    $(".saveBtn").on("click", function () {
        //$(this).val() returns 9 if save button for 9AM is pressed
        //this.previousElementSibling refers to textarea
        descriptionArray[$(this).val()] = $(this.previousElementSibling).val();
        localStorage.setItem("description", JSON.stringify(descriptionArray));
    });
    //Displays the saved descriptions from local storage on the correct "$hour-?? textarea"
    function displaySavedDescriptions() {
        for (var hourCount = 9; hourCount < 18; hourCount++) {
            if (descriptionArray[hourCount] !== undefined) {
                var descriptiongrabEl = $("#hour-" + hourCount + " textarea");
                descriptiongrabEl.val(descriptionArray[hourCount]);
            }
        }
    }
    function init() {
        var storedDescriptions = JSON.parse(localStorage.getItem("description"));
        if (storedDescriptions !== null) {
            descriptionArray = storedDescriptions;
        }
        displaySavedDescriptions();
    };
    init();
})