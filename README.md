# Node.js_study-task-tracker
**HW 12. № 3 — Події, хеші та інформація про систему**

*Логування подій у Task Tracker*

### Що практикуємо
events
crypto
os
fs
створення логів

### Завдання
Розшир проєкт так, щоб він логував важливі події.

Наприклад:
задача створена;
задача виконана;
задача видалена;
програма запущена.
Оновлена структура
study-task-tracker/
  app.js
  data/
    tasks.json
    events.log
  modules/
    taskService.js
    taskFormatter.js
    fileStorage.js
    eventLogger.js
    systemInfo.js

### Вимоги
Створи модуль eventLogger.js.

У ньому використай EventEmitter.

Мають бути події:
taskCreated
taskCompleted
taskDeleted
appStarted
Коли подія відбувається, її треба записати у файл events.log.

Приклад запису:
2026-07-03T12:30:00.000Z | taskCreated | Task "Learn fs module" was created

### Crypto
Для кожної задачі додай поле hash.

Хеш має створюватися на основі:

назви задачі;
дати створення;
id.
Наприклад:
crypto
 .createHash('sha256')
  .update(`${id}-${title}-${createdAt}`)
  .digest('hex')
Задача тепер має виглядати так:

{  id: 1,
  title: 'Learn Node.js events',
  completed: false,
  createdAt: '2026-07-03T...',
  hash: 'a8f3...'
}

### OS
Створи модуль systemInfo.js.

Він має виводити:

операційну систему;
кількість вільної пам’яті;
час роботи системи;
кількість CPU.
Цю інформацію треба вивести при старті програми.

### Результат
Після запуску:
node app.js
має бути:

список задач;
інформація про систему;
файл 
events.log;
у кожної задачі має бути hash.