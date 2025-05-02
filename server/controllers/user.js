const User = require("../models/user");
// !  a rebosser proprement notemment try catch pour les crash etc ..
module.exports = {
    getAll: async (req, res, next) => {
      res.json(await User.findAll());
    },
    
    getOne: async (req, res, next) => {
        try {
          const user = await User.findByPk(parseInt(req.params.id));
          if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
          res.json(user);
        } catch (err) {
          next(err);
        }
      },
      
      update: async (req, res, next) => {
        try {
          const nbUpdated = await User.update(req.body, {
            where: { id: parseInt(req.params.id) }
          });
      
          if (!nbUpdated[0]) return res.status(404).json({ message: 'Utilisateur non trouvé ou inchangé' });
      
          res.json(await User.findByPk(parseInt(req.params.id)));
        } catch (err) {
          next(err);
        }
      },
      
      delete: async (req, res, next) => {
        try {
          if (req.user.id !== parseInt(req.params.id)) return res.status(403).json({ message: 'Non autorisé' });
      
          const nbDeleted = await User.destroy({
            where: { id: parseInt(req.params.id) },
          });
      
          if (!nbDeleted) return res.status(404).json({ message: 'Utilisateur introuvable' });
      
          res.sendStatus(204);
        } catch (err) {
          next(err);
        }
      }      
};