const AbstractManager = require("./AbstractManager");

class ChaptersManager extends AbstractManager {
  constructor() {
    super({ table: "chapters" });
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


// Récupère les chapitres les plus vus aujourd'hui
getMostViewedToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return this.connection.query(
    `SELECT * FROM ${this.table} WHERE views >= ? ORDER BY views DESC`,
    [today]
  );
}

// Récupère les chapitres les plus vus cette semaine
getMostViewedWeek() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return this.connection.query(
    `SELECT * FROM ${this.table} WHERE views >= ? ORDER BY views DESC`,
    [oneWeekAgo]
  );
}

// Récupère les chapitres les plus vus ce mois
getMostViewedMonth() {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  return this.connection.query(
    `SELECT * FROM ${this.table} WHERE views >= ? ORDER BY views DESC`,
    [oneMonthAgo]
  );
}


// Récupère les chapitres les plus aimés
getMostLiked() {
  return this.connection.query(
    `SELECT * FROM Likes ORDER BY number_of_likes DESC`
  );
}
}


module.exports = ChaptersManager;
