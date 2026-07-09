// addTask(title)
// getTasks()
// completeTask(id)
// deleteTask(id)
const tasks = [];
let currentId = 1; // ID для задач

function addTask(title) {
  const newTask = {
    id: currentId++, 
    title: title,
    completed: false,
    createdAt: new Date().toISOString() 
  };
  tasks.push(newTask);
  return newTask;
}

function getTasks() {
  return tasks;
}

function completeTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = true;
    return task;
  }
  return null;
}

function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    return tasks.splice(index, 1)[0];
  }
  return null;
}

module.exports = {
  addTask,
  getTasks,
  completeTask,
  deleteTask
};