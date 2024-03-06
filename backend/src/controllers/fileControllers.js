const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const models = require("../models");

const coverImageDirectory = process.env.COVER_IMAGE_DIRECTORY || "public/uploads/covers_images/";
const chapterDirectory = process.env.CHAPTER_DIRECTORY || "public/uploads/chapters/";
const avatarDirectory = process.env.AVATAR_DIRECTORY || "public//uploads/avatars/";
const logoDirectory = process.env.LOGO_DIRECTORY || "public/uploads/logo/";












//////////////////////////////////////////////////////////////// Chapitres ////////////////////////////////////////////////

// Fonction pour insérer un nouveau chapitre
const insertChapter = (req, res, next) => {
  // Récupération du nom original et du nom temporaire du fichier
  const { originalname } = req.file;
  const { filename } = req.file;

  // Génération d'un identifiant unique pour le fichier
  const uuid = uuidv4();

  // Renommage du fichier avec l'identifiant unique
  fs.rename(
    `${chapterDirectory}${filename}`,
    `${chapterDirectory}${uuid}-${originalname}`,
    (err) => {
      if (err) throw err;
      req.chapter = `${uuid}-${originalname}`;
      next();
    }
  );

  // Récupération de work_id et views de req.body
  const { work_id, views } = req.body;

  // Insertion du chapitre avec work_id et views dans la base de données
  ChaptersManager.insertChapter({
    chapter: req.chapter,
    work_id: work_id,
    views: views
  })
  .then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
};

// Fonction pour mettre à jour un chapitre existant
const updateChapter = (req, res, next) => {
  // Récupération du nom original et du nom temporaire du fichier
  const { originalname } = req.file;
  const { filename } = req.file;

  // Génération d'un identifiant unique pour le fichier
  const uuid = uuidv4();

  // Renommage du fichier avec l'identifiant unique
  fs.rename(
    `${chapterDirectory}${filename}`,
    `${chapterDirectory}${uuid}-${originalname}`,
    (err) => {
      if (err) throw err;
      req.chapter = `${uuid}-${originalname}`;
      next();
    }
  );

  // Récupération de work_id et views de req.body
  const { work_id, views } = req.body;

  // Mise à jour du chapitre avec work_id et views dans la base de données
  ChaptersManager.updateChapter({
    chapter: req.chapter,
    work_id: work_id,
    views: views
  })
  .then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
};

// Fonction pour supprimer un chapitre
const deleteChapter = (req, res) => {
  // Récupération du nom du fichier à supprimer
  const { fileName } = req.params;

  // Suppression du fichier
  fs.unlink(`${chapterDirectory}${fileName}`, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Suppression du chapitre de la base de données
      ChaptersManager.deleteChapter(fileName.replace(/.*-/, ''))
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
    }
  });
};

// Renvoie les chapitres les plus vus aujourd'hui
const mostViewedToday = (req, res) => {
  ChaptersManager.getMostViewedToday()
    .then(([results]) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Renvoie les chapitres les plus vus cette semaine
const mostViewedWeek = (req, res) => {
  ChaptersManager.getMostViewedWeek()
    .then(([results]) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Renvoie les chapitres les plus vus ce mois
const mostViewedMonth = (req, res) => {
  ChaptersManager.getMostViewedMonth()
    .then(([results]) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Renvoie les chapitres les plus aimés
const mostLiked = (req, res) => {
  ChaptersManager.getMostLiked()
    .then(([results]) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};




////////////////////////////////////////////////////////////////////            LOGO    //////////////////////////////////

// Gestion du logo
const renameLogo = (req, res, next) => {
  // Renomme le logo avec un UUID unique
  const { originalname } = req.file;
  const { filename } = req.file;
  const uuid = uuidv4();
  fs.rename(
    `${logoDirectory}${filename}`,
    `${logoDirectory}${uuid}-${originalname}`,
    (err) => {
      if (err) throw err;
      req.logo = `${uuid}-${originalname}`;
      next();
    }
  );
};

// Envoie le logo
const sendLogo = (req, res) => {
  // Envoie le logo au client
  const { fileName } = req.params;
  res.download(logoDirectory + fileName, fileName, (err) => {
    if (err) {
      res.status(404).send({
        message: `Logo not found.`,
      });
    }
  });
};


// Met à jour le logo
const updateLogo = (req, res) => {
  // Met à jour le logo dans la base de données
  const id = req.payloads.sub;
  const { logo } = req;
  models.WebsiteStyleManager.updateLogo(id, logo)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.status(202).send({ logo });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Supprime le logo
const deleteLogo = (req, res) => {
  // Supprime le logo du système de fichiers
  const { fileName } = req.params;
  fs.unlink(`${logoDirectory}${fileName}`, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

////////////////////////////////////////////////////////////////////// AVATAR //////////////////////////////////////////////

// Gestion des avatars
const renameAvatar = (req, res, next) => {
  const { originalname } = req.file;
  const { filename } = req.file;
  const uuid = uuidv4();
  fs.rename(
    `${avatarDirectory}${filename}`,
    `${avatarDirectory}${uuid}-${originalname}`,
    (err) => {
      if (err) throw err;
      req.avatar = `${uuid}-${originalname}`;
      next();
    }
  );
};

// Envoie l'avatar
const sendAvatar = (req, res) => {
  const { fileName } = req.params;
  res.download(avatarDirectory + fileName, fileName, (err) => {
    if (err) {
      res.status(404).send({
        message: `Avatar not found.`,
      });
    }
  });
};

// Met à jour l'avatar
const updateAvatar = (req, res) => {
  const id = req.payloads.sub;
  const { avatar } = req;
  models.user
    .updateAvatar(id, avatar)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.status(202).send({ avatar });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Supprime l'avatar
const deleteAvatar = (req, res) => {
  const { fileName } = req.params;
  fs.unlink(`${avatarDirectory}${fileName}`, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

////////////////////////////////////////////////////////////////////// COVER MANHWA //////////////////////////////////////////////

// Envoie l'image de couverture
const sendCoverImage = (req, res) => {
  const { fileName } = req.params;
  res.download(coverImageDirectory + fileName, fileName, (err) => {
    if (err) {
      res.status(404).send({
        message: `Cover image not found.`,
      });
    }
  });
};

// Gestion des images de couverture
const renameCoverImage = (req, res, next) => {
  const { originalname } = req.file;
  const { filename } = req.file;
  const uuid = uuidv4();
  fs.rename(
    `${coverImageDirectory}${filename}`,
    `${coverImageDirectory}${uuid}-${originalname}`,
    (err) => {
      if (err) throw err;
      req.coverImage = `${uuid}-${originalname}`;
      next();
    }
  );
};

// Supprime l'image de couverture
const deleteCoverImage = (req, res) => {
  const { fileName } = req.params;
  fs.unlink(`${coverImageDirectory}${fileName}`, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

// Met à jour l'image de couverture
const updateCoverImage = (req, res) => {
  const id = req.payloads.sub;
  const { coverImage } = req;
  models.manhwa
    .updateCoverImage(id, coverImage)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.status(202).send({ coverImage });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};








module.exports = {
  renameLogo,
  renameCoverImage,
  insertChapter,
  renameAvatar,
  sendLogo,
  sendCoverImage,
  updateChapter,
  updateLogo,
  sendAvatar,
  updateAvatar,
  updateCoverImage,
  deleteLogo,
  deleteCoverImage,
  deleteAvatar,
  deleteChapter,
  mostViewedToday,
  mostLiked,
  mostViewedWeek,
  mostViewedMonth
};
