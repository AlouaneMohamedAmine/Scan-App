const AbstractManager = require("./AbstractManager");

class ManhwaManager extends AbstractManager {
  constructor() {
    super({ table: "manhwa" });
  }

  find(id) {
    return this.connection.query(
      `SELECT id, synopsis, author_name, cover_image, theme_id, genre_id FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  findAll() {
    return this.connection.query(
      `SELECT id, synopsis, author_name, cover_image, theme_id, genre_id FROM ${this.table}`
    );
  }

  insert(manhwa) {
    return this.connection.query(
      `INSERT INTO ${this.table} (synopsis, author_name, cover_image, theme_id, genre_id) VALUES (?, ?, ?, ?, ?)`,
      [manhwa.synopsis, manhwa.author_name, manhwa.cover_image, manhwa.theme_id, manhwa.genre_id]
    );
  }

  update(manhwa) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      manhwa,
      manhwa.id,
    ]);
  }

  delete(id) {
    return this.connection.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }
}

module.exports = ManhwaManager;
