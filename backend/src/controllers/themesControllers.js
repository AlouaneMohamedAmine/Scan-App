const models = require("../models");

// Récupère tous les thèmes
const getAllThemes = (req, res) => {
  // Utilise le modèle pour récupérer tous les thèmes de la base de données
  models.themes.findAll()
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

// Insère un nouveau thème
const insertTheme = (req, res) => {
  // Récupère le thème du corps de la requête
  const theme = req.body;

  // Utilise le modèle pour insérer le thème dans la base de données
  models.themes.insert(theme)
    .then((results) => {
      if (results[0]);

      // Envoie une réponse de succès au client
      res
        .location(`/api/themes/${theme.id}`)
        .sendStatus(201);
    })
    .catch((error) => {
      // Gère les erreurs
      console.error(error);
      res.sendStatus(500);
    });
};

// Met à jour un thème
const updateTheme = (req, res) => {
  // Récupère le thème du corps de la requête
  const theme = req.body;

  // Utilise le modèle pour mettre à jour le thème dans la base de données
  models.themes.update(theme)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.status(202).send({ theme });
    })
    .catch((error) => {
      // Gère les erreurs
      console.error(error);
      res.sendStatus(500);
    });
};

// Supprime un thème
const deleteTheme = (req, res) => {
  // Récupère l'ID du thème à supprimer
  const { id } = req.params;

  // Utilise le modèle pour supprimer le thème de la base de données
  models.themes.deleteThemeById(id)
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
  getAllThemes,
  insertTheme,
  updateTheme,
  deleteTheme,
};