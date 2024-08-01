// dynamically create dropdown form under Manage Tags listing current tags

function addTagFromForm() {
    var items = {};
    $("#addTagForm").serializeArray().forEach(function (item) {
        items[item.name] = item.value;
        });
    return items;
}

function makeNewTag(tag) {
    let $li = $("<li>");
    let $delBtn = $("<button>" + '✖' + "</button>");
    let $br = $('<br>');
    $($delBtn).attr({'class': 'delete', 'type': 'button'}); // dynamically add deleting abilities 
    let $tagSpan = $('<span> ' + tag["tagName"] + ' </span>');
    $($tagSpan).attr({'class': 'tagName'});
    $li.append($delBtn);
    $li.append($tagSpan);
    $("#addedTags").append($li); 
    tagColors[tag["tagName"]] = tag["tagColor"];
    let $label = $("<label>");
    let $input = $("<input> " + tag["tagName"] + "</input>");
    $($input).attr({'type': 'radio', 'name': 'tag', 'value': tag["tagName"]});
    $label.append($input);
    $("#tags").append($label);
    $("#tags").append($br);
}

function loadSavedTags() {
    $("#addedTags").empty(); // manage tags form 
    $("#tags").empty(); // add tasks form
    
    Object.keys(tagColors).forEach(function(tagName) {
        let $li = $("<li>");
        let $delBtn = $("<button>" + '✖' + "</button>");
        let $tagSpan = $('<span> ' + tagName + ' </span>');
        let $br = $('<br>');
        $($delBtn).attr({'class': 'delete', 'type': 'button'});
        $($tagSpan).attr({'class': 'tagName'});
        $li.append($delBtn);
        $li.append($tagSpan);
        $li.append($br);
        $($li).css({'margin-bottom': '3px'});
        $("#addedTags").append($li); 
        let $label = $("<label>");
        let $input = $("<input> " + tagName + "</input>");
        $($input).attr({'type': 'radio', 'name': 'tag', 'value': tagName});
        $label.append($input);
        $("#tags").append($label);
        $("#tags").append($br);
  });
}

$(document.body).on('click', '.deleteTagBtn', function() {
    var tag = $(this).siblings().text().trim();
    var dictionaryTag = tag;
    delete tagColors[dictionaryTag]; // deletes color as well
    $(this).parent().remove(); 
    $("input[value="+tag+"]").parent().remove();
});

$("#addTagBtn").on('click',function() {
    let tags = addTagFromForm();
    makeNewTag(tags);
    closeAllDropDowns(); // dropdowns.js
});

$("#cancelTagBtn").on('click',function() {
    $('#addTagInput').val('');
    $('#addTagColor').val('#E9EBFF');
    closeAllDropDowns(); // dropdowns.js
});
