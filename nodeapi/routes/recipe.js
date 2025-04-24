const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const User = require("../models/User");
const { authenticateJWT } = require("../middleware/authenticateJWT");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "tastetribe_uploads",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

router.post("/create", authenticateJWT, upload.single("image"), async (req, res) => {
  const imageUrl = req.file ? req.file.path : null;
  const { name, description, type, cookingtime, ingredients, instructions } = req.body;

  try {
    const recipe = await Recipe.create({
      name,
      description,
      type,
      cookingtime,
      ingredients,
      instructions,
      image: imageUrl,
      uid: req.user.uid,
    });

    console.log("Cloudinary image URL:", imageUrl);

    res.status(201).json(recipe);
  } catch (err) {
    console.error("Error creating recipe:", err);
    res.status(500).json({ error: "Failed to create recipe" });
  }
});

router.get("/myrecipes", authenticateJWT, async (req, res) => {
  try {
    const recipes = await Recipe.findAll({ where: { uid: req.user.uid }, include: [User] });
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: "Invalid token" });
  }
});

router.get("/allrecipes", async (req, res) => {
  try {
    const recipes = await Recipe.findAll({ include: [User] });
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "failed to get" });
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
