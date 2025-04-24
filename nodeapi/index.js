const express = require("express");
const app = express();
const port = 3000;
const userRoutes = require("./routes/user");
const recipeRoutes = require("./routes/recipe");
const cors = require("cors");

app.use(cors({
  origin: "https://tastetribe.vercel.app",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

const sequelize = require("./models/db");
const User = require("./models/User");
const Recipe = require("./models/Recipe");

// Sync all models
sequelize.sync().then(() => {
    console.log("All models synced!");
  }).catch((err) => {
    console.error("Sync failed:", err);
  });

  sequelize.authenticate()
  .then(() => console.log("MySQL connection established."))
  .catch(err => console.error("MySQL connection failed:", err));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

