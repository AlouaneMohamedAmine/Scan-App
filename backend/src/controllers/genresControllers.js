const models = require("../models");

// Récupère tous les genres
const getAllGenres = (req, res) => {
  // Utilise le modèle pour récupérer tous les genres de la base de données
  models.genres.findAll()
    .then(([results]) => {
      // Envoie les résultats au client
      res.send(results);
    })
    .catch((error) => {
      // Gère les erreurs
      console.error(error);
      res.sendStatus(500);
    });
};

// Insère un nouveau genre
const insertGenre = (req, res) => {
  // Récupère le genre du corps de la requête
  const genre = req.body;

  // Utilise le modèle pour insérer le genre dans la base de données
  models.genres.insert(genre)
    .then((results) => {
      if (results[0]);

      // Envoie une réponse de succès au client
      res
        .location(`/api/genres/${genre.id}`)
        .sendStatus(201);
    })
    .catch((error) => {
      // Gère les erreurs
      console.error(error);
      res.sendStatus(500);
    });
};

// Met à jour un genre
const updateGenre = (req, res) => {
  // Récupère le genre du corps de la requête
  const genre = req.body;

  // Utilise le modèle pour mettre à jour le genre dans la base de données
  models.genres.update(genre)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.status(202).send({ genre });
    })
    .catch((error) => {
      // Gère les erreurs
      console.error(error);
      res.sendStatus(500);
    });
};

// Supprime un genre
const deleteGenre = (req, res) => {
  // Récupère l'ID du genre à supprimer
  const { id } = req.params;

  // Utilise le modèle pour supprimer le genre de la base de données
  models.genres.deleteGenreById(id)
    .then(() => {
      // Envoie une réponse de succès au client
      res.sendStatus(204);
    })
    .catch((error) => {
      // Gère les erreurs
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  getAllGenres,
  insertGenre,
  updateGenre,
  deleteGenre,
};
