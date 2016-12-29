let service = function(app, config, logger) {
  app.get("/", function(req, res, next) {
    res.status(200).json({ message: "success" });
  });
};

module.exports = service;
