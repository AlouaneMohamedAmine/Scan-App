const AbstractManager = require("./AbstractManager");

class ThemesManager extends AbstractManager {
  constructor() {
    super({ table: "themes" });
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  insert(themes) {
    return this.connection.query(
      `insert into ${this.table} (theme_name) values (?)`,
      [themes.theme_name]
    );
  }

  update(themes) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
    themes,
    themes.id,
    ]);
  }
}

module.exports = ThemesManager;
