const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const {authenticateJWT} = require("../middleware/authenticateJWT");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }); 

router.post("/create", authenticateJWT, upload.single("image"), async (req, res) => {
  console.log("req.user: ", req.user);

  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  const { name, description, type, cookingtime, ingredients, instructions } = req.body;

  try {
    const recipe = await Recipe.create({
      name,
      description,
      type,
      cookingtime,
      ingredients,
      instructions,
      image: imagePath,
      uid: req.user.uid, 
    });

    res.status(201).json(recipe);
  } catch (err) {
    console.error("Error creating recipe:", err);
    res.status(500).json({ error: "Failed to create recipe" });
  }
});

router.get("/myrecipes", authenticateJWT, async (req, res) => {
  try {
    const recipes = await Recipe.findAll({ where: { uid: req.user.uid }, include: [{model: User}] });
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: "Invalid token" });
  }
});

router.get("/allrecipes", async (req, res) => {
  try {
    const recipes = await Recipe.findAll({ include: [{ model: User }] });

    recipes.forEach(recipe => console.log(recipe));

    console.log(recipes.name);
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(400).json({error: "failed to get"});
  }
});

router.put("/update/:rid", authenticateJWT, async (req, res) => {
  const { rid } = req.params;
  const { name, description, type, cookingtime, ingredients, instructions } = req.body;

  try {
    const recipe = await Recipe.findOne({ where: { rid, uid: req.user.uid } });
    if (!recipe) return res.status(404).json({ error: "Recipe not found or unauthorized" });

    await recipe.update({ name, description, type, cookingtime, ingredients, instructions });
    res.json(recipe);
  } catch (err) {
    console.error("Error updating recipe:", err);
    res.status(500).json({ error: "Failed to update recipe" });
  }
});

module.exports = router;
