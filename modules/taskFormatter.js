function formatTask(task) {
  const status = task.completed ? 'completed' : 'in progress';

  return `[${task.id}] ${task.title} — ${status}`;
}

module.exports = formatTask;