const taskService = require('./modules/taskService');
const formatTask = require('./modules/taskFormatter');

console.log('=== Початок перевірки роботи трекера задач ===\n');

taskService.addTask('Learn Node.js modules');
taskService.addTask('Practice fs module');
taskService.addTask('Build a great app');
console.log('Додано 3 задачі.\n');

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

displayAllTasks();

// задачу виконано
console.log('Позначаємо задачу [1] як виконану...');
taskService.completeTask(1);
displayAllTasks();

// задачу видалено
console.log('Видаляємо задачу [2]...');
taskService.deleteTask(2);

displayAllTasks();

console.log('=== Перевірку завершено! ===');

