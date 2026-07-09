const fileStorage = require('./fileStorage');
const crypto = require('crypto');
const trackerLogger = require('./eventLogger');

let tasks = [];
let currentId = 1; // ID для задач

function addTask(title) {
  tasks = fileStorage.readTasks();
  
  // Рахуємо ID на основі даних з файлу
  if (tasks.length > 0) {
    currentId = Math.max(...tasks.map(t => t.id)) + 1;
  }

  const id = currentId++;
  const createdAt = new Date().toISOString();

  // ГЕНЕРАЦІЯ ХЕШУ
  const hash = crypto
    .createHash('sha256')
    .update(`${id}-${title}-${createdAt}`)
    .digest('hex');

  const newTask = {
    id,
    title,
    completed: false,
    createdAt,
    hash 
  };
  
  tasks.push(newTask);
  fileStorage.saveTasks(tasks); 
  trackerLogger.emit('taskCreated', title);
  
  return newTask;
}

function getTasks() {
  tasks = fileStorage.readTasks();
  return tasks;
}

function completeTask(id) {
  tasks = fileStorage.readTasks();
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = true;
    fileStorage.saveTasks(tasks); 
    trackerLogger.emit('taskCompleted', id);
    return task;
  }
  return null;
}

function deleteTask(id) {
  tasks = fileStorage.readTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    const deletedTask = tasks.splice(index, 1)[0];
    fileStorage.saveTasks(tasks); 
    trackerLogger.emit('taskDeleted', id);
    return deletedTask;
  }
  return null;
}

function loadTasksFromStorage() {
  tasks = fileStorage.readTasks();
  // Якщо задачі є, знаходимо найбільший ID і робимо currentId більшим за нього
  if (tasks.length > 0) {
    const maxId = Math.max(...tasks.map(t => t.id));
    currentId = maxId + 1;
  } else {
    currentId = 1;
  }
}

module.exports = {
  loadTasksFromStorage,
  addTask,
  getTasks,
  completeTask,
  deleteTask
};