const AbstractManager = require("./AbstractManager");

class GenresManager extends AbstractManager {
  constructor() {
    super({ table: "genres" });
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  insert(genres) {
    return this.connection.query(
      `insert into ${this.table} (genre_name) values (?)`,
      [genres.genre_name]
    );
  }

  update(genres) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
    genres,
    genres.id,
    ]);
  }
}

module.exports = GenresManager;
