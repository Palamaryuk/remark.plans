
chrome.storage.sync.get('tasks', function(result) {
    $('.my-tasks').html(result.tasks);
});
$('.clear-tasks').on('click', function () {
    chrome.storage.sync.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
    chrome.storage.sync.get('tasks', function(result) {
        if(typeof result.tasks !== "undefined"){
            $('.my-tasks').html(result.tasks);
        }else{
            $('.my-tasks').html("");
        }
    });
});