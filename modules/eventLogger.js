const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '..', 'data', 'events.log');

class EventLogger extends EventEmitter {
  constructor() {
    super();
    this.on('taskCreated', (taskTitle) => this.writeLog('taskCreated', `Task "${taskTitle}" was created`));
    this.on('taskCompleted', (taskId) => this.writeLog('taskCompleted', `Task with ID ${taskId} was marked as completed`));
    this.on('taskDeleted', (taskId) => this.writeLog('taskDeleted', `Task with ID ${taskId} was deleted`));
    this.on('appStarted', () => this.writeLog('appStarted', 'Application was successfully started'));
  }

  writeLog(eventType, message) {
    const timestamp = new Date().toISOString();
    const logLine = `${timestamp} | ${eventType} | ${message}\n`;

    try {
      const dataDirPath = path.dirname(logFilePath);
      if (!fs.existsSync(dataDirPath)) {
        fs.mkdirSync(dataDirPath);
      }

      fs.appendFileSync(logFilePath, logLine, 'utf-8');
    } catch (error) {
      console.error('Помилка запису логу подій:', error);
    }
  }
}

const trackerLogger = new EventLogger();
module.exports = trackerLogger;