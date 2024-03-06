const AbstractManager = require("./AbstractManager");

class CommentsManager extends AbstractManager {
  constructor() {
    super({ table: "comments" });
  }

  getComments(chapterId) {
    return this.connection.query(
      `SELECT Comments.id, Comments.comment_text, Comments.user_id, Comments.chapter_id, user.firstname, user.lastname, user.avatar
      FROM ${this.table}
      JOIN user on ${this.table}.user_id = user.id 
      WHERE chapter_id = ?
      ORDER BY Comments.id DESC`,
      [chapterId]
    );
  }

  insertComment(comment) {
    return this.connection.query(
      `INSERT into ${this.table} (comment_text, user_id, chapter_id) values (?, ?, ?)`,
      [comment.comment_text, comment.user_id, comment.chapter_id]
    );
  }

  updateComment(comment) {
    return this.connection.query(
      `UPDATE ${this.table} SET comment_text = ? WHERE id = ?`,
      [comment.comment_text, comment.id]
    );
  }

  deleteCommentByChapterId(chapterId) {
    return this.connection.query(
      `DELETE FROM ${this.table} WHERE chapter_id = ?`,
      [chapterId]
    );
  }
}

module.exports = CommentsManager;
