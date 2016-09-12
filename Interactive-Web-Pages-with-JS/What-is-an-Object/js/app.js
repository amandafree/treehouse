//Problem: User interaction doesn't provide desired results.
//Solution: Add interactivity so the user can manage daily tasks.

var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completeTasksHolder = document.getElementById("completed-tasks");

//New task li
var createNewTaskElement = function(taskString) {
  //Create li
  var listItem = document.createElement("li");
 //Input [checkbox]
    var checkBox = document.createElement("input"); //checkbox
    //Label
    var label = document.createElement("label"); //text
    //Input [text]
    var editInput = document.createElement("input"); //text
    //Button.edit
    var editButton = document.createElement("button")
    //Button.delete
    var deleteButton = document.createElement("button");
    
    //Each element needs modifying
  
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
    
    //Each element needs appending
  
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton); 
  return listItem;
}

var addTask = function() {
  console.log("Add task...");
  //Create a new list item with the text from the new task.
  var listItem = createNewTaskElement(taskInput.value);
  //append li to incompleteTaskHolder                                      
 incompleteTasksHolder.appendChild(listItem);    
 bindTaskEvents(listItem, taskCompleted);
  
 taskInput.value = "";
}

//Edit an existing task.
var editTask = function() {
  console.log("Edit task...");
var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
   
  //If the class of the parent is .editMode
  if(containsClass) {
    //Switch from .editMode
      //Label text become the input's value
    label.innerText = editInput.value;
  } else {
     //Switch to .editMode
     //Input value becomes the label's text
  editInput.value = label.innerText;
  }
//Toggle .editMode on the li
  listItem.classList.toggle("editMode");
}
    


//Delete an existing task.
var deleteTask = function() {
  console.log("Delete task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark a task as complete.
var taskCompleted = function () {
  console.log("Task complete...");
    //Append the task li to the completed-tasks
  var listItem = this.parentNode;
  completeTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete.
var taskIncomplete = function() {
  console.log("Task incomplete...");
    //Append the task li to the incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events"); 
  //Select TaskListItem's children.  
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
    
  //Bind editTask to edit button 
  editButton.onclick = editTask;
    
  //Bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
    
  //Bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function() {
  console.log("AJAX request");
}

//Set the click handler to the addTask function
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


//Cycle over incompleteTaskHolder ul li
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
      //Bind events to li's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted)
}

 

//Cycle over completeTaskHolder ul li
for(var i = 0; i < completeTasksHolder.children.length; i++) {
      //Bind events to li's children (taskInCompleted)
  bindTaskEvents(completeTasksHolder.children[i], taskIncomplete)
}  

