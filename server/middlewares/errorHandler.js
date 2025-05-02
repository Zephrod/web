module.exports = (err, req, res, next) => {
    console.error(err);
  
    if (err.isJoi) {
      return res.status(400).json({ message: err.details[0].message });
    }
  
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }
  
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({ message: err.errors[0].message });
    }
  
    res.status(500).json({ message: "Erreur interne du serveur." });
  };