var Glue = require('glue');

var manifest = {
  server: {
    debug: {
      request: ['error']
    }
  },
  connections: [{
    port: process.env.PORT || 3000
  }],
  plugins: {
    './routes/hello': {}
  }
};

var options = {
  relativeTo: __dirname
};

Glue.compose(manifest, options, function (err, server) {
    if (err) {
        throw err;
    }
    server.start(function () {
        console.log('woot');
    });
});
