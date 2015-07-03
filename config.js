var secrets = {};
try {
  secrets = require('./secrets');
} catch(e) {}

var env = function(name, def) {
  return process.env[name] || def;
}
var cfg = {
  port: env('PORT', 3000),
  stravaAccessToken: env('STRAVA_ACCESS_TOKEN') || secrets.stravaAccessToken
};

cfg.baseUrl = env('URL', 'http://localhost:' + cfg.port);

module.exports = function(name) {
  return cfg[name];
};
