const { ForbiddenError } = require('@casl/ability');

function authorize(action, subject) {
  return (req, res, next) => {
    try {
      ForbiddenError.from(req.ability).throwUnlessCan(action, subject);
      next();
    } catch (error) {
      res.status(403).render('error');
    }
  };
}

module.exports = { authorize };