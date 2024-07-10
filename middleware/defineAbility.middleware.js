const { defineAbilitiesFor } = require('../abilities/abilities.js')

const defineAbility = () => {
  return (req, res, next) => {
    try {
      req.ability = defineAbilitiesFor(req.user);
      next();
    } catch (error) {
      console.error("Failed to define abilities:", error);
      res.status(500).render('error');
    }
  };
};

module.exports = { defineAbility };