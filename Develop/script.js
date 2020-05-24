//Get elements
let currentDay = $('#currentDay');
let textArea = $('textarea');
let userTasks = [];

currentDay.text(moment().format('ll'));


$( "textarea" ).keyup(function() {
  let userText = $(textArea).val();
  userTasks.push(userText);
  console.log(userText);
});



var time = moment().hours();


