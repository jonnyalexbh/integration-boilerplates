const https = require('https');

// Network I/O:
// - handled by the OS (kernel)
// - non-blocking sockets
// - does NOT use libuv thread pool
// - I/O-bound (waiting, not computing)
// - UV_THREADPOOL_SIZE has no effect

const start = Date.now();

function doRequest() {
  https.request('https://www.google.com', (res) => {
    res.on('data', () => {});
    res.on('end', () => {
      console.log(Date.now() - start);
    });
  }).end();

}

// Multiple requests
// All handled in parallel by the OS
// No threads are created

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();

// CPU work → threads
// Network work → OS
