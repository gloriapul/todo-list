// gather inputs from the form into a single description dictionary
// add to theTaskList 
function addTaskFromForm(){
    // coffeeRun used serializeArray.forEach, instead, 4 statements to pull out data from the form, IDs from #addTask values
    // insert under dictionary under appropriate keys
    var text = $('#taskText').val(); // whatever is written
    var priority = $('[name="taskPriority"]').val(); // the selected one in dropdown
    var dueDate = $('#taskDueDate').val(); // whatever is chosen for the date
    var tag = $('input[type="radio"]:checked').val(); // tag added

    var dictionary = {}; // empty dictionary to add to, the single description dictionary
    // key and values based on variables from above
    dictionary['text'] = text; 
    dictionary['priority'] = priority;
    dictionary['duedate'] = dueDate;
    dictionary['tag'] = tag;
    theTaskList.addNewTask(dictionary); // add to theTaskList using the addNewTask method
}

// event handler for the "add" button
$("#addTaskButton").click(function(){
    addTaskFromForm();
    closeAllDropDowns(); // dropdowns.js
});

$("#cancelAddTask").click(function(){
    $('input[type="radio"]').prop('checked', false);
    $('#taskText').val('');
    $('#taskDueDate').val('');
    $('[name="taskPriority"]').val('Medium');
    closeAllDropDowns(); // dropdowns.js
});

// phase 5a

// delegated event handler for done button, similar to Quizzes assignment
$(document).on('click', ".markDone", function(event) { 
    var taskID = $(event.target).closest('[data-taskId]').attr("data-taskId");
    var parseTaskID = parseInt(taskID); // parse string and returns an integer
    theTaskList.getTask(parseTaskID).toggleDone(); //  call toggleDone 
});

// phase 5b

// delegated event handler for delete button, similar to previous delegated event handler
$(document).on('click', ".delete", function(event) { 
    var taskID = $(event.target).closest('[data-taskId]').attr("data-taskId");
    var parseTaskID = parseInt(taskID); 
    theTaskList.deleteTask(parseTaskID);

});

//event handler for sorting tasks by id
$("#sortIdButton").on('click', function() {
    theTaskList.sortById();
    theTaskList.refresh(); // add the new list to page
})

//event handler for sorting tasks by tag
$("#sortTagButton").on('click', function() {
    theTaskList.sortByTag();
    theTaskList.refresh();
    
})

//event handler for sorting tasks by due date
$("#sortDueDateButton").on('click', function() {
    theTaskList.sortByDueDate();
    theTaskList.refresh();
})

//event handler for sorting tasks by priority
$("#sortPriorityButton").on('click', function() {
    theTaskList.sortByPriority();
    theTaskList.refresh();
})

$( "#loadLocalButton").click(function() {
    theTaskList.load();
});

$( "#saveLocalButton").click(function() {
    theTaskList.save();
});

$( "#resetLocalButton" ).click( function() {
    localStorage.clear(); // implement a reset button to clear the local storage
    $('#theTasks').empty();
});