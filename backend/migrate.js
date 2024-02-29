require("dotenv").config();

const fs = require("fs");
const mysql = require("mysql");

const migrate = async () => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

  await connection.connect();

  try {
    await connection.query(`drop database if exists ${DB_NAME}`);
    await connection.query(`create database ${DB_NAME}`);
    await connection.query(`use ${DB_NAME}`);

    const sql = fs.readFileSync("./database.sql", "utf8");

    await connection.query(sql);
  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
};

migrate();