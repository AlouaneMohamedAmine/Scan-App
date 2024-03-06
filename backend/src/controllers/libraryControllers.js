const models = require("../models");

// Ajoute un favori
const addFavorite = (req, res) => {
  const favorite = req.body;

  models.userlibrary.insertFav(favorite)
    .then((results) => {
      if (results[0]);

      res
        .location(`/api/favoris/${favorite.user_id}/${favorite.manwha_id}`)
        .sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Récupère les favoris
const getFavs = (req, res) => {
  const { userId } = req.params;
  models.userlibrary.findFavs(userId)
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Supprime un favori
const deleteFavorite = (req, res) => {
  const { userId, manwhaId } = req.params;
  models.userlibrary.deleteFav(userId, manwhaId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  addFavorite,
  getFavs,
  deleteFavorite,
};
