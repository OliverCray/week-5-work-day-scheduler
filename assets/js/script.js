// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
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

  // Assign space in header where date and time will be displayed to the variable currentDay
  var currentDay = $('#currentDay')

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

  // Use dayjs to get current date and time and append to space in header
  function displayDate() {
    var currentDate = dayjs().format('DD MMM, YYYY [at] hh:mm:ss a');
    currentDay.text(currentDate)
  }

  // Call applyClass function
  applyClass()
  // Run applyClass function every 10 seconds to make sure classes are up to date
  setInterval(applyClass, 10000)

  // Call displayDate function
  displayDate();
  // Run displayDate function every second to constantly update the date and time at the top of the page
  setInterval(displayDate, 1000);

  // Event listener for clicks on save button, will execute onSaveClick function
  saveButton.on('click', onSaveClick)
});
