var Glue = require('glue');

var manifest = {
  server: {
    debug: {
      request: ['error']
    },
    connections: {
      router: {
        stripTrailingSlash: true
      }
    }
  },
  connections: [{
    port: process.env.PORT || 3000
  }],
  plugins: {
    './routes/hello': {},
    './plugins/static': {}
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
