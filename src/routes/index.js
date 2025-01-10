const userRoutes = require("./user");

function route(app) {
  app.use("/api/user", userRoutes);
}

module.exports = route;
