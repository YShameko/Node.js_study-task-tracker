# Node.js_study-task-tracker
**HW 13. №4 — HTTP API для Task Tracker**

*Простий сервер на Node.js*

### Що практикуємо
http
URL
маршрутизацію через req.url
query parameters
роботу з JSON-відповідями
повторне використання модулів з попередніх ДЗ

### Завдання
Створи HTTP-сервер для свого Study Task Tracker.

Без Express. Тільки вбудований модуль http.

#### Оновлена структура

```text
study-task-tracker/
  ├── server.js
  ├── data/
  │    ├── tasks.json
  │    └── events.log
  └── modules/
       ├── taskService.js
       ├── taskFormatter.js
       ├── fileStorage.js
       ├── eventLogger.js
       └── systemInfo.js
``` 

### Вимоги до API
#### 1. Головна сторінка
GET /  
Відповідь:  
<h1>Study Task Tracker API</h1>

#### 2. Отримати всі задачі
GET /tasks  
Відповідь має бути у форматі JSON:  
[
  {
"id": 1,
    "title": "Learn fs module",
    "completed": false
  }
]

#### 3. Фільтрація задач
GET /tasks?status=completed  
Повертає тільки виконані задачі.

GET /tasks?status=active  
Повертає тільки невиконані задачі.

Для читання query параметрів використовуй:  
const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

#### 4. Отримати одну задачу по id
GET /tasks/1
Якщо задача існує — повернути її.

Якщо задачі немає — повернути:
{
"error": "Task not found"
}
і статус 404.

#### 5. Створити задачу
POST /tasks
Тіло запиту:
{
"title": "Practice HTTP module"
}

Після створення задача має:  
- зберегтися у tasks.json;  
- отримати id;  
- отримати hash;  
- створити подію taskCreated;  
-повернутися у відповіді.  

### Вимоги до відповіді сервера
Для JSON-відповідей додавай header:
res.writeHead(200, { 'Content-Type': 'application/json' });

Для HTML:
res.writeHead(200, { 'Content-Type': 'text/html' });

### Результат
Після запуску:  
node server.js  
сервер має працювати на порту 3000.  

Перевірити можна в браузері або через Postman/Insomnia:<br>
http://localhost:3000/<br>
http://localhost:3000/tasks<br>
http://localhost:3000/tasks?status=completed<br>
http://localhost:3000/tasks/1<br>