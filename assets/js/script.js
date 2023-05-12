// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  // Store start and end work hours
  var workHours = {
    startHour: 9,
    endHour: 17
  }

  // Dynamically generates each time block on the page for specified hours
  // Must be loaded before assigning save button, otherwise '.saveBtn' doesn't exist on assigment
  function generateTimeBlocks() {

    // Loop through each hour
    for (hour = workHours.startHour; hour <= workHours.endHour; hour++) {
      // Get events out of local storage for each hour, set a default value of '' if there's nothing in local storage
      var savedEvent = localStorage.getItem(hour) || ''
      // html for each time-block, updates with the correct hour and savedEvent
      var html = `<div class="row time-block" data-hour="${hour}">
      <div class="col-2 col-md-1 hour text-center py-3">${hour}</div>
      <textarea class="col-8 col-md-10 description" rows="3">${savedEvent}</textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>`

    // Append html to the container
    $('.container-lg').append(html)
    }
  }

  // Call generateTimeBlocks function
  generateTimeBlocks()

  // Assign elements with class of saveBtn to the variable saveButton
  var saveButton = $('.saveBtn')

  // Saves event into local storage using data-hour as a key
  function onSaveClick() {
    var hour = $(this).parent().attr('data-hour')
    var userEvent = $(this).siblings('.description').val()

    localStorage.setItem(hour, userEvent)
  }

  // Applies correct class to each time block relative to the current time
  function applyClass() {
    // Use dayjs to get the current hour
    var currentHour = dayjs().hour()
    var timeBlock = $('.time-block')

    timeBlock.each(function() {
      // Take the value of each blocks data-hour and convert into an integer
      var blockHour = parseInt($(this).attr('data-hour'))
      console.log(blockHour)

      // Rules for class application
      if (blockHour < currentHour) {
        $(this).addClass('past')
      } else if (blockHour === currentHour) {
        $(this).addClass('present')
      } else {
        $(this).addClass('future')
      }
    })
  }

  // Call applyClass function
  applyClass()
  // Run applyClass function every 10 seconds to make sure classes are up to date
  setInterval(applyClass, 10000)

  // Event listener for clicks on save button, will execute onSaveClick function
  saveButton.on('click', onSaveClick)
});
