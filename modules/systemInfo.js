const os = require('os');

function printSystemInfo() {
  // Переводимо байти в гігабайти (ділимо на 1024 тричі)
  const freeMemoryGb = (os.freemem() / (1024 ** 3)).toFixed(2);
  const uptimeHours = (os.uptime() / 3600).toFixed(2);
  const cpuCount = os.cpus().length;

  console.log('=== СИСТЕМНА ІНФОРМАЦІЯ ===');
  console.log(`Операційна система: ${os.type()} (${os.platform()} ${os.arch()})`);
  console.log(`Вільна пам'ять:     ${freeMemoryGb} GB`);
  console.log(`Час роботи системи: ${uptimeHours} год`);
  console.log(`Кількість ядер CPU: ${cpuCount}`);
  console.log('===========================\n');
}

module.exports = { printSystemInfo };