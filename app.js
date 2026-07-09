const taskService = require('./modules/taskService');
const formatTask = require('./modules/taskFormatter');
const fileStorage = require('./modules/fileStorage');

console.log('=== Запуск трекера задач з файловим сховищем ===\n');

fileStorage.initStorage();
//читаємо задачі з файлу
taskService.loadTasksFromStorage();

// додаємо задачі, addTask одразу записує кожну у файл
taskService.addTask('Learn Node.js modules');
taskService.addTask('Practice fs module');
taskService.addTask('Build a great app');
taskService.addTask('Learn fs and path modules');
taskService.addTask('Master Node.js file system');

function displayAllTasks() {
  const allTasks = taskService.getTasks();
  console.log('--- Поточний список задач: ---');
  if (allTasks.length === 0) {
    console.log('(список порожній)');
  } else {
    allTasks.forEach(task => {
      console.log(formatTask(task));
    });
  }
  console.log('-----------------------------\n');
}

// виведимо список задач у консоль.
displayAllTasks();

console.log('=== Роботу трекера завершено! ===');

