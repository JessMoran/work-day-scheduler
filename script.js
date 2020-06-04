//Get elements
let currentDay = $('#currentDay');

//Display current day
currentDay.text(moment().format('ll'));

//Global variable
let userEvents;

//Get current hour
let time = (moment().hours());

//Get elements who has time-block class
$('.time-block').each(function() {
  let timeChildren = $(this).children(); //Get time-block children
  let hourSpan = $(timeChildren).children(); //Get time-block grandchildren
  let hourVal = hourSpan.text(); //Get grandchildren text

  //Validates if the hourVal is short or long and applies different slice for each one
  if ( hourVal === '9:00'){
    schedulerHr = hourVal.slice(0, 1); //Take just the number
  } else {
    schedulerHr = hourVal.slice(0, 2); //Take just the number
  }

  //Add a class for each nephew if the schedulerHr has an hour less than the current
  if ( schedulerHr < time ){
    $(this).each(function (i, element) {  //Get element who has this condition
      let siblings = $(element).siblings(); //Bring its sibling
      let nephew = $(siblings).children(); //Bring its sibling's children
      nephew.addClass('past'); //Add class
    })
  }  //Add a class for each nephew if the schedulerHr has an hour more than the current
  else if ( schedulerHr > time ) {
    $(this).each(function (i, element) { //Get element how has this condition
      let siblings = $(element).siblings(); //Bring its sibling
      let nephew = $(siblings).children(); //Bring its sibling's children
      nephew.addClass('future'); //Add class
    })
  }  //Add a class for each nephew if the schedulerHr has the same hour than the current
  else {
    $(this).each(function (i, element) { //Get element how has this condition
      let siblings = $(element).siblings(); //Bring its sibling
      let nephew = $(siblings).children(); //Bring its sibling's children
      nephew.addClass('present'); //Add class
    })
  }
});

///When the user clicks saveBtn the function runs
$(document).on("click", ".saveBtn", function() {
  let parent = this.parentElement;  //Get the saveBtn's parent
  let sibling = $(parent).siblings();  // Get the saveBtn's uncles
  let cousin1 = $(sibling[0]).children();  //Hour div
  let cousin2 = $(sibling[1]).children();  //Textarea
  let scheduleHr = (cousin1.text()).trim();  //Div text
  let userTxt;

  for (const childElem of cousin2) { //Iterates cousin2
    if (childElem.localName === 'textarea') { //Validate its son is a textarea
      userTxt = ($(childElem).val()).trim();  //Get text from the text area
      if ( userTxt === ''){ //Checks if the textarea is empty
        return;//Take of the function
      }
    }
  }

  //Save data in localStorage
  //If localstorage is empty creates new array and save the first event
  if ( localStorage.getItem('userEvents') === null){
    userEvents = {};
    userEvents[scheduleHr] = userTxt;
    localStorage.setItem('userEvents', JSON.stringify(userEvents));
  } else { //If the array exist just push the new event
    userEvents = JSON.parse(localStorage.getItem('userEvents'));
    userEvents[scheduleHr] = userTxt;
    localStorage.setItem('userEvents', JSON.stringify(userEvents));
  }
});

//Implements setEvents function when the window loads
$( window ).on( "load", setEvents );

function setEvents() {
  //Get userEvents object and parse in an object
  userEvents = JSON.parse(localStorage.getItem('userEvents'));

  //Iterate the elements who has time-block class
  $('.time-block').each(function (i, element) {
    let hourKey = ($(element).text()).trim(); //Get the text and remove whitespace
    //Get the value for each element in the object
    let getValue = userEvents[hourKey];

    let siblings = $(element).siblings(); //Bring time-block sibling
    let nephew = $(siblings).children(); //Bring time-block sibling's children
    nephew.val(getValue);//Set the value in to the textarea
  })
}
