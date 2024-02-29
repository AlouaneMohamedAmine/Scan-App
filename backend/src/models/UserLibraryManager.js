const AbstractManager = require("./AbstractManager");

class Userlibrary extends AbstractManager {
  constructor() {
    super({ table: "UserLibrary" });
  }

  insertFav(favorite) {
    return this.connection.query(
      `insert into ${this.table} (manwha_id ,user_id) values (?, ?)`,
      [favorite.manwha_id, favorite.user_id]
    );
  }

  findFavs(userId) {
    return this.connection.query(
      `SELECT manwha.id,manwha.url, manwha.synopsis, manwha.author_name, manwha.cover_image, manwha.name, manwha.theme_id,manwha.genre_id
          FROM manhwa
          JOIN UserLibrary ON manhwa.id = UserLibrary.manhwa
          JOIN user ON UserLibrary.User_id = user.id
          WHERE user.id = ${userId}`
    );
  }

  deleteFav(userId, manhwaId) {
    return this.connection.query(
      "DELETE FROM UserLibrary WHERE user_id = ? and manhwa_id = ?",
      [userId, manhwaId]
    );
  }
}

module.exports = Userlibrary;
