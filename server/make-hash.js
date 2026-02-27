const bcrypt = require('bcryptjs');

async function run() {
  const password = 'pass456'; // change to whatever you want
  const hash = await bcrypt.hash(password, 10);
  console.log('Hash:', hash);
}

run();