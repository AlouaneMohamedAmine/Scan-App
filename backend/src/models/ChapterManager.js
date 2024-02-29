const AbstractManager = require("./AbstractManager");

class ChaptersManager extends AbstractManager {
  constructor() {
    super({ table: "Chapters" });
  }

  getChapter(chapterId) {
    return this.connection.query(
      `SELECT id, chapter, work_id, views
      FROM ${this.table}
      WHERE id = ?`,
      [chapterId]
    );
  }

  insertChapter(chapter) {
    return this.connection.query(
      `INSERT into ${this.table} (chapter, work_id, views) values (?, ?, ?)`,
      [chapter.chapter, chapter.work_id, chapter.views]
    );
  }

  updateChapter(chapter) {
    return this.connection.query(
      `UPDATE ${this.table} SET chapter = ?, work_id = ?, views = ? WHERE id = ?`,
      [chapter.chapter, chapter.work_id, chapter.views, chapter.id]
    );
  }

  deleteChapter(chapterId) {
    return this.connection.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [chapterId]
    );
  }
}

module.exports = ChaptersManager;
