const models = require("../models");

// Récupère le style du site
const getStyle = (req, res) => {
  models.WebsiteStyleManager.getStyle()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Insère un nouveau style
const insertStyle = (req, res) => {
  const style = req.body;

  models.WebsiteStyleManager.insertStyle(style)
    .then((results) => {
      if (results[0]);

      res
        .location(`/api/style/${style.id}`)
        .sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Met à jour un style
const updateStyle = (req, res) => {
  const style = req.body;

  models.WebsiteStyleManager.updateStyle(style)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.status(202).send({ style });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Supprime un style
const deleteStyle = (req, res) => {
  const { id } = req.params;

  models.WebsiteStyleManager.deleteStyleById(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  getStyle,
  insertStyle,
  updateStyle,
  deleteStyle,
};