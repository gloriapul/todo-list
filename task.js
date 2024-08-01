var tagColors = {
    Personal: "#FC96A7",
    Work:"#C6D494",
    }
    
class Task{
    constructor(dictionary){  
        if ("id" in dictionary){
            this.id = dictionary["id"]; // an integer, will be in description
            this.id ++;
        }
        else{
            this.id = 0; // default value is 0
        }
    
        this.text = dictionary["text"]; // AKA description 
        this.priority = dictionary["priority"];
        this.duedate = dictionary["duedate"];
        this.tag = dictionary["tag"];
        this.done = false; // will be in description
        this.DOMelement;
    }

    toString(){
        return "this task, " + this.text + ", with the tag " + this.tag + " has a task ID of " + this.id + ". It is of " + this.priority + " priority and must be complete by " + this.duedate;
    }
    
    getFormattedDueDate(){
        let date = new Date(this.getDueDate());
        const days = ['Sun','Mon','Tues','Wed','Thu','Fri','Sat']
        const months =["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]; 
        var the_name_day = days[date.getDay()];
        var the_day = date.getDate();
        var the_month = months[date.getMonth()]; 
        var the_year = date.getFullYear();
        var formatted_date = the_name_day + ' ' + the_month + " " + the_day + " " + the_year;
        return formatted_date;
    }
    
    // create the task DOM element
    addToDom(destination){  
        let $li = $("<li>");
        let $tags = $("<p>");
        $tags.attr('id', `${this.tag}`);
        $($li).attr('class','task');
        $($li).attr('data-taskId',this.id);
        let tagColor = tagColors[this.tag] || "#E9EBFF" //if not available, make it that secondary color
        $($li).css({'background-color': tagColor});
    
        // defined spans for each attribute
        let $IDSpan = $('<span><b>Task #</b>' + this.id + ' </span>');
        $($IDSpan).attr('class','task ID');
    
        let $dueDateSpan = $('<span><b>Due Date:</b> ' + this.getFormattedDueDate() + ' </span>');
        $($dueDateSpan).attr('class','due date');
    
        let $prioritySpan = $('<span> <b>Priority: </b>' + this.priority + ' </span>');
        $($prioritySpan).attr('class','priority');
    
        let $tagSpan = $('<span><b>Type: </b>' + this.tag + ' </span>');
        $($tagSpan).attr('class','tag');
    
        let $textP = $('<p>' + this.text + '</p>');
        $($textP).attr('class','text');
    
        // buttons, mark Done and delete
        let $markDoneButton = $('<button>',{
            type: 'button',
            class: 'markDone',
            text: '✔'
        });
        let $deleteButton = $('<button>',{
            type: 'button',
            class: 'delete',
            text: '✖'
        });
    
        $li.append($IDSpan);
        $li.append($dueDateSpan);
        $li.append($tagSpan);
        $li.append($prioritySpan);
        $li.append($textP);
        $li.append($markDoneButton);
        $li.append($deleteButton);
        $tags.append($tagSpan);
        this.$li = $li;
        this.DOMelement = this.$li;
        // finally, append to destination
        $(destination).append(this.DOMelement);    
        if (this.done == true) {
            $(this.DOMelement).addClass('done');
        }
    }
    
    // sets the ID for this task
    setId(id){
        this.taskID = id;
    }
    
    // sets the description for this task
    setText(text){
        this.text = text;
    }
    
    // sets the tag for this task
    setTag(tag){
        this.tag = tag;
    }
    
    // sets the priority for this task
    setPriority(priority){
        this.priority = priority;
    }
    
    toggleDone(){
        if(this.done == false){
            $(this.DOMelement).addClass('done');
            this.done = true;
        }
        else{
            $(this.DOMelement).removeClass('done');
            this.done = false;
       }
     }
    
    // deletes associated DOM element from page
    delete(){
        $(this.DOMelement).remove();  
    }
    
    // returns the status of the task
    isDone(){
        return this.done;
    }
    
    // returns the DOM element
    getDomElt(){
        return this.DOMelement;
    }
    
    // returns the unique ID for this task
    getId(){
        return this.id
    }
    
    // returns the due date as Date object
    getDueDate(){
        return this.duedate;
    }
    
    // returns the priority of this task
    getPriority(){
        return this.priority;
    }
    
    // returns the tag for this task
    getTag(){
        return this.tag;
    }
    }