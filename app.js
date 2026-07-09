const fileStorage = require('./modules/fileStorage');
const taskService = require('./modules/taskService');
const formatTask = require('./modules/taskFormatter');
const { printSystemInfo } = require('./modules/systemInfo');
const trackerLogger = require('./modules/eventLogger');

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

printSystemInfo();

trackerLogger.emit('appStarted');
console.log('=== Запуск трекера задач ===\n');

fileStorage.initStorage();
//читаємо задачі з файлу
taskService.loadTasksFromStorage();

// додаємо задачі, addTask одразу записує кожну у файл
console.log('Додаємо задачі...');
taskService.addTask('Learn Node.js modules');
taskService.addTask('Practice fs module');
taskService.addTask('Build a great app');
taskService.addTask('Learn fs and path modules');
taskService.addTask('Master Node.js file system');
const task1 = taskService.addTask('Learn Node.js events');
const task2 = taskService.addTask('Study crypto and os core modules');

// виводимо список задач у консоль.
displayAllTasks();

taskService.completeTask(task1.id);
console.log('Задачу з ID:', task1.id, ', ', task1.title, ' - виконано.');

taskService.deleteTask(task2.id);
console.log('\nЗадачу з ID:', task2.id, ', ', task2.title, ' - видалено.\n');

console.log('Після оновлення:');
displayAllTasks();

console.log('=== Роботу трекера завершено! ===\n');

