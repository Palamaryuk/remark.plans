$('body').on('click', '.add-to-plan', function (ev) {
  
  let taskElement = $(this).closest('.tasks-kanban-item').find('.tasks-kanban-item-title');
  let taskTitle = taskElement.html().replace(/<\/?[^>]+(>|$)/g, "");
  let taskLink = taskElement.attr("href");
  let taskID = $(this).closest('.main-kanban-item').attr("data-id");

  chrome.storage.sync.get('tasks', function (result) {
    let tasks;
    if(typeof result['tasks'] === "undefined"){
      tasks = [];
    }else{
      tasks = result['tasks'];
    }
    
    tasks.push({
      num: taskID,
      title: taskTitle,
      link: "https://marketing.bitrix24.ru"+taskLink
    })

    chrome.storage.sync.set({
      tasks: tasks
    });
  })
});

$('body').on('mouseenter', '.tasks-kanban-item', function (ev) {
  $(this).append(`
    <div class="add-to-plan">
    в планы
    </div>
  `)
});
$('body').on('mouseleave', '.tasks-kanban-item', function (ev) {
  $(this).find('.add-to-plan').remove()
});