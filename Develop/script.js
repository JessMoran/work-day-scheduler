//Get elements
let currentDay = $('#currentDay');

//Display current day
currentDay.text(moment().format('ll'));

//Global variables
let schedulerHr;
let userEvents;
let cousin2;
let scheduleHr;

//Get current hour
let time = (moment().hours());

//Get elements who has time-block class
$('.time-block').each(function() {
  //Get child's text
  schedulerHr =  $(this).text();

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

//Event
$(document).on("click", ".saveBtn", function() {
  let parent = this.parentElement;
  let sibling = $(parent).siblings();
  let cousin1 = $(sibling[0]).children();  //Hour div
  cousin2 = $(sibling[1]).children();  //Textarea
  scheduleHr = (cousin1.text()).trim();  //Div text
  let userTxt = (cousin2.val()).trim();  //Textarea text

  //Save data
  if ( localStorage.getItem('userEvents') === null){
    userEvents = {};
    userEvents[scheduleHr] = userTxt;
    localStorage.setItem('userEvents', JSON.stringify(userEvents));
  } else {
    userEvents = JSON.parse(localStorage.getItem('userEvents'));
    userEvents[scheduleHr] = userTxt;
    localStorage.setItem('userEvents', JSON.stringify(userEvents));
  }
});

$( window ).on( "load", setEvents );

function setEvents() {
  userEvents = JSON.parse(localStorage.getItem('userEvents'));
  let keys = Object.keys(userEvents);

  let hourArr = ($('.hour').text()).trim();
  let descArr = $('.description');

  $(descArr).each(function (i, element) {
    console.log(i,element);
  })
}


