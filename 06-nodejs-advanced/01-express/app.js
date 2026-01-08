const express = require('express');

const app = express();

// CPU-bound work
// - Busy loop
// - Runs on the main thread (V8)
// - Blocks the event loop
function doWork(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {}
}

app.get('/', (req, res) => {
  doWork(5000);  // This blocks the event loop for 5 seconds
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
