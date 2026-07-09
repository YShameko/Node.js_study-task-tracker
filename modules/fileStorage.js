const fs = require('fs');
const path = require('path');

const dataDirPath = path.join(__dirname, '..', 'data');
const tasksFilePath = path.join(dataDirPath, 'tasks.json');

function initStorage() {
  // Перевіряємо, чи існують папка data та файл tasks.json. Якщо ні — створюємо
  if (!fs.existsSync(dataDirPath)) {
    fs.mkdirSync(dataDirPath);
  }

  if (!fs.existsSync(tasksFilePath)) {
    fs.writeFileSync(tasksFilePath, JSON.stringify([], null, 2), 'utf-8');
  }
}

function readTasks() {
  try {
    const fileData = fs.readFileSync(tasksFilePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Помилка при читанні файлу задач:', error);
    return [];
  }
}

function saveTasks(tasks) {
  try {
    const jsonData = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(tasksFilePath, jsonData, 'utf-8');
  } catch (error) {
    console.error('Помилка при збереженні задач у файл:', error);
  }
}

module.exports = {
  initStorage,
  readTasks,
  saveTasks
};