##HW 10. №1 Модулі та базова логіка Task Tracker

###Розділення коду на власні модулі

###Що практикуємо
require
module.exports
створення власних модулів
базову структуру Node.js-проєкту
роботу з функціями

###Завдання
Створи простий проєкт study-task-tracker.

У проєкті має бути базова логіка для роботи із задачами, поки що без файлів і сервера.

###Структура
study-task-tracker/
  app.js
  modules/
    taskService.js
    taskFormatter.js

###Вимоги
У файлі taskService.js створи функції:
addTask(title)
getTasks()
completeTask(id)
deleteTask(id)

Задача має мати таку структуру:
{
  id: м1,
  title: 'Learn Node.js modules',
  completed: false,
  createdAt: '2026-07-03T...'
}
У файлі taskFormatter.js створи функцію, яка красиво виводить задачу в консоль.

Наприклад:

[1] Learn Node.js modules — in progress
[2] Practice fs module — completed

У app.js імпортуй модулі та протестуй роботу:

додай 3 задачі;
виведи всі задачі;
познач одну задачу як виконану;
видали одну задачу;
знову виведи список.

###Важливо
Використовуй один підхід до модулів:
module.exports = ...
require(...)

Не змішуй export і require в одному завданні.

###Результат
Після запуску:
node app.js
у консолі має бути видно, як задачі створюються, оновлюються і видаляються.