const fs = require("fs");
const mysql = require("mysql");
const path = require("path");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.warn(
      "Warning:",
      "Failed to get a DB connection.",
      "Did you create a .env file with valid credentials?",
      "Routes using models won't work as intended"
    );
  } else {
    connection.release();
  }
});

const models = fs
  .readdirSync(__dirname)
  .filter((file) => file !== "AbstractManager.js" && file !== "index.js")
  .reduce((acc, file) => {
    console.log(file);
    const Manager = require(path.join(__dirname, file));

    const managerInstance = new Manager();
    managerInstance.setConnection(pool);

    return { ...acc, [managerInstance.table]: managerInstance };
  }, {});

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
