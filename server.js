const http = require('http');
const taskService = require('./modules/taskService');
const fileStorage = require('./modules/fileStorage');
const trackerLogger = require('./modules/eventLogger');

const PORT = 3000;

fileStorage.initStorage();
taskService.loadTasksFromStorage();
trackerLogger.emit('appStarted');

const server = http.createServer((req, res) => {
  // Розбираємо URL та query-параметри
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // 1. GET /
  if (pathname === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end('<h1>Study Task Tracker API</h1>');
  }

  // 2, 3. GET /tasks, /tasks?status=completed, /tasks?status=active
  if (pathname === '/tasks' && method === 'GET') {
    const status = parsedUrl.searchParams.get('status');
    let tasks = taskService.getTasks();

    if (status === 'completed') {
      tasks = tasks.filter(t => t.completed === true);
    } else if (status === 'active') {
      tasks = tasks.filter(t => t.completed === false);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(tasks));
  }

  // 4. GET /tasks/id
  // Якщо шлях починається з /tasks/ і далі йде будь-який ID (цифри, букви, дефіси)
  if (pathname.match(/^\/tasks\/[^/]+$/) && method === 'GET') {
    const rawId = pathname.split('/')[2];
    
    const tasks = taskService.getTasks();
    
    const task = tasks.find(t => t.id == rawId); // Використання == замість === дозволить знайти задачу, навіть якщо в базі id це число (1), а з URL прийшов рядок ("1")

    if (task) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(task));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Task not found' }));
    }
  }

  // 5. POST /tasks
  if (pathname === '/tasks' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Коли всі дані отримано
    req.on('end', () => {
      try {
        const data = JSON.parse(body);

        if (!data.title || data.title.trim() === '') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Title is required' }));
        }

        const newTask = taskService.addTask(data.title);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(newTask));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
    });
    return; 
  }

  // Ендпоінт документації: GET /docs
  if (pathname === '/docs' && method === 'GET') {
    const apiDocumentation = {
      name: "Study Task Tracker API",
      version: "1.0.0",
      description: "Просте API для керування навчальними задачами",
      endpoints: [
        {
          path: "/",
          method: "GET",
          description: "Вітальна сторінка API"
        },
        {
          path: "/docs",
          method: "GET",
          description: "Документація API (цей маршрут)"
        },
        {
          path: "/tasks",
          method: "GET",
          queryParameters: {
            status: "active | completed (опціонально, для фільтрації)"
          },
          description: "Отримати список усіх задач (або відфільтрованих)"
        },
        {
          path: "/tasks/:id",
          method: "GET",
          description: "Отримати одну задачу за її унікальним ID"
        },
        {
          path: "/tasks",
          method: "POST",
          body: {
            title: "String (обов'язкове поле)"
          },
          description: "Створити нову задачу"
        }
      ]
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(apiDocumentation, null, 2)); 
  }

  // Якщо маршрут не знайдено (404)
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route not found' }));
});

// Запуск сервера
server.listen(PORT, () => {
  console.log(`Сервер запущено! Працює на http://localhost:${PORT}/`);
});