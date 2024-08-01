class TaskList{
    constructor(key, DOMelement){
        this.key = key;
        this.DOMelement = DOMelement;
        this.taskObjects = []; // maintain an array of the task objects
        this.id = 0; // internal counter
    }

    // create new Task object given a description, adds it to tasklist and DOM element
    // task must be assigned a unique ID and be returned 
    addNewTask(description){
        var newTask = new Task(description); // create a new task object
        this.taskObjects.push(newTask); // adds it to the tasklist
        newTask.id = this.id;
        newTask.addToDom(this.DOMelement); 
        this.id ++; // increase internal counter by 1
        return newTask; 
    }

    // similar to addNewTask but description is from one saved to localStorage
    // does not need to be assigned a unique ID since already has one & also returns the task
    addSavedTask(description){
        var newSavedTask = new Task(description); // same approach as addNewTask
        //newSavedTask.duedate = description["duedate"];
        newSavedTask.id = description["id"];
        if (description["done"] == true){ 
            $(newSavedTask).addClass('done');
        };
        newSavedTask.done = description["done"];
        this.taskObjects.push(newSavedTask); // skips ID task
        newSavedTask.addToDom(this.DOMelement); // add to the DOM element
        this.id ++; // still has to increase internal counter by 1
        return newSavedTask;

    }

    // returns task with given ID
    getTask(tid){
        return this.taskObjects.find(obj => obj.getId() == tid); // find the task object that has an id equal to the tid, then return it
    }

    // deletes the task object with given id, removed from internal array and invokes delete method
    deleteTask(){
        let index = this.taskObjects.findIndex(function (task){
            return task["id"] == task;
        });
        this.taskObjects[index].delete(); // ui
        this.taskObjects.splice(index, 1);} // array

    // saves current list to localStorage, plus info like task counter
    save(){
        localStorage.removeItem(this.key);
        var dictionary = {};
        dictionary["items"] = this.taskObjects;
        //dictionary["id"] = this.id;
        dictionary["tags"] = tagColors;
        dictionary["done"] = this.done;
        dictionary["duedate"] = this.duedate;
        dictionary["items"].forEach(function (item){
            if (dictionary["done"] == true){
                $(item).addClass('done');
            }});
        localStorage.setItem(this.key, JSON.stringify(dictionary));

    }

    // loads a list of task descriptions from local storage and adds them to the tasklist (using addSavedTask), replacing any prior list
    load(){
        var localStorageCollection = localStorage.getItem(this.key);
        $(this.DOMelement).empty();
        this.taskObjects = [];
        localStorageCollection = JSON.parse(localStorageCollection);
        var items = localStorageCollection["items"];
        items.forEach(function (item) {
            if (item["done"] == true){ 
                $(item).addClass('done');
            };
            item["duedate"] = item.duedate;
        });
        tagColors = {};
        tagColors = localStorageCollection["tags"];
        loadSavedTags(); // can do the loading all at once for both tasks and tags
        var indirectThis = this; 
        items.forEach(function(task){
            indirectThis.addSavedTask(task);
        });
    }

    refresh(){ 
        $(this.DOMelement).empty(); // for ui
        this.save();
        this.load();
    }

    // sort the list by task id and update page
    sortById(){
        this.taskObjects.sort(function(a,b) {
        return a.id - b.id;
        });
        
    }

    // sort the list by task tag and update page
    sortByTag(){
        this.taskObjects.sort(function (a,b) {
            return a.getTag().localeCompare(b.getTag());
    });
    }

    // sort the list by due dates and update page
    sortByDueDate(){
        this.taskObjects.sort(function (a, b) {
            const dateA = new Date(a.duedate);
            const dateB = new Date(b.duedate);
            return dateA - dateB;   
    });
    }   

    // sort the list by priority levels and update page
    sortByPriority(){
        this.taskObjects.sort(function (a, b) {
            if (a.priority == b.priority) {
            return 0
            }
            else if (a.priority == "High" && b.priority == "Medium") {
                return -1
            } 
            else if (a.priority == "Medium" && b.priority == "High") {
                return 1
            } 
            else if (a.priority == "High" && b.priority == "Low") {
                return -1
            } 
            else if (a.priority == "Low" && b.priority == "High") {
                return 1
            } 
            else if (a.priority == "Medium" && b.priority == "Low") {
                return -1
            } 
            else if (a.priority == "Low" && a.priority == "Medium") {
                return 1
            } 
        });
    }

    // print all tasks in order, each in string format
    print(){
        this.taskObjects.forEach(function(eachTask){
            console.log(eachTask.toString())}); // print the toString for each task
    }

}

var theTaskList = new TaskList("Gloria","#theTasks") 