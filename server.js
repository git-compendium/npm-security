// Datei: npm-security/server.js
const express = require("express"),
  routes = require('./routes'),
  sqlite = require('better-sqlite3'),
  path = require('path'),
  app = express();

const port = process.env.PORT || 3001;
const picDB = process.env.picDB || 'pictures.db';

const db = new sqlite(picDB);
db.exec("CREATE TABLE IF NOT EXISTS pic (id TEXT, date NUMBER, thumbnail BLOB, mime TEXT, size TEXT, filename TEXT, hasExif NUMBER)");

app.set("db", db);
app.use('/', express.static('./'));
app.use('/api', routes);
app.listen(port, () => {
  console.log("API-Server auf Port ", port);
});

module.exports = app;  // for mocha/chai tests
