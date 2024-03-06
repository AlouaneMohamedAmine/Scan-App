const AbstractManager = require("./AbstractManager");

class LikesManager extends AbstractManager {
  constructor() {
    super({ table: "likes" });
  }

  getLikes(chapterId) {
    return this.connection.query(
      `SELECT Likes.user_id, Likes.chapter_id, Likes.number_of_likes, user.firstname, user.lastname
      FROM ${this.table}
      JOIN user on ${this.table}.user_id = user.id 
      WHERE chapter_id = ?
      ORDER BY Likes.number_of_likes DESC`,
      [chapterId]
    );
  }

  insertLike(like) {
    return this.connection.query(
      `INSERT into ${this.table} (user_id, chapter_id, number_of_likes) values (?, ?, ?)`,
      [like.user_id, like.chapter_id, like.number_of_likes]
    );
  }

  updateLike(like) {
    return this.connection.query(
      `UPDATE ${this.table} SET number_of_likes = ? WHERE user_id = ? AND chapter_id = ?`,
      [like.number_of_likes, like.user_id, like.chapter_id]
    );
  }

  deleteLikeByChapterId(chapterId) {
    return this.connection.query(
      `DELETE FROM ${this.table} WHERE chapter_id = ?`,
      [chapterId]
    );
  }
}

module.exports = LikesManager;
