const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "kth18822",
  host: "localhost",
  port: 4321,
  database: "nodetodo",
});

module.exports = pool;
