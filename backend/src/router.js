const express = require("express");

const router = express.Router();
const multer = require("multer");


const uploadAvatar = multer({ dest: process.env.AVATAR_DIRECTORY });
const uploadChapter = multer({ dest: process.env.CHAPTER_DIRECTORY });
const uploadCoverImage = multer({ dest: process.env.COVER_IMAGE_DIRECTORY });
const uploadLogo = multer({ dest: process.env.LOGO_DIRECTORY });

const { hashPassword, verifyPassword, verifyToken } = require("../auth");

const authControllers = require("./controllers/authControllers");
const fileControllers = require("./controllers/fileControllers");
const genresControllers = require("./controllers/genresControllers");
const libraryControllers = require("./controllers/libraryControllers");
const styleControllers = require("./controllers/styleControllers");
const themesControllers = require("./controllers/themesControllers");
const userControllers = require("./controllers/userControllers");
const manhwaControllers = require("./controllers/manhwaControllers");
const commentsControllers = require("./controllers/commentsControllers");


// Authentification

router.post("/api/register", hashPassword, userControllers.add);
router.post("/api/login",authControllers.getUserByEmailWithPasswordAndPassToNext,verifyPassword);

// Gestion des users
router.get("/api/users", userControllers.browse);
router.get("/api/users/:id", userControllers.read);
router.post("/api/users", hashPassword, verifyToken, userControllers.add);
router.put("/api/users/:id", verifyToken, userControllers.edit);
router.delete("/api/users/:id", verifyToken, userControllers.destroy);

// Gestion des avatars
router.post("/api/avatars",verifyToken,uploadAvatar.single("avatar"),fileControllers.renameAvatar,fileControllers.updateAvatar);
  router.get("/api/avatars/:fileName",hashPassword,verifyToken,fileControllers.sendAvatar);
  router.delete("/api/avatars/:fileName",hashPassword,verifyToken,fileControllers.deleteAvatar);

// Gestion du logo
 
router.post("/api/logo/rename", verifyToken, uploadLogo.single('logo'), fileControllers.renameLogo);
router.get("/api/logo/:fileName", verifyToken, fileControllers.sendLogo);
router.put("/api/logo", verifyToken, uploadLogo.single('logo'), fileControllers.updateLogo);
router.delete("/api/logo/:fileName", verifyToken, fileControllers.deleteLogo);

// Gestion des cover de manhwa

router.post('/api/coverImage', verifyToken, uploadCoverImage.single('cover_image'),fileControllers.renameCoverImage);
router.get('/api/coverImage/:fileName', fileControllers.sendCoverImage);
router.put('/api/coverImage/:id', verifyToken, fileControllers.updateCoverImage);
router.delete('/api/coverImage/:fileName', verifyToken, fileControllers.deleteCoverImage);
 
 
// Gestion des manhwa

router.get('/api/manhwas', manhwaControllers.browse);
router.get('/api/manhwas/:id', manhwaControllers.read);
router.post('/api/manhwas', verifyToken, manhwaControllers.add);
router.put('/api/manhwas/:id', verifyToken, manhwaControllers.edit);
router.delete('/api/manhwas/:id', verifyToken, manhwaControllers.destroy);

// Gestion des chapitres

router.post("/api/chapter/rename", verifyToken, uploadChapter.single('chapter'), fileControllers.insertChapter);
router.get("/api/chapter/:fileName", fileControllers.updateChapter);
router.delete("/api/chapter/:fileName", verifyToken, fileControllers.deleteChapter);
router.get('/api/chapters/most-viewed-today', fileControllers.mostViewedToday);
router.get('/api/chapters/most-viewed-week', fileControllers.mostViewedWeek);
router.get('/api/chapters/most-viewed-month', fileControllers.mostViewedMonth);
router.get('/api/chapters/most-liked', fileControllers.mostLiked);

// Gestion des genres

router.get('/api/genres', genresControllers.getAllGenres);
router.post('/api/genres', verifyToken, genresControllers.insertGenre);
router.put('/api/genres/:id', verifyToken, genresControllers.updateGenre);
router.delete('/api/genres/:id', verifyToken, genresControllers.deleteGenre);

// Gestion de la bibliothèque

router.post("/api/library",verifyToken,libraryControllers.addFavorite);
router.get("/api/library/:userId", libraryControllers.getFavs);
router.delete("/api/library/:userId/:chapterId",verifyToken,libraryControllers.deleteFavorite);

// Gestion des themes

router.get('/api/themes', themesControllers.getAllThemes);
router.post('/api/themes', verifyToken, themesControllers.insertTheme);
router.put('/api/themes/:id', verifyToken, themesControllers.updateTheme);
router.delete('/api/themes/:id', verifyToken, themesControllers.deleteTheme);

// Gestion du  style

router.get('/api/style', styleControllers.getStyle);
router.post('/api/style', verifyToken, styleControllers.insertStyle);
router.put('/api/style/:id', verifyToken, styleControllers.updateStyle);
router.delete('/api/style/:id', verifyToken, styleControllers.deleteStyle);

// Gestion des commentaires

router.get('/api/comments/:chapterId', commentsControllers.getComments);
router.post('/api/comments', verifyToken, commentsControllers.insertComment);
router.put('/api/comments/:id', verifyToken, commentsControllers.updateComment);
router.delete('/api/comments/:chapterId', verifyToken, commentsControllers.deleteCommentsByChapterId);




module.exports = router;
