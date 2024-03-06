const AbstractManager = require("./AbstractManager");

class WebsiteStyleManager extends AbstractManager {
  constructor() {
    super({ table: "websitestyle" });
  }

  getStyle() {
    return this.connection.query(
      `SELECT * FROM ${this.table}`
    );
  }

  insertStyle(style) {
    return this.connection.query(
      `INSERT into ${this.table} (Logo, main_color, secondary_color, text_color, dark_text_color, dark_main_color, dark_secondary_color) values (?, ?, ?, ?, ?, ?, ?)`,
      [style.Logo, style.main_color, style.secondary_color, style.text_color, style.dark_text_color, style.dark_main_color, style.dark_secondary_color]
    );
  }

  updateStyle(style) {
    return this.connection.query(
      `UPDATE ${this.table} SET Logo = ?, main_color = ?, secondary_color = ?, text_color = ?, dark_text_color = ?, dark_main_color = ?, dark_secondary_color = ? WHERE id = ?`,
      [style.Logo, style.main_color, style.secondary_color, style.text_color, style.dark_text_color, style.dark_main_color, style.dark_secondary_color, style.id]
    );
  }

  deleteStyleById(id) {
    return this.connection.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }
}

module.exports = WebsiteStyleManager;
