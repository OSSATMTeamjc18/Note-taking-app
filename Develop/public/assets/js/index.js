var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");


var activeNote = {};


var getNotes = function () {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};


var saveNote = function (note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};


var deleteNote = function (id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

var renderActiveNote = function () {
    $saveNoteBtn.hide();
  
    if (activeNote.id) {
      $noteTitle.attr("readonly", true);
      $noteText.attr("readonly", true);
      $noteTitle.val(activeNote.title);
      $noteText.val(activeNote.text);
    } else {
      $noteTitle.attr("readonly", false);
      $noteText.attr("readonly", false);
      $noteTitle.val("");
      $noteText.val("");
    }
  };
  

  var handleNoteSave = function () {
    var newNote = {
      title: $noteTitle.val(),
      text: $noteText.val()
    };
  
    saveNote(newNote).then(function (data) {
      getAndRenderNotes();
      renderActiveNote();
    });
  };