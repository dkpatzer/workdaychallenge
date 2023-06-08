
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function () {
    // Get the id of the time-block containing the clicked button
    var timeBlockId = $(this).parent().attr("id");
    // Get the user input from the textarea in the same time-block
    var userInput = $(this).siblings(".description").val();
    // Save the user input in local storage using the time-block id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply the past, present, or future class to each time block
  $(".time-block").each(function () {
    // Get the id of the time-block
    var timeBlockId = $(this).attr("id");
    // Get the current hour using Day.js
    var currentHour = dayjs().hour();
    // Extract the hour from the time-block id (e.g., "hour-9" -> 9)
    var blockHour = parseInt(timeBlockId.split("-")[1]);

    if (blockHour < currentHour) {
      // If the block hour is in the past
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      // If the block hour is the current hour
      $(this).removeClass("past future").addClass("present");
    } else {
      // If the block hour is in the future
      $(this).removeClass("past present").addClass("future");
      
    }
  });

  // Get user input from local storage and set the values of the corresponding textarea elements
  $(".time-block").each(function () {
    // Get the id of the time-block
    var timeBlockId = $(this).attr("id");
    // Get the user input from local storage using the time-block id as the key
    var userInput = localStorage.getItem(timeBlockId);
    // Set the value of the textarea in the same time-block
    $(this).find(".description").val(userInput);
  });

  // Display the current date in the header of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});

