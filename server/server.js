var express = require('express');
var app = express();
// configure our server with all the middleware and and routing
require('./config/config.js')(app, express);

// export our app for testing and flexibility, required by index.js
app.listen(3000);
console.log('listening at', 3000);
