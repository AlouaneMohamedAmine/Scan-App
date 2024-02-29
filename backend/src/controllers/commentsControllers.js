const models = require("../models");

// Récupère tous les commentaires d'un chapitre
const getComments = (req, res) => {
  const { chapterId } = req.params;

  models.CommentsManager.getComments(chapterId)
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Insère un nouveau commentaire
const insertComment = (req, res) => {
  const comment = req.body;

  models.CommentsManager.insertComment(comment)
    .then(([result]) => {
      res.location(`/api/comments/${result.insertId}`).sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Met à jour un commentaire
const updateComment = (req, res) => {
  const comment = req.body;
  comment.id = parseInt(req.params.id, 10);

  models.CommentsManager.updateComment(comment)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Supprime tous les commentaires d'un chapitre
const deleteCommentsByChapterId = (req, res) => {
  const { chapterId } = req.params;

  models.CommentsManager.deleteCommentByChapterId(chapterId)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  getComments,
  insertComment,
  updateComment,
  deleteCommentsByChapterId,
};